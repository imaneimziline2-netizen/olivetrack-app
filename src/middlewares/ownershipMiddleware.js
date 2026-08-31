export const checkOwnership = (Model, paramName = "id") => {
    return async (req, res, next) => {
        try {
            const resource = await Model.findById(req.params[paramName]);

            if (!resource) {
                return res.status(404).json({ message: "Ressource introuvable" });
            }

            const isOwner = resource.userId?.toString() === req.user.userId;
            const isAdmin = req.user.role === "admin";

            if (!isOwner && !isAdmin) {
                return res.status(403).json({ message: "Accès refusé : ressource non autorisée" });
            }

            req.resource = resource;
            next();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
};