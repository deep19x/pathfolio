const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        require:true,
        select:false,
        minlength:6,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },
    avatar:{
        type:String,
        default:"",
    }
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);