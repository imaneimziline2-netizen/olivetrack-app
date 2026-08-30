import { registerValidator, loginValidator } from "../validator/userValidator.js";
import { registerUser, loginUser } from "../services/authService.js";

export async function register(req, res) {
    try {
        const { error } = registerValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const result = await registerUser(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}


export async function login(req, res) {
    try {
        const { error } = loginValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const result = await loginUser(req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}