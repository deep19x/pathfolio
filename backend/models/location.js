const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    trip:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Trip",
        required:true
    },
    placeName:{
        type:String,
        required:true
    },
    latitude:{
        type:Number,
        required:true
    },
    longitude:{
        type:Number,
        required:true,
    },
    visitDate:Date,
    notes:String,
    expense:{
        type:Number,
        default:0
    },
    images:[String]
},{timestamps:true});

module.exports = mongoose.model("Location",locationSchema);