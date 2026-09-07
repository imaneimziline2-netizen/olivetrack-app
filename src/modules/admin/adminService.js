import User from "../users/user.model.js";

export const getAllUsers = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const users = await User.find().select("-motDePasse").skip(skip).limit(limit);
    const total = await User.countDocuments();
    return { users, total, page, totalPages: Math.ceil(total / limit) };
};

export const getUserById = async (userId) => {
    const user = await User.findById(userId).select("-motDePasse");
    if (!user) {
        const error = new Error("Utilisateur introuvable");
        error.statusCode = 404;
        throw error;
    }
    return user;
};