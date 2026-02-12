const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const authController = require("../controllers/auth");

router.post('/register',authController.registerUser);

router.post('/login',authController.loginUser);

router.get('/me',authMiddleware,async(req,res)=>{
    res.status(200).json({success:true,user:req.user});
});

module.exports = router;