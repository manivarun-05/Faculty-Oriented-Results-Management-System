const { Class, Teacher, Student } = require('../models');

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.findAll({
            include: [{ model: Teacher, as: 'classTeacher', attributes: ['full_name', 'department'] }]
        });
        res.status(200).json({ success: true, count: classes.length, data: classes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getClass = async (req, res) => {
    try {
        const classObj = await Class.findByPk(req.params.id, {
            include: [
                { model: Teacher, as: 'classTeacher' },
                { model: Student }
            ]
        });
        if (!classObj) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }
        res.status(200).json({ success: true, data: classObj });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createClass = async (req, res) => {
    try {
        const classObj = await Class.create(req.body);
        res.status(201).json({ success: true, data: classObj });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateClass = async (req, res) => {
    try {
        const classObj = await Class.findByPk(req.params.id);
        if (!classObj) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }

        await classObj.update(req.body);
        res.status(200).json({ success: true, data: classObj });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteClass = async (req, res) => {
    try {
        const classObj = await Class.findByPk(req.params.id);
        if (!classObj) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }

        await classObj.destroy();
        res.status(200).json({ success: true, message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
