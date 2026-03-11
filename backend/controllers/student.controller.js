const { Student, User, Class } = require('../models');
const bcrypt = require('bcryptjs');

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.findAll({
            include: [
                { model: User, attributes: ['email', 'role'] },
                { model: Class, attributes: ['name', 'semester', 'academic_year'] }
            ]
        });
        res.status(200).json({ success: true, count: students.length, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['email'] },
                { model: Class }
            ]
        });
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createStudent = async (req, res) => {
    try {
        const { email, password, reg_number, full_name, dob, guardian_contact, class_id } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // Create User
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        const user = await User.create({ email, password_hash, role: 'student' });

        // Create Student Profile
        const student = await Student.create({
            user_id: user.id,
            reg_number,
            full_name,
            dob,
            guardian_contact,
            class_id
        });

        res.status(201).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        await student.update(req.body);
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        // Delete associated User account as well (cascading normally preferred)
        await User.destroy({ where: { id: student.user_id } });
        await student.destroy();

        res.status(200).json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
