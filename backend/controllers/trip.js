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

module.exports.editTrip = async(req,res) => {
    try {
        const {id} = req.params;
        
        const trip = await Trip.findOne({
            _id:id,
            user:req.user.id,
        });

        if(!trip){
            return res.status(400).json({success:false,message:"Trip not found!"})
        }

        if (req.body.title !== undefined) {
            trip.title = req.body.title;
        }

        if (req.body.description !== undefined) {
            trip.description = req.body.description;
        }

        if (req.body.isPublic !== undefined) {
            trip.isPublic = req.body.isPublic;
        }

        await trip.save();

        res.status(200).json({success:true,message:"Trip is updated!",data:trip});

    } catch (error) {
        res.status(500).json({success:false,message:"Server Problem",error:error});
    }
}