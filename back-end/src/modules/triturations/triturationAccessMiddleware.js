import Trituration from "./trituration.model.js";
import ParcelleStock from "../parcelles/parcelleStock.model.js";
import Parcelle from "../parcelles/parcelle.model.js";

export const checkTriturationAccess = (paramName = "id") => {
    return async (req, res, next) => {
        try {
            const trituration = await Trituration.findById(req.params[paramName]);
            if (!trituration) {
                return res.status(404).json({ message: "Trituration introuvable" });
            }

            const stock = await ParcelleStock.findById(trituration.parcelleStockId);
            if (!stock) {
                return res.status(404).json({ message: "Stock introuvable" });
            }

            const parcelle = await Parcelle.findById(stock.parcelleId);
            if (!parcelle) {
                return res.status(404).json({ message: "Parcelle introuvable" });
            }

            const isOwner = parcelle.userId.toString() === req.user.userId;
            const isAdmin = req.user.role === "admin";
            if (!isOwner && !isAdmin) {
                return res.status(403).json({ message: "Accès refusé : cette trituration ne vous appartient pas" });
            }

            req.trituration = trituration;
            next();
        } catch (error) {
            next(error);
        }
    };
};