const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const tripController = require('../controllers/trip');
const locationRoutes = require('./location')
const upload = require('../middlewares/cloudinary');

const validate = require('../middlewares/validate');
const {tripSchema,updateTripSchema} = require('../utils/tripValidator');

router.post('/',validate(tripSchema),authMiddleware,tripController.createTrip);

router.get('/',authMiddleware,tripController.getTrips);

router.get('/public',tripController.public);

router.use('/:id/locations',locationRoutes);

router.get('/:id',authMiddleware,tripController.getSingleTrip);

router.put('/:id',validate(updateTripSchema),authMiddleware,tripController.editTrip);

router.delete('/:id',authMiddleware,tripController.deleteTrip);


router.post('/:id/image',authMiddleware,upload.single("image"),tripController.uploadTripImage);

router.delete('/:id/image',authMiddleware,tripController.deleteTripImage);

module.exports = router;