// middleware/upload.js
const multer = require('multer');

// Utiliser le stockage en mémoire
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;