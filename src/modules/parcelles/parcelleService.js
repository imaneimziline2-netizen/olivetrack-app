import Parcelle from "./parcelle.model.js";
import ParcelleStock from "./parcelleStock.model.js";
import Recolte from "../recoltes/recolte.model.js";

export const createParcelle = async (userId, data) => {
    const parcelle = await Parcelle.create({ ...data, userId });

    await ParcelleStock.create({
        nom: `Stock - ${parcelle.nom}`,
        parcelleId: parcelle._id,
    });

    return parcelle;
};

export const getMyParcelles = async (userId, userRole) => {
    if (userRole === "admin") {
        return Parcelle.find();
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

    await Recolte.deleteMany({ parcelleId });

    await ParcelleStock.deleteOne({ parcelleId });

    return parcelle;
};
