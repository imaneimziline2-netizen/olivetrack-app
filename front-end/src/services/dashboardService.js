import api from "./api.js";

export const getDashboardStatsRequest = async (annee) => {
    const params = annee ? { annee } : {};
    const response = await api.get("/dashboard", { params });

    return response.data;
};



export const getMonthlyYieldRequest = async (annee) => {
    const params = annee ? { annee } : {};
    const response = await api.get("/dashboard/monthly-yield", { params });

    return response.data;
};