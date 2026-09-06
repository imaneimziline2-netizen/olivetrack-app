import Recolte from "./recolte.model.js";
import ParcelleStock from "../parcelles/parcelleStock.model.js";

export const createRecolte = async (parcelleId, data) => {
    
    const recolte = await Recolte.create({ ...data, parcelleId });

    await ParcelleStock.findOneAndUpdate(
        { parcelleId },
        {
            $inc: {
                Stock: data.quantiteOlives,
                quantiteEntrant: data.quantiteOlives,
            },
        }
    );

    return recolte;
};

export const getRecoltesByParcelle = async (parcelleId) => {
    return Recolte.find({ parcelleId }).sort({ date: -1 });
};

export const getRecolteById = async (recolteId) => {
    const recolte = await Recolte.findById(recolteId);
    if (!recolte) {
        const error = new Error("Récolte introuvable");
        error.statusCode = 404;
        throw error;
    }
    
    return recolte;
};

export const updateRecolte = async (recolteId, data) => {
    const recolte = await Recolte.findById(recolteId);
    if (!recolte) {
        const error = new Error("Récolte introuvable");
        error.statusCode = 404;
        throw error;
    }
    
    Object.assign(recolte, data);
    await recolte.save();
    return recolte;
};

export const deleteRecolte = async (recolteId) => {
    const recolte = await Recolte.findById(recolteId);
    if (!recolte) {
        const error = new Error("Récolte introuvable");
        error.statusCode = 404;
        throw error;
    }

    const stock = await ParcelleStock.findOne({
        parcelleId: recolte.parcelleId,
    });

    if (stock && stock.Stock < recolte.quantiteOlives) {
        const error = new Error(
            "Impossible de supprimer cette récolte : une partie de sa quantité a déjà été triturée"
        );
        error.statusCode = 409;
        throw error;
    }

    if (stock) {
        stock.Stock -= recolte.quantiteOlives;
        stock.quantiteEntrant -= recolte.quantiteOlives;
        await stock.save();
    }

    await Recolte.findByIdAndDelete(recolteId);
};