import Joi from "joi";

export const createParcelleValidator = Joi.object({
    nom: Joi.string().min(2).required(),
    superficie: Joi.number().positive().required(),
    localisation: Joi.string().min(2).required(),
    variete: Joi.string().min(2).required(),
    typeIrrigation: Joi.string().min(2).required(),
    modeCulture: Joi.string().min(2).required(),
    nombreArbres: Joi.number().integer().positive().required(),
    anneePlantation: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
});

export const updateParcelleValidator = Joi.object({
    nom: Joi.string().min(2),
    superficie: Joi.number().positive(),
    localisation: Joi.string().min(2),
    variete: Joi.string().min(2),
    typeIrrigation: Joi.string().min(2),
    modeCulture: Joi.string().min(2),
    nombreArbres: Joi.number().integer().positive(),
    anneePlantation: Joi.number().integer().min(1900).max(new Date().getFullYear()),
}).min(1);