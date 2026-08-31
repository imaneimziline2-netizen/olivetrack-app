import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied, token manquant" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide" });
    }
};

// export const emailExiste = async (req, res, next) => {
//     try {
//         const { email } = req.body;
//         const existEmail = await User.findOne({ email });

//         if (existEmail) {
//             return res.status(409).json({ message: "Email already exists" });
//         }

//         next();
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };