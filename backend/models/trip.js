const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    startDate:Date,
    endDate:Date,
    description:String,
    budget:Number,
    isPublic:{
        type:Boolean,
        default:false,
    },
    locations:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Location"
    }]
},{timestamps:true});


module.exports = mongoose.model("Trip",tripSchema);