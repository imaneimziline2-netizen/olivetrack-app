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

    const quantite = Number(data.quantite);
    const quantiteHuile = Number(data.quantiteHuile);


    if (isNaN(quantiteHuile) || quantiteHuile <= 0) {
        const error = new Error("La quantité d'huile doit être un nombre supérieur à 0");
        error.statusCode = 400;
        throw error;
    }

    if (quantite > stock.Stock) {
        const error = new Error(
            `Quantité insuffisante en stock (disponible : ${stock.Stock} kg)`
        );
        error.statusCode = 409;
        throw error;
    }

    const rendement = calculerRendement(quantiteHuile, quantite);

    const trituration = await Trituration.create({
        ...data,
        quantite,
        quantiteHuile,
        parcelleStockId: stock._id,
        rendement,
    });

    stock.Stock = Number(stock.Stock) - quantite;
    stock.quantiteSortante = Number(stock.quantiteSortante) + quantite;
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