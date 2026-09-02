import Joi from "joi";

export const createRecolteValidator = Joi.object({
    date: Joi.date().max("now").required().messages({
        "date.max": "La date de récolte ne peut pas être dans le futur",
    }),
    quantiteOlives: Joi.number().positive().required(),
});

export const updateRecolteValidator = Joi.object({
    date: Joi.date().max("now"),
    quantiteOlives: Joi.number().positive(),
}).min(1);
