const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const tripController = require('../controllers/trip');
const locationRoutes = require('./location')
const upload = require('../middlewares/cloudinary');

router.post('/',authMiddleware,tripController.createTrip);

router.get('/',authMiddleware,tripController.getTrips);

router.get('/:id',authMiddleware,tripController.getSingleTrip);

router.put('/:id',authMiddleware,tripController.editTrip);

router.delete('/:id',authMiddleware,tripController.deleteTrip);

router.use('/:id/locations',locationRoutes);

router.post('/:id/image',authMiddleware,upload.single("image"),tripController.uploadTripImage);

router.delete('/:id/image',authMiddleware,tripController.deleteTripImage);

module.exports = router;