import parcelleModel from "../parcelles/parcelle.model.js";
import Recolte from "./recolte.model.js";


export const checkRecolteAccess = (paramName = "id") => {
    return async (req, res, next) => {
        try {
            const recolte = await Recolte.findById(req.params[paramName]);
            if (!recolte) {
                return res.status(404).json({ message: "Récolte introuvable" });
            }

            const parcelle = await parcelleModel.findById(recolte.parcelleId);
            if (!parcelle) {
                return res.status(404).json({ message: "Parcelle introuvable" });
            }

            const isOwner = parcelle.userId.toString() === req.user.userId;
            const isAdmin = req.user.role === "admin";
            if (!isOwner && !isAdmin) {
                return res.status(403).json({ message: "Accès refusé : cette récolte ne vous appartient pas" });
            }

            req.recolte = recolte;
            next();
        } catch (error) {
            next(error);
        }
    };
};