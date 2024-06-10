const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;