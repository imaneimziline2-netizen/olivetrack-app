import api from "./api.js";

export const getDashboardStatsRequest = async (annee) => {
    const params = annee ? { annee } : {};
    const response = await api.get("/dashboard", { params });
    return response.data;
};

export const getParcelleRendementRequest = async (parcelleId, annee) => {
    const params = annee ? { annee } : {};
    const response = await api.get(`/parcelles/${parcelleId}/rendement`, { params });
    return response.data;
};
