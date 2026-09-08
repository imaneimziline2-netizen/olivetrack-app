import mongoose from "mongoose";

export const paramIdCheck = (paramName) => {
    return (req, res, next) => {
        const paramValue = req.params[paramName];

        if (!paramValue) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        if (!mongoose.Types.ObjectId.isValid(paramValue)) {
            return res.status(400).json({ message: "Paramètre invalide" });
        }
        next();
    };
};
