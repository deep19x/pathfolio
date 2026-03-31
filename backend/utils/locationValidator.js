const Joi = require('joi');

const locationSchema = Joi.object({
    placeName : Joi.string().min(3).required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    visitDate: Joi.date().optional(),
    notes:Joi.string().optional(),
    expense:Joi.number().min(0).optional(),
    images:Joi.array().items(Joi.string().optional())
});

const updateLocationSchema = Joi.object({
    placeName : Joi.string().min(3).optional(),
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
    visitDate: Joi.date().optional(),
    notes:Joi.string().optional(),
    expense:Joi.number().min(0).optional(),
    images:Joi.array().items(Joi.string().optional())
})

module.exports = {locationSchema,updateLocationSchema};