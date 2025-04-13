// routes/upload.js
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const upload = require('../middleware/upload');

router.post('/upload', upload.array('file'), uploadController.uploadCSV);

module.exports = router;
