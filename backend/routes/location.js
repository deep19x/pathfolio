const express = require('express');
const router = express.Router({ mergeParams: true });
const locationController = require("../controllers/location");
const authMiddleware = require('../middlewares/auth');

const validate = require('../middlewares/validate');
const {locationSchema,updateLocationSchema} = require('../utils/locationValidator');

router.post('/',validate(locationSchema),authMiddleware,locationController.createLocation);

router.get('/',authMiddleware,locationController.getLocation);

router.get('/:locationId',authMiddleware,locationController.getSingleLocation);

router.put('/:locationId',validate(updateLocationSchema),authMiddleware,locationController.editLocation);

router.delete('/:locationId',authMiddleware,locationController.deleteLocation);

module.exports = router;