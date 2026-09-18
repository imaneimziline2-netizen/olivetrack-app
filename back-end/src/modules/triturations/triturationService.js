import Trituration from "./trituration.model.js";
import ParcelleStock from "../parcelles/parcelleStock.model.js";
import { calculerRendement } from "../../utils/rendementCalculator.js";

export const createTrituration = async (parcelleId, data) => {
    
    const stock = await ParcelleStock.findOne({ parcelleId });
    if (!stock) {
        const error = new Error("Stock introuvable pour cette parcelle");
        error.statusCode = 404;
        throw error;
    }

    if (data.quantite > stock.Stock) {
        const error = new Error(
            `Quantité insuffisante en stock (disponible : ${stock.Stock} kg)`
        );
        error.statusCode = 409;
        throw error;
    }

    const rendement = calculerRendement(data.quantiteHuile, data.quantite);

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

export const getTriturationsByParcelle = async (parcelleId) => {
    
    const stock = await ParcelleStock.findOne({ parcelleId });
    if (!stock) {
        const error = new Error("Stock introuvable pour cette parcelle");
        error.statusCode = 404;
        throw error;
    }
    
    return Trituration.find({ parcelleStockId: stock._id }).sort({ date: -1 });
};

export const getTriturationById = async (triturationId) => {
    const trituration = await Trituration.findById(triturationId);
    if (!trituration) {
        const error = new Error("Trituration introuvable");
        error.statusCode = 404;
        throw error;
    }
    
    return trituration;
};

export const deleteTrituration = async (triturationId) => {
    const trituration = await Trituration.findById(triturationId);
    if (!trituration) {
        const error = new Error("Trituration introuvable");
        error.statusCode = 404;
        throw error;
    }
    
    const stock = await ParcelleStock.findById(trituration.parcelleStockId);
    

    if (stock) {
        stock.Stock += trituration.quantite;
        stock.quantiteSortante -= trituration.quantite;
        await stock.save();
    }

    await Trituration.findByIdAndDelete(triturationId);
};