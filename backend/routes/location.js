const express = require('express');
const router = express.Router({ mergeParams: true });
const locationController = require("../controllers/location");
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/cloudinary');

const validate = require('../middlewares/validate');
const {locationSchema,updateLocationSchema} = require('../utils/locationValidator');

router.post('/',authMiddleware,upload.array("images",5),validate(locationSchema),locationController.createLocation);

router.get('/',authMiddleware,locationController.getLocation);

router.get('/:locationId',authMiddleware,locationController.getSingleLocation);

router.put('/:locationId',authMiddleware,validate(updateLocationSchema),locationController.editLocation);

router.delete('/:locationId',authMiddleware,locationController.deleteLocation);

module.exports = router;