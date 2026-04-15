const Trip = require('../models/trip');
const Location = require('../models/location');
const cloudinary = require('../config/cloudinary');

module.exports.createTrip = async (req, res) => {
    try {
        let imageUrl = null;
        let imagePublicId = null;

        if (req.file) {
            imageUrl = req.file.path;
            imagePublicId = req.file.filename;
        }

        const trip = await Trip.create({
            ...req.body,
            user: req.user.id,
            image: imageUrl,
            imagePublicId: imagePublicId
        });


        res.status(200).json({ success: true, data: trip });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Down!", error: error });
    }
}

module.exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.user.id });

        res.status(200).json({ success: true, data: trips, noOfTrips: trips.length });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Problem" });
    }
}

module.exports.editTrip = async (req, res) => {
    try {
        const { id } = req.params;

        const trip = await Trip.findOne({
            _id: id,
            user: req.user.id,
        });

        if (!trip) {
            return res.status(400).json({ success: false, message: "Trip not found!" })
        }

        if (req.body.title !== undefined) {
            trip.title = req.body.title;
        }

        if (req.body.description !== undefined) {
            trip.description = req.body.description;
        }

        if (req.body.startDate !== undefined) {
            trip.startDate = req.body.startDate;
        }

        if (req.body.endDate !== undefined) {
            trip.endDate = req.body.endDate;
        }

        if (req.body.isPublic !== undefined) {
            trip.isPublic = req.body.isPublic;
        }

        if (req.file) {
            if (trip.imagePublicId) {
                await cloudinary.uploader.destroy(trip.imagePublicId);
            }

            trip.image = req.file.path;
            trip.imagePublicId = req.file.filename;
        }

        await trip.save();

        res.status(200).json({ success: true, message: "Trip is updated!", data: trip });

    } catch (error) {

        console.error("UPDATE ERROR:", error); // 🔥 MUST

        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });

    }
}

module.exports.getSingleTrip = async (req, res) => {
    try {
        const { id } = req.params;

        const trip = await Trip.findById(id).populate("locations");

        if (!trip) {
            res.status(400).json({ success: false, message: "Trip not found!" });
        }

        res.status(200).json({
            success: true,
            data: trip
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error
        });
    }
}

module.exports.deleteTrip = async (req, res) => {
    try {
        const { id } = req.params;

        const trip = await Trip.findById(id);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        if (trip.user.toString() != req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }

        if (trip.imagePublicId) {
            await cloudinary.uploader.destroy(trip.imagePublicId);
        }

        const locations = await Location.find({ trip: id });

        for (let loc of locations) {
            if (loc.imagePublicId) {
                await cloudinary.uploader.destroy(loc.imagePublicId);
            }
        }

        await Location.deleteMany({ trip: id });
        await Trip.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Trip, locations & images deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

module.exports.public = async (req, res) => {
    try {
        const trips = await Trip.find({ isPublic: true }).populate('user', 'name');
        res.status(200).json({ success: true, data: trips });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}