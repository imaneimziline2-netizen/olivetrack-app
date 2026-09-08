import { serverErrorResponse } from "../../utils/serverErrorResponse.js";
import {
    rendementToutesParcelles,
    comparerRendementParcelle,
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
