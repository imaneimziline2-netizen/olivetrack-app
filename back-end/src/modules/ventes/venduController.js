import { serverErrorResponse } from "../../utils/serverErrorResponse.js";
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

        const vendu = await createVendu(
            req.params.parcelleId,
            req.body,
        );
        res.status(201).json(vendu);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function list(req, res) {
    try {
        const ventes = await getVentesByParcelle(
            req.params.parcelleId,
        );
        res.json(ventes);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function getOne(req, res) {
    try {
        const vendu = await getVenduById(
            req.params.id,
        );
        res.json(vendu);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function remove(req, res) {
    try {
        await deleteVendu(req.params.id);
        res.status(200).json({ message: "Vente supprimée, stock restitué" });
    } catch (err) {
        serverErrorResponse(res, err);
    }
}