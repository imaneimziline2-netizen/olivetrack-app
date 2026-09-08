import { serverErrorResponse } from "../../utils/serverErrorResponse.js";
import {
    createTrituration,
    getTriturationsByParcelle,
    getTriturationById,
    deleteTrituration,
} from "./triturationService.js";
import { createTriturationValidator } from "./triturationValidator.js";

export async function create(req, res) {
    try {
        const { error } = createTriturationValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const trituration = await createTrituration(
            req.params.parcelleId,
            req.body,
        );
        res.status(201).json(trituration);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function list(req, res) {
    try {
        const triturations = await getTriturationsByParcelle(
            req.params.parcelleId,
        );
        res.json(triturations);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function getOne(req, res) {
    try {
        const trituration = await getTriturationById(
            req.params.id,
        );
        res.json(trituration);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function remove(req, res) {
    try {
        await deleteTrituration(req.params.id);
        res.status(200).json({
            message: "Trituration supprimée, stock restitué",
        });
    } catch (err) {
        serverErrorResponse(res, err);
    }
}