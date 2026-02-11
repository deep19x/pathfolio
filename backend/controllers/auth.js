const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.registerUser = async(req, res) => {

    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Please provide required information!" });
    }

    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, message: "User already exists!" });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            avatar
        });

        res.status(200).json({ success: true, message: "User Registration Complete", data: newUser });
    } catch (error) {
        console.error("Server Problem", error);
        res.status(500).json({ success: false, message: "Server Problem", error: error });
    }
}

module.exports.loginUser = async(req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({success:false,message:"Please provide all credentials to get logged!"});
    }

    try {
        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({success:false,message:"Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({success:false,message:"Invalid Credentials"});
        }

        const payload = {
            id:user._id
        };

        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"7d"
        });

        res.status(200).json({success:true,message:"Login Successful!",token:token,data:{name:user.name,email:user.email,id:user._id}});

    } catch (error) {
        console.error("Server Problem ",error);
        res.status(500).json({success:false,message:"Server Problem",error:error});
    }
}