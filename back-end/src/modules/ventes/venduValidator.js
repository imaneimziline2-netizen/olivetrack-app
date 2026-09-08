import Joi from "joi";

export const createVenduValidator = Joi.object({
    date: Joi.date().max("now").required(),
    quantiteVendue: Joi.number().positive().required(),
    revenu: Joi.number().positive().required(),
});

export const updateVenduValidator = Joi.object({
    date: Joi.date().max("now"),
    quantiteVendue: Joi.number().positive(),
    revenu: Joi.number().positive(),
}).min(1);