import Parcelle from "../models/parcelle.model.js";

export const createParcelle = async (userId, data) => {
    return Parcelle.create({ ...data, userId });
};

export const getMyParcelles = async (userId, userRole) => {
    if (userRole === "admin") {
        return Parcelle.find(); // admin voit tout
    }
    return Parcelle.find({ userId });
};

export const getParcelleById = async (parcelleId) => {
    const parcelle = await Parcelle.findById(parcelleId);
    if (!parcelle) {
        const error = new Error("Parcelle introuvable");
        error.statusCode = 404;
        throw error;
    }
    return parcelle;
};

export const updateParcelle = async (parcelleId, data) => {
    const parcelle = await Parcelle.findByIdAndUpdate(parcelleId, data, {
        new: true,
        runValidators: true,
    });
    if (!parcelle) {
        const error = new Error("Parcelle introuvable");
        error.statusCode = 404;
        throw error;
    }
    return parcelle;
};

export const deleteParcelle = async (parcelleId) => {
    const parcelle = await Parcelle.findByIdAndDelete(parcelleId);
    if (!parcelle) {
        const error = new Error("Parcelle introuvable");
        error.statusCode = 404;
        throw error;
    }
    // TODO (Sprint 2 suivant) : supprimer en cascade les récoltes et productions liées
    return parcelle;
};