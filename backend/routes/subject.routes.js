const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject.controller');
const { requireAuth, authorize } = require('../middleware/auth.middleware');

router.get('/', requireAuth, subjectController.getSubjects);
router.get('/:id', requireAuth, subjectController.getSubject);
router.post('/', requireAuth, authorize('admin'), subjectController.createSubject);
router.put('/:id', requireAuth, authorize('admin'), subjectController.updateSubject);
router.delete('/:id', requireAuth, authorize('admin'), subjectController.deleteSubject);

module.exports = router;