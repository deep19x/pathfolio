const Trip = require('../models/trip');

module.exports.createTrip = async(req,res)=>{
    try {
        const trip = await Trip.create({
            ...req.body,
            user:req.user.id,
        });

        res.status(200).json({success:true,data:trip});
    } catch (error) {
        res.status(500).json({success:false,message:"Server Down!"});
    }
}

module.exports.getTrips = async(req,res)=>{
    try {
        const trips = await Trip.find({user:req.user.id});

        res.status(200).json({success:true,data:trips,noOfTrips:trips.length});
    } catch (error) {
        res.status(500).json({success:false,message:"Server Problem"});
    }
}