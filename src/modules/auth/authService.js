import User from "../users/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async ({ nom, email, motDePasse ,role}) => {
    const existing = await User.findOne({ email });
    if (existing) {
        const error = new Error("Email déja utilisé");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 12);

    const user = await User.create({
        nom,
        email,
        motDePasse: hashedPassword,
        role: role || "agriculteur"
    });

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
    );

    const safeUser = await User.findById(user._id).select("-motDePasse");

    return { user: safeUser, token };
};

export const loginUser = async ({ email, motDePasse }) => {
    const user = await User.findOne({ email }).select("+motDePasse");
    if (!user) {
        const error = new Error("Email ou mot de passe invalide");
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isMatch) {
        const error = new Error("Email ou mot de passe invalide");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
    );

    return {
        token,
        user: {
            id: user._id,
            nom: user.nom,
            email: user.email,
            role: user.role,
        },
    };
};
