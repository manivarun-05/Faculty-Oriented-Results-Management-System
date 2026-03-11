const express = require('express');
const router = express.Router();
const resultController = require('../controllers/result.controller.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Simple storage

// Result Retrieval (Private Query)
router.get('/query', resultController.getResultByDetails);

// Results Ledger (Admin/Faculty only)
router.get('/', resultController.getAllResults);

// Bulk CSV Upload (Admin/Faculty only)
router.post('/upload', upload.single('file'), resultController.bulkUploadResults);

module.exports = router;