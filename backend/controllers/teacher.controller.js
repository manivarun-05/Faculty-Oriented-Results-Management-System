const { Teacher, User, Subject, Class } = require('../models');
const bcrypt = require('bcryptjs');

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({
            include: [
                { model: User, attributes: ['email', 'role'] }
            ]
        });
        res.status(200).json({ success: true, count: teachers.length, data: teachers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['email'] },
                { model: Subject },
                { model: Class, as: 'classTeacher' }
            ]
        });
        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }
        res.status(200).json({ success: true, data: teacher });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createTeacher = async (req, res) => {
    try {
        const { email, password, full_name, employee_id, department, contact_number } = req.body;

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        const user = await User.create({ email, password_hash, role: 'teacher' });

        const teacher = await Teacher.create({
            user_id: user.id,
            full_name,
            employee_id,
            department,
            contact_number
        });

        res.status(201).json({ success: true, data: teacher });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id);
        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }

        await teacher.update(req.body);
        res.status(200).json({ success: true, data: teacher });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id);
        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }

        await User.destroy({ where: { id: teacher.user_id } });
        await teacher.destroy();

        res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
