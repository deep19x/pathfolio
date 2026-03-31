const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const User = require("../models/user");

const validate = require('../middlewares/validate');
const {registerSchema,loginSchema} = require('../utils/userValidator');

const authController = require("../controllers/auth");

router.post('/register',validate(registerSchema),authController.registerUser);

router.post('/login',validate(loginSchema),authController.loginUser);

router.get('/me',authMiddleware,authController.getMe);

router.post('/logout',authMiddleware,authController.logoutUser);

module.exports = router;