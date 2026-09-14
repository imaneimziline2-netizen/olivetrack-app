import { serverErrorResponse } from "../../utils/serverErrorResponse.js";
import {
    rendementToutesParcelles,
    comparerRendementParcelle,
    rendementMensuelGlobal,
} from "./statsService.js";

export async function getDashboard(req, res) {
    try {
        const annee = parseInt(req.query.annee) || new Date().getFullYear();
        const resultats = await rendementToutesParcelles(
            req.user.userId,
            annee,
        );
        res.json(resultats);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function getRendementParcelle(req, res) {
    try {
        const annee = parseInt(req.query.annee) || new Date().getFullYear();
        const resultat = await comparerRendementParcelle(req.params.id, annee);
        res.json(resultat);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

// GET /api/dashboard/monthly?annee=2026
export async function getMonthlyYield(req, res) {
    try {
        const annee = parseInt(req.query.annee) || new Date().getFullYear();
        const resultat = await rendementMensuelGlobal(req.user.userId, annee);
        res.json(resultat);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

