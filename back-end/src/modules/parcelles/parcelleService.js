import Parcelle from "./parcelle.model.js";
import ParcelleStock from "./parcelleStock.model.js";
import Recolte from "../recoltes/recolte.model.js";
import Trituration from "../triturations/trituration.model.js";
import { detecterAnomalie } from "../../utils/anomalyDetector.js";

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
    const parcelle = await Parcelle.findById(parcelleId);
    if (!parcelle) {
        const error = new Error("Parcelle introuvable");
        error.statusCode = 404;
        throw error;
    }

    const stock = await ParcelleStock.findOne({ parcelleId });

    if (stock && stock.quantiteSortante > 0) {
        const error = new Error(
            "Impossible de supprimer cette parcelle : elle possède un historique de sorties. Supprimez-les d'abord si vous souhaitez continuer.",
        );
        error.statusCode = 409;
        throw error;
    }

    await Parcelle.findByIdAndDelete(parcelleId);
    await Recolte.deleteMany({ parcelleId });
    if (stock) {
        await ParcelleStock.deleteOne({ parcelleId });
    }

    return parcelle;
};

export const rendementAnnuelParcelle = async (parcelleId, annee) => {
    const stock = await ParcelleStock.findOne({ parcelleId });
    if (!stock) return { annee, rendement: null };

    const debut = new Date(`${annee}-01-01`);
    const fin = new Date(`${annee}-12-31T23:59:59`);

    const triturations = await Trituration.find({
        parcelleStockId: stock._id,
        date: { $gte: debut, $lte: fin },
    });

    if (triturations.length === 0) return { annee, rendement: null };

    const totalOlives = triturations.reduce((sum, t) => sum + t.quantite, 0);
    const totalHuile = triturations.reduce(
        (sum, t) => sum + t.quantiteHuile,
        0,
    );
    const rendement = Math.round((totalHuile / totalOlives) * 100 * 10) / 10;

    return {
        annee,
        rendement,
        totalOlives,
        totalHuile,
        nbTriturations: triturations.length,
    };
};

export const comparerRendementParcelle = async (parcelleId, anneeActuelle) => {
    const anneesPrecedentes = [
        anneeActuelle - 1,
        anneeActuelle - 2,
        anneeActuelle - 3,
    ];

    const historique = [];
    for (const annee of anneesPrecedentes) {
        const result = await rendementAnnuelParcelle(parcelleId, annee);
        if (result.rendement !== null) historique.push(result.rendement);
    }

    const actuel = await rendementAnnuelParcelle(parcelleId, anneeActuelle);
    if (actuel.rendement === null) return actuel;

    const { alerte, ecart, message, moyenneHistorique } = detecterAnomalie(
        actuel.rendement,
        historique,
    );

    return { ...actuel, alerte, ecart, moyenneHistorique, message };
};
