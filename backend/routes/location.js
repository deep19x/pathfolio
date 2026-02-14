const express = require('express');
const router = express.Router({ mergeParams: true });
const locationController = require("../controllers/location");
const authMiddleware = require('../middlewares/auth');

router.post('/',authMiddleware,locationController.createLocation);

router.get('/:locationId',authMiddleware,locationController.getSingleLocation);

router.put('/:locationId',authMiddleware,locationController.editLocation);

router.delete('/:locationId',authMiddleware,locationController.deleteLocation);

module.exports = router;