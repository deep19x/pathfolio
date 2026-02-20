const Trip = require('../models/trip');
const Location = require('../models/location');
const cloudinary = require('../middlewares/cloudinary');

module.exports.createTrip = async (req, res) => {
    try {
        const trip = await Trip.create({
            ...req.body,
            user: req.user.id,
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

        if (req.body.isPublic !== undefined) {
            trip.isPublic = req.body.isPublic;
        }

        await trip.save();

        res.status(200).json({ success: true, message: "Trip is updated!", data: trip });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Problem", error: error });
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

        await Location.deleteMany({ trip: id });
        await Trip.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Trip and associated locations deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error
        });
    }
}

module.exports.uploadTripImage = async (req, res) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findById(id);

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        if (trip.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        trip.image = req.file.path;
        await trip.save();

        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: trip.image,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Problem",
            error: error.message,
        });
    }
}

module.exports.deleteTripImage = async (req, res) => {
    try {
        const { id } = req.params;

        const trip = await Trip.findById(id);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        if (trip.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }

        if (!trip.image) {
            return res.status(400).json({
                success: false,
                message: "No image to delete"
            });
        }

        const urlParts = trip.image.split("/");
        const fileName = urlParts[urlParts.length - 1];
        const fileNameWithoutExt = fileName.split(".")[0];

        const publicId = `trips/${fileNameWithoutExt}`;

        await cloudinary.uploader.destroy(publicId);

        trip.image = null;
        await trip.save();

        return res.status(200).json({
            success: true,
            message: "Image deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}