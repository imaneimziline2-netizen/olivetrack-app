import { serverErrorResponse } from "../../utils/serverErrorResponse.js";
import {
    rendementToutesParcelles,
    rendementMensuelGlobal,
    comparerRendementDashboardParcelles,
    getStatsGlobales,
} from "./statsService.js";

export async function getDashboard(req, res) {
    try {
        const annee = parseInt(req.query.annee) || new Date().getFullYear();
        const userId = req.user.userId;

        const [statsGlobales, statsParcelles] = await Promise.all([
            getStatsGlobales(userId, annee),
            rendementToutesParcelles(userId, annee),
        ]);

        res.json({
            statsGlobales,
            statsParcelles,
        });
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function getRendementDashboardParcelles(req, res) {
    try {
        const annee = parseInt(req.query.annee) || new Date().getFullYear();
        const resultat = await comparerRendementDashboardParcelles(
            req.params.id,
            annee,
        );
        res.json(resultat);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function getMonthlyYield(req, res) {
    try {
        const annee = parseInt(req.query.annee) || new Date().getFullYear();
        const resultat = await rendementMensuelGlobal(req.user.userId, annee);
        res.json(resultat);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}
