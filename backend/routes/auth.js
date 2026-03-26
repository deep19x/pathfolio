const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const User = require("../models/user");

const authController = require("../controllers/auth");

router.post('/register',authController.registerUser);

router.post('/login',authController.loginUser);

router.get('/me',authMiddleware,authController.getMe);

router.post('/logout',authMiddleware,authController.logoutUser);

module.exports = router;