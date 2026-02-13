const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const tripController = require('../controllers/trip');

router.post('/',authMiddleware,tripController.createTrip);

router.get('/',authMiddleware,tripController.getTrips);

router.put('/:id',authMiddleware,tripController.editTrip);

module.exports = router;