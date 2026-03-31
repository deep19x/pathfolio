const Joi = require('joi');

const tripSchema = Joi.object({
    title: Joi.string().min(3).required(),
    country: Joi.string().required(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().min(Joi.ref("startDate")).optional(),
    description: Joi.string().max(1000).optional(),
    budget: Joi.number().min(0).optional(),
    isPublic: Joi.boolean().optional(),
    image: Joi.string().optional()
});

const updateTripSchema = Joi.object({
    title: Joi.string().min(3).optional(),
    country: Joi.string().optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().min(Joi.ref("startDate")).optional(),
    description: Joi.string().max(1000).optional(),
    budget: Joi.number().min(0).optional(),
    isPublic: Joi.boolean().optional(),
    image: Joi.string().optional()
});

module.exports = { tripSchema, updateTripSchema };