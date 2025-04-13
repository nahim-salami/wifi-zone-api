// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkToken = require('../middleware/checkToken');

router.get('/get/:price', checkToken, userController.getUserByPrice);

module.exports = router;
