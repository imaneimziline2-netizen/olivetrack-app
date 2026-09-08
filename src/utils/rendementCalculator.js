export const calculerRendement = (quantitéHuile, quantite) => {
    if (!quantite || quantite <= 0) {
        throw new Error("La quantité d'olives doit être positive");
    }
    return Math.round((quantitéHuile / quantite) * 100 * 10) / 10;
};