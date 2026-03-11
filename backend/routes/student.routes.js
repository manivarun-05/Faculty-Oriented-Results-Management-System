const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const { requireAuth, authorize } = require('../middleware/auth.middleware');

router.get('/', requireAuth, authorize('admin', 'teacher'), studentController.getStudents);
router.get('/:id', requireAuth, studentController.getStudent);
router.post('/', requireAuth, authorize('admin'), studentController.createStudent);
router.put('/:id', requireAuth, authorize('admin'), studentController.updateStudent);
router.delete('/:id', requireAuth, authorize('admin'), studentController.deleteStudent);

module.exports = router;