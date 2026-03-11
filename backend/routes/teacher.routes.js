const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller');
const { requireAuth, authorize } = require('../middleware/auth.middleware');

router.get('/', requireAuth, authorize('admin'), teacherController.getTeachers);
router.get('/:id', requireAuth, teacherController.getTeacher);
router.post('/', requireAuth, authorize('admin'), teacherController.createTeacher);
router.put('/:id', requireAuth, authorize('admin'), teacherController.updateTeacher);
router.delete('/:id', requireAuth, authorize('admin'), teacherController.deleteTeacher);

module.exports = router;
