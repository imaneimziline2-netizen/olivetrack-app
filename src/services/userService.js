import User from "../models/user.model.js";

export const getPrifile = async (userId) => {
    const user = await User.findById(userId).select("-motDePasse");
    if (!user) {
        const error = new Error("Utilisateur introuvable");
        error.statusCode = 404;
        throw error;
    }
    return user;
};

export const updateProfile = async (userId, { nom, email }) => {
    if (email) {
        const existing = await User.findOne({ email, _id: { $ne: userId } }); //$ne = "not equal" (opérateur Mongoose/MongoDB)
        if (existing) {
            const error = new Error("Cet email est déjà utilisé");
            error.statusCode = 409;
            throw error;
        }
    }

    const updateData = {};
    if (nom) updateData.nom = nom;
    if (email) updateData.email = email;

    const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
    }).select("-motDePasse");

    if (!user) {
        const error = new Error("Utilisateur introuvable");
        error.statusCode = 404;
        throw error;
    }

    return user;
};
