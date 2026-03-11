const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Student, Teacher } = require('../models');

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );
};

exports.register = async (req, res) => {
    try {
        const { email, password, role, ...profileData } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            email,
            password_hash,
            role: role || 'student'
        });

        // Create profile based on role
        if (user.role === 'student' && profileData.reg_number) {
            await Student.create({
                user_id: user.id,
                ...profileData
            });
        } else if (user.role === 'teacher' && profileData.employee_id) {
            await Teacher.create({
                user_id: user.id,
                ...profileData
            });
        }

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        // Check user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        let profile = null;
        if (req.user.role === 'student') {
            profile = await Student.findOne({ where: { user_id: req.user.id } });
        } else if (req.user.role === 'teacher') {
            profile = await Teacher.findOne({ where: { user_id: req.user.id } });
        }

        res.status(200).json({
            success: true,
            user: {
                id: req.user.id,
                email: req.user.email,
                role: req.user.role,
                profile
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
