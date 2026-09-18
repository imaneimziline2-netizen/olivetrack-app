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
    const totalHuile = triturations.reduce((sum, t) => sum + t.quantiteHuile, 0);
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



export const rendementMensuelGlobal = async (userId, annee) => {
    // 1. Parcelles dyal user
    const parcelles = await Parcelle.find({ userId }).select("_id");
    const parcelleIds = parcelles.map((p) => p._id);

    // 2. Stocks dyal had parcelles
    const stocks = await ParcelleStock.find({
        parcelleId: { $in: parcelleIds },
    }).select("_id");
    const stockIds = stocks.map((s) => s._id);

    // 3. Dates dyal l-année
    const debut = new Date(`${annee}-01-01`);
    const fin = new Date(`${annee}-12-31T23:59:59.999`);

    // 4. Aggregation b $month
    const result = await Trituration.aggregate([
        {
            $match: {
                parcelleStockId: { $in: stockIds },
                date: { $gte: debut, $lte: fin },
            },
        },
        {
            $group: {
                _id: { $month: "$date" },
                totalOlives: { $sum: "$quantite" },
                totalHuile: { $sum: "$quantiteHuile" },
                nbTriturations: { $sum: 1 },
            },
        },
        { $sort: { _id: 1 } },
    ]);

    // 5. Rempli 12 mois b 0
    const monthlyData = Array.from({ length: 12 }, (_, i) => {
        const mois = i + 1;
        const found = result.find((r) => r._id === mois);

        return {
            mois,
            totalOlives: found?.totalOlives || 0,
            totalHuile: found?.totalHuile || 0,
            nbTriturations: found?.nbTriturations || 0,
            rendement:
                found && found.totalOlives > 0
                    ? Math.round(
                          (found.totalHuile / found.totalOlives) * 100 * 10
                      ) / 10
                    : 0,
        };
    });

    return monthlyData;
};