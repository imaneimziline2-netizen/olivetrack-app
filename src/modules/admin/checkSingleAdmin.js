import User from "../users/user.model.js";

export const checkSingleAdmin = async (req, res, next) => {
    if (req.body.role === "admin") {
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
            return res.status(409).json({ message: "Un compte administrateur existe déjà" });
        }
    }
    next();
};