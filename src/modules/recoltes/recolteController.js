import {
    createRecolte,
    getRecoltesByParcelle,
    getRecolteById,
    updateRecolte,
    deleteRecolte,
} from "./recolteService.js";
import {
    createRecolteValidator,
    updateRecolteValidator,
} from "./recolteValidator.js";

export async function create(req, res) {
    try {
        const { error } = createRecolteValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const recolte = await createRecolte(
            req.params.parcelleId,
            req.user.userId,
            req.user.role,
            req.body,
        );
        res.status(201).json(recolte);
    } catch (error) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}

export async function list(req, res) {
    try {
        const recolte = await getRecoltesByParcelle(
            req.params.parcelleId,
            req.user.userId,
            req.user.role,
        );
        res.json(recolte);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

export async function getOne(req, res) {
    try {
        const recolte = await getRecolteById(req.params.id, req.user.userId, req.user.role);
        res.json(recolte);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}

export async function update(req, res) {
    try {
        const { error } = updateRecolteValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const recolte = await updateRecolte(req.params.id, req.user.userId, req.user.role, req.body);
        res.json(recolte);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}

export async function remove(req, res) {
    try {
        await deleteRecolte(req.params.id, req.user.userId, req.user.role);
        res.status(200).json({ message: "Récolte supprimée" });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}