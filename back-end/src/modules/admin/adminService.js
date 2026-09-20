import Parcelle from "../parcelles/parcelle.model.js";
import Trituration from "../triturations/trituration.model.js";
import User from "../users/user.model.js";
import Recolte from "../recoltes/recolte.model.js";
import Vendu from "../ventes/vendu.model.js";

export const getAllUsers = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const users = await User.find()
        .select("-motDePasse")
        .skip(skip)
        .limit(limit);
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

export const getAdminStats = async () => {
    const annee = new Date().getFullYear();
    const debut = new Date(`${annee}-01-01`);
    const fin = new Date(`${annee}-12-31T23:59:59.999`);

    const totalUsers = await User.countDocuments();
    const totalAgriculteurs = await User.countDocuments({
        role: "agriculteur",
    });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const totalParcelles = await Parcelle.countDocuments();
    const superficieTotale = await Parcelle.aggregate([
        { $group: { _id: null, total: { $sum: "$superficie" } } },
    ]);

    // Production
    const triturations = await Trituration.find({
        date: { $gte: debut, $lte: fin },
    });
    const totalHuile = triturations.reduce(
        (sum, t) => sum + (t.quantiteHuile || 0),
        0,
    );

    // Revenu
    const ventes = await Vendu.find({
        date: { $gte: debut, $lte: fin },
    });
    const revenuTotal = ventes.reduce((sum, v) => sum + (v.revenu || 0), 0);

    // ✅ Activité — nb récoltes, triturations, ventes
    const nbRecoltes = await Recolte.countDocuments({
        date: { $gte: debut, $lte: fin },
    });

    return {
        annee,
        totalUsers,
        totalAgriculteurs,
        totalAdmins,
        totalParcelles,
        superficieTotale: superficieTotale[0]?.total || 0,
        totalHuile,
        revenuTotal,
        nbRecoltes,
        nbTriturations: triturations.length,
        nbVentes: ventes.length,
    };
};
