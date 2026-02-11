const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.registerUser = async (req, res) => {

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