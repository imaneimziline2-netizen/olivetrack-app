import Joi from "joi";

export const createParcelleValidator = Joi.object({
    nom: Joi.string().min(2).required(),
    superficie: Joi.number().positive().required(),
    localisation: Joi.string().min(2).required(),
});

export const updateParcelleValidator = Joi.object({
    nom: Joi.string().min(2),
    superficie: Joi.number().positive(),
    localisation: Joi.string().min(2),
}).min(1);
