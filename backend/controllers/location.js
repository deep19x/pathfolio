const Location = require('../models/location');
const Trip = require('../models/trip');

module.exports.createLocation = async(req,res) => {
    try {
        const {id} = req.params;

        const trip = await Trip.findOne({
            _id:id
        });

        if(!trip){
            return res.status(400).json({success:false,message:"Trip not found!"});
        }

        if (trip.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }

        const location = await Location.create({
            ...req.body,
            trip:id,
        });

        trip.locations.push(location._id);
        await trip.save();

        res.status(200).json({success:true,message:`Location added in Trip "${trip.title}"`,data:location});
    } catch (error) {
        res.status(500).json({success:false,message:"Server error",error:error.message});
    }
}

module.exports.getSingleLocation = async(req,res) => {
    try {
        const {locationId} = req.params;

        const location = await Location.findById(locationId);

        if(!location){
            return res.status(400).json({
                success:false,
                message:"Location not Found",
            });
        }

        res.status(200).json({
            success:true,
            message:"Location fetched!",
            data:location
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Server Problem!",
        });
    }
}

module.exports.editLocation = async(req,res) => {
    try {
        const {locationId} = req.params;

        const location = await Location.findById(locationId);

        if(!location){
            return res.status(400).json({
                success:false,
                message:"Location not found",
            });
        }

        const tripId = location.trip;

        const trip = await Trip.findById(tripId);

        if(trip.user.toString() != req.user.id){
            return res.status(400).json({
                success:false,
                message:"You're not authorized to make changes in this Location",
            });
        }

        const updatedLocation = await Location.findByIdAndUpdate(
            locationId,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Location updated successfully",
            data: updatedLocation
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}

module.exports.deleteLocation = async(req,res)=> {
    try {
        const {locationId} = req.params;

        const location = await Location.findById(locationId);

        if(!location){
            return res.status(400).json({
                success:false,
                message:"Location not found",
            });
        }

        const tripId = location.trip;

        const trip = await Trip.findById(tripId);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        if(trip.user.toString() != req.user.id){
            return res.status(400).json({
                success:false,
                message:"You're not authorized to make changes in this Location",
            });
        }

        await Location.findByIdAndDelete(locationId);

        await Trip.findByIdAndUpdate(tripId,{
            $pull:{locations:locationId}
        });

        res.status(200).json({
            success: true,
            message: "Location deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}