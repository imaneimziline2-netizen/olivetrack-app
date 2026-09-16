import guideAgronomiqueData from "../data/guideAgronomiqueData.js";

export const getGuideAgronomique = () => {
    return Promise.resolve(guideAgronomiqueData);
};

export const getGuideByMois = (mois) => {
    const data = guideAgronomiqueData.find((item) => item.mois === parseInt(mois));
    return Promise.resolve(data || null);
};
