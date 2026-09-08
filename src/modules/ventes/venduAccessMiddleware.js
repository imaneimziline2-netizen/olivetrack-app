import Vendu from "./vendu.model.js";
import ParcelleStock from "../parcelles/parcelleStock.model.js";
import Parcelle from "../parcelles/parcelle.model.js";

export const checkVenduAccess = (paramName = "id") => {
    return async (req, res, next) => {
        try {
            const vendu = await Vendu.findById(req.params[paramName]);
            if (!vendu) {
                return res.status(404).json({ message: "Vente introuvable" });
            }

            const stock = await ParcelleStock.findById(vendu.parcelleStockId);
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
                return res.status(403).json({ message: "Accès refusé : cette vente ne vous appartient pas" });
            }

            req.vendu = vendu;
            next();
        } catch (error) {
            next(error);
        }
    };
};