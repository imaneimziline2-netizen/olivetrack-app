import {
    createParcelle,
    getMyParcelles,
    getParcelleById,
    updateParcelle,
    deleteParcelle,
} from "../services/parcelleService.js";
import {
    createParcelleValidator,
    updateParcelleValidator,
} from "../validator/parcelleValidator.js";

export async function create(req, res) {
    try {
        const { error } = createParcelleValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const parcelle = await createParcelle(req.user.userId, req.body);
        res.status(201).json(parcelle);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}

export async function list(req, res) {
    try {
        const parcelles = await getMyParcelles(req.user.userId, req.user.role);
        res.json(parcelles);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}

export async function getOne(req, res) {
    try {
        const parcelle = await getParcelleById(req.params.id);
        res.json(parcelle);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}

export async function update(req, res) {
    try {
        const { error } = updateParcelleValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const parcelle = await updateParcelle(req.params.id, req.body);
        res.json(parcelle);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}

export async function remove(req, res) {
    try {
        await deleteParcelle(req.params.id);
        res.status(200).json({ message: "Parcelle supprimée" });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}
