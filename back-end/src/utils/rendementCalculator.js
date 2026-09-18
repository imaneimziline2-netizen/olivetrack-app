export const calculerRendement = (quantiteHuile, quantite) => {
    if (!quantite || quantite <= 0) {
        throw new Error("La quantité d'olives doit être positive");
    }
    return Math.round((quantiteHuile / quantite) * 100 * 10) / 10;
};