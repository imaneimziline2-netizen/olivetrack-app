import Parcelle from "./parcelle.model.js";
import { serverErrorResponse } from "../../utils/serverErrorResponse.js";

export const checkParcelleAccess = (paramName = "parcelleId") => {
    return async (req, res, next) => {
        try {
            const parcelleId = req.params[paramName];

            if (!parcelleId) {
                return res
                    .status(400)
                    .json({ message: "ID de parcelle manquant" });
            }

            const parcelle = await Parcelle.findById(parcelleId);

            if (!parcelle) {
                return res
                    .status(404)
                    .json({ message: "Parcelle introuvable" });
            }

            const isOwner = parcelle.userId.toString() === req.user.userId;
            const isAdmin = req.user.role === "admin";

            if (!isOwner && !isAdmin) {
                return res.status(403).json({
                    message:
                        "Accès refusé : cette parcelle ne vous appartient pas",
                });
            }

            req.parcelle = parcelle;
            next();
        } catch (error) {
            serverErrorResponse(res, error);
        }
    };
};
