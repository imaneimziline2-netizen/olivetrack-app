import Joi from "joi";

export const createTriturationValidator = Joi.object({
    date: Joi.date().max("now").required(),
    quantite: Joi.number().positive().required(),
    quantiteHuile: Joi.number().positive().required(),
});

export const updateTriturationValidator = Joi.object({
    date: Joi.date().max("now"),
    quantite: Joi.number().positive(),
    quantiteHuile: Joi.number().positive(),
});