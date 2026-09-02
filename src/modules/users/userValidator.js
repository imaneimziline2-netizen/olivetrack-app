import Joi from "joi";

export const registerValidator = Joi.object({
    nom : Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    motDePasse: Joi.string().min(8).required(), 
})

export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    motDePasse: Joi.string().required(),
})


export const updateProfileValidator = Joi.object({
    nom: Joi.string().min(2),
    email: Joi.string().email(),
})