const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');
const { requireAuth, authorize } = require('../middleware/auth.middleware');

router.get('/', requireAuth, classController.getClasses);
router.get('/:id', requireAuth, classController.getClass);
router.post('/', requireAuth, authorize('admin'), classController.createClass);
router.put('/:id', requireAuth, authorize('admin'), classController.updateClass);
router.delete('/:id', requireAuth, authorize('admin'), classController.deleteClass);

module.exports = router;