import Vendu from "./vendu.model.js";
import ParcelleStock from "../parcelles/parcelleStock.model.js";

export const createVendu = async (parcelleId, data) => {
    
    const stock = await ParcelleStock.findOne({ parcelleId });
    if (!stock) {
        const error = new Error("Stock introuvable pour cette parcelle");
        error.statusCode = 404;
        throw error;
    }

    if (data.quantiteVendue > stock.Stock) {
        const error = new Error(
            `Quantité insuffisante en stock (disponible : ${stock.Stock} kg)`
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

export const getVentesByParcelle = async (parcelleId) => {
    
    const stock = await ParcelleStock.findOne({ parcelleId });
    if (!stock) {
        const error = new Error("Stock introuvable pour cette parcelle");
        error.statusCode = 404;
        throw error;
    }
    
    return Vendu.find({ parcelleStockId: stock._id }).sort({ date: -1 });
};

export const getVenduById = async (venduId) => {
    const vendu = await Vendu.findById(venduId);
    if (!vendu) {
        const error = new Error("Vente introuvable");
        error.statusCode = 404;
        throw error;
    }
    
    return vendu;
};

export const deleteVendu = async (venduId) => {
    const vendu = await Vendu.findById(venduId);
    if (!vendu) {
        const error = new Error("Vente introuvable");
        error.statusCode = 404;
        throw error;
    }
    
    const stock = await ParcelleStock.findById(vendu.parcelleStockId);
    

    if (stock) {
        stock.Stock += vendu.quantiteVendue; 
        stock.quantiteSortante -= vendu.quantiteVendue; 
        await stock.save();
    }

    await Vendu.findByIdAndDelete(venduId);
};