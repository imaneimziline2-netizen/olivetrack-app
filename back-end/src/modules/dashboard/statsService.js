import Trituration from "../triturations/trituration.model.js";
import ParcelleStock from "../parcelles/parcelleStock.model.js";
import Parcelle from "../parcelles/parcelle.model.js";
import { detecterAnomalie } from "../../utils/anomalyDetector.js";

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
    const totalHuile = triturations.reduce((sum, t) => sum + t.quantitéHuile, 0);
    const rendement = Math.round((totalHuile / totalOlives) * 100 * 10) / 10;

    return { annee, rendement, totalOlives, totalHuile, nbTriturations: triturations.length };
};

export const comparerRendementParcelle = async (parcelleId, anneeActuelle) => {
    const anneesPrecedentes = [anneeActuelle - 1, anneeActuelle - 2, anneeActuelle - 3];

    const historique = [];
    for (const annee of anneesPrecedentes) {
        const result = await rendementAnnuelParcelle(parcelleId, annee);
        if (result.rendement !== null) historique.push(result.rendement);
    }

    const actuel = await rendementAnnuelParcelle(parcelleId, anneeActuelle);
    if (actuel.rendement === null) return actuel;

    const { alerte, ecart, message, moyenneHistorique  } = detecterAnomalie(actuel.rendement, historique);

    return { ...actuel, alerte, ecart, moyenneHistorique, message };
};

export const rendementToutesParcelles = async (userId, annee) => {
    const parcelles = await Parcelle.find({ userId });

    const resultats = await Promise.all(
        parcelles.map(async (parcelle) => {
            const stats = await comparerRendementParcelle(parcelle._id, annee);
            return {
                parcelleId: parcelle._id,
                nomParcelle: parcelle.nom,
                ...stats,
            };
        })
    );

    return resultats;
};