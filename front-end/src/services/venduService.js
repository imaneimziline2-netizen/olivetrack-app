import api from "./api.js";

export const getVentesRequest = async (parcelleId) => {
    const response = await api.get(`/parcelles/${parcelleId}/ventes`);
    return response.data;
};

export const getVenteByIdRequest = async (id) => {
    const response = await api.get(`/ventes/${id}`);
    return response.data;
};

export const createVenteRequest = async (parcelleId, data) => {
    const response = await api.post(`/parcelles/${parcelleId}/ventes`, data);
    return response.data;
};

export const deleteVenteRequest = async (id) => {
    const response = await api.delete(`/ventes/${id}`);
    return response.data;
};
