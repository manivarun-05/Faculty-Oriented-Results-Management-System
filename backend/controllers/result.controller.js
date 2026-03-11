const { Result, Student, Subject, sequelize } = require('../models');
const csv = require('csv-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Bulk Upload Marks via CSV
exports.bulkUploadResults = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Please upload a CSV file' });
    }

    const results = [];
    const errors = [];
    let rowCount = 0;

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', async () => {
            const transaction = await sequelize.transaction();
            try {
                for (const row of results) {
                    rowCount++;
                    // Map headers: College,Year,Semester,Branch,Subject,HT_No,Internal_Marks,External_Marks,Total_Marks
                    const { 
                        College, Year, Semester, Branch, Subject: subjectName, 
                        HT_No, Internal_Marks, External_Marks, Total_Marks 
                    } = row;

                    // 1. Find or create student (Based on HT_No / reg_number)
                    // Note: In a real system, students should be pre-registered. 
                    // For this demo, we'll find by reg_number.
                    const student = await Student.findOne({ where: { reg_number: HT_No } }, { transaction });
                    if (!student) {
                        errors.push(`Row ${rowCount}: Student with HT_No ${HT_No} not found.`);
                        continue;
                    }

                    // 2. Find subject (by name or code)
                    const subject = await Subject.findOne({ where: { name: subjectName } }, { transaction });
                    if (!subject) {
                        errors.push(`Row ${rowCount}: Subject ${subjectName} not found.`);
                        continue;
                    }

                    // 3. Upsert Result
                    await Result.upsert({
                        student_id: student.id,
                        subject_id: subject.id,
                        college_name: College || 'MVSR WCE&T',
                        batch_year: Year || '3rd Year',
                        semester: Semester || '3-1',
                        branch: Branch || 'CSE',
                        internal_marks: parseFloat(Internal_Marks) || 0,
                        external_marks: parseFloat(External_Marks) || 0,
                        total_marks: parseFloat(Total_Marks) || 0,
                        result_status: (parseFloat(Total_Marks) >= 35) ? 'PASS' : 'FAIL'
                    }, { transaction });
                }

                await transaction.commit();
                // Clean up uploaded file
                fs.unlinkSync(req.file.path);

                res.status(200).json({
                    message: `Successfully processed ${rowCount - errors.length} records.`,
                    errors: errors.length > 0 ? errors : null
                });
            } catch (err) {
                await transaction.rollback();
                if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
                res.status(500).json({ message: 'Error processing CSV', error: err.message });
            }
        });
};

// Get Individual Result (The Query Feature)
exports.getResultByDetails = async (req, res) => {
    try {
        const { rollNo, subjectName, branch } = req.query;

        const result = await Result.findOne({
            include: [
                {
                    model: Student,
                    where: { reg_number: rollNo },
                    attributes: ['full_name', 'reg_number']
                },
                {
                    model: Subject,
                    where: { name: subjectName },
                    attributes: ['name']
                }
            ],
            where: {
                branch: branch
            }
        });

        if (!result) {
            return res.status(404).json({ message: 'No result found for the provided details.' });
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

// Get All Results (The Ledger View)
exports.getAllResults = async (req, res) => {
    try {
        const results = await Result.findAll({
            include: [
                { model: Student, attributes: ['reg_number', 'full_name'] },
                { model: Subject, attributes: ['name'] }
            ]
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};
