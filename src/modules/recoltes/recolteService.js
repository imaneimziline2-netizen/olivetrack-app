import Recolte from "./recolte.model.js";
import Parcelle from "../parcelles/parcelle.model.js";

const checkParcelleAccess = async (parcelleId, userId, userRole) => {
    const parcelle = await Parcelle.findById(parcelleId);
    if (!parcelle) {
        const error = new Error("Parcelle introuvable");
        error.statusCode = 404;
        throw error;
    }

    const isOwner = parcelle.userId.toString() === userId;
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAdmin) {
        const error = new Error(
            "Accès refusé : cette parcelle ne vous appartient pas",
        );
        error.statusCode = 403;
        throw error;
    }

    return parcelle;
};

export const createRecolte = async (parcelleId, userId, userRole, data) => {
    await checkParcelleAccess(parcelleId, userId, userRole);
    return Recolte.create({ ...data, parcelleId });
};

export const getRecoltesByParcelle = async (parcelleId, userId, userRole) => {
    await checkParcelleAccess(parcelleId, userId, userRole);
    return Recolte.find({ parcelleId }).sort({ date: -1 });
};

export const getRecolteById = async (recolteId, userId, userRole) => {
    const recolte = await Recolte.findById(recolteId);
    if (!recolte) {
        const error = new Error("Récolte introuvable");
        error.statusCode = 404;
        throw error;
    }

    await checkParcelleAccess(recolte.parcelleId, userId, userRole);
    return recolte;
};

export const updateRecolte = async (recolteId, userId, userRole, data) => {
    const recolte = await getRecolteById(recolteId, userId, userRole); // vérifie aussi l'accès
    Object.assign(recolte, data);
    await recolte.save();
    return recolte;
};

export const deleteRecolte = async(recolteId, userId, userRole)=>{
    await getRecolteById(recolteId, userId, userRole);
    await Recolte.findByIdAndDelete(recolteId)
    // TODO (Sprint 3) : supprimer en cascade les productions liées une fois ce module créé
}
