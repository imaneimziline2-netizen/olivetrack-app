import Vendu from "./vendu.model.js";
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

export const createVendu = async (parcelleId, userId, userRole, data) => {
    const stock = await checkStockAccess(parcelleId, userId, userRole);

    if (data.quantiteVendue > stock.Stock) {
        const error = new Error(
            `Quantité insuffisante en stock (disponible : ${stock.Stock} kg)`,
        );
        error.statusCode = 409;
        throw error;
    }

    const vendu = await Vendu.create({ ...data, parcelleStockId: stock._id });

    stock.Stock -= data.quantiteVendue;
    stock.quantiteSortante += data.quantiteVendue;
    await stock.save();

    return vendu;
};

export const getVentesByParcelle = async (parcelleId, userId, userRole) => {
    const stock = await checkStockAccess(parcelleId, userId, userRole);
    return Vendu.find({ parcelleStockId: stock._id }).sort({ date: -1 });
};

export const getVenduById = async (venduId, userId, userRole) => {
    const vendu = await Vendu.findById(venduId);
    if (!vendu) {
        const error = new Error("Vente introuvable");
        error.statusCode = 404;
        throw error;
    }

    const stock = await ParcelleStock.findById(vendu.parcelleStockId);
    if (!stock) {
        const error = new Error("Stock introuvable");
        error.statusCode = 404;
        throw error;
    }

    await checkStockAccess(stock.parcelleId, userId, userRole);
    return vendu;
};

export const deleteVendu = async (venduId, userId, userRole) => {
    const vendu = await getVenduById(venduId, userId, userRole);
    const stock = await ParcelleStock.findById(vendu.parcelleStockId);

    if (stock) {
        stock.Stock += vendu.quantiteVendue; 
        stock.quantiteSortante -= vendu.quantiteVendue; 
        await stock.save();
    }

    await Vendu.findByIdAndDelete(venduId);
};
