import Trituration from "./trituration.model.js";
import ParcelleStock from "../parcelles/parcelleStock.model.js";
import Parcelle from "../parcelles/parcelle.model.js";

const checkStockAccess = async (parcelleId, userId, userRole) => {
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

    const stock = await ParcelleStock.findOne({ parcelleId });
    if (!stock) {
        const error = new Error("Stock introuvable pour cette parcelle");
        error.statusCode = 404;
        throw error;
    }
    return stock;
};

const calculerRendement = (quantitéHuile, quantite) => {
    return Math.round((quantitéHuile / quantite) * 100 * 10) / 10 ;
};

export const createTrituration = async (parcelleId, userId, userRole, data) => {
    const stock = await checkStockAccess(parcelleId, userId, userRole);

    if (data.quantite > stock.Stock) {
        const error = new Error(
            `Quantité insuffisante en stock (disponible : ${stock.Stock} kg)`,
        );
        error.statusCode = 409;
        throw error;
    }

    const rendement = calculerRendement(data.quantitéHuile, data.quantite);

    const trituration = await Trituration.create({
        ...data,
        parcelleStockId: stock._id,
        rendement,
    });

    stock.Stock -= data.quantite;
    stock.quantiteSortante += data.quantite;
    await stock.save();

    return trituration;
};

export const getTriturationsByParcelle = async (parcelleId, userId, userRole) => {
    const stock = await checkStockAccess(parcelleId, userId, userRole);
    return Trituration.find({ parcelleStockId: stock._id }).sort({ date: -1 });
};


export const getTriturationById = async (triturationId, userId, userRole) => {
    const trituration = await Trituration.findById(triturationId);
    if (!trituration) {
        const error = new Error("Trituration introuvable");
        error.statusCode = 404;
        throw error;
    }

    const stock = await ParcelleStock.findById(trituration.parcelleStockId);
    if (!stock) {
        const error = new Error("Stock introuvable");
        error.statusCode = 404;
        throw error;
    }

    await checkStockAccess(stock.parcelleId, userId, userRole);
    return trituration;
};

export const deleteTrituration = async (triturationId, userId, userRole) => {
    const trituration = await getTriturationById(triturationId, userId, userRole);
    const stock = await ParcelleStock.findById(trituration.parcelleStockId);

    // On restitue la quantité au stock (annulation de l'opération)
    if (stock) {
        stock.Stock += trituration.quantite;
        stock.quantiteSortante -= trituration.quantite;
        await stock.save();
    }

    await Trituration.findByIdAndDelete(triturationId);
};