import { serverErrorResponse } from "../../utils/serverErrorResponse.js";
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
            req.body,
        );
        res.status(201).json(recolte);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function list(req, res) {
    try {
        const recolte = await getRecoltesByParcelle(
            req.params.parcelleId,
        );
        res.json(recolte);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function getOne(req, res) {
    try {
        const recolte = await getRecolteById(
            req.params.id,
        );
        res.json(recolte);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function update(req, res) {
    try {
        const { error } = updateRecolteValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const recolte = await updateRecolte(
            req.params.id,
            req.body,
        );
        res.json(recolte);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function remove(req, res) {
    try {
        await deleteRecolte(req.params.id);
        res.status(200).json({ message: "Récolte supprimée" });
    } catch (err) {
        serverErrorResponse(res, err);
    }
}