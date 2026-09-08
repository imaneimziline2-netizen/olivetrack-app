const SEUIL_ALERTE_PERCENT = -20;
const HISTORIQUE_MIN = 2;

export function detecterAnomalie(rendementActuel, rendementsHistoriques) {
    if (rendementActuel.length < HISTORIQUE_MIN) {
        return {
            alert: false,
            ecart: null,
            moyenneHistorique: null,
            message: null,
        };
    }

    const moyenneHistorique =
        rendementsHistoriques.reduce((sum, r) => sum + r, 0) /
        rendementsHistoriques.length;

    const ecart =
        ((rendementActuel - moyenneHistorique) / moyenneHistorique) * 100;
    const alerte = ecart <= SEUIL_ALERTE_PERCENT;

    return {
        alerte,
        ecart: Math.round(ecart * 10) / 10,
        moyenneHistorique: Math.round(moyenneHistorique * 10) / 10,
        message: alerte
            ? `Rendement inférieur de ${Math.abs(Math.round(ecart))}% à la moyenne habituelle de cette parcelle (${Math.round(moyenneHistorique)}%).`
            : null,
    };
}
