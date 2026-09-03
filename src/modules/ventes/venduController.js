import {
    createVendu,
    getVentesByParcelle,
    getVenduById,
    deleteVendu,
} from "./venduService.js";
import { createVenduValidator } from "./venduValidator.js";

export async function create(req, res) {
    try {
        const { error } = createVenduValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const vendu = await createVendu(req.params.parcelleId, req.user.userId, req.user.role, req.body);
        res.status(201).json(vendu);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}

export async function list(req, res) {
    try {
        const ventes = await getVentesByParcelle(req.params.parcelleId, req.user.userId, req.user.role);
        res.json(ventes);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}

export async function getOne(req, res) {
    try {
        const vendu = await getVenduById(req.params.id, req.user.userId, req.user.role);
        res.json(vendu);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}

export async function remove(req, res) {
    try {
        await deleteVendu(req.params.id, req.user.userId, req.user.role);
        res.status(200).json({ message: "Vente supprimée, stock restitué" });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}