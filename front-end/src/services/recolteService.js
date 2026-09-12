import api from "./api.js";

export const getRecoltesRequest = async (parcelleId) => {
    const response = await api.get(`/parcelles/${parcelleId}/recoltes`);
    return response.data;
};

export const getRecolteByIdRequest = async (id) => {
    const response = await api.get(`/recoltes/${id}`);
    return response.data;
};

export const createRecolteRequest = async (parcelleId, data) => {
    const response = await api.post(`/parcelles/${parcelleId}/recoltes`, data);
    return response.data;
};

export const updateRecolteRequest = async (id, data) => {
    const response = await api.put(`/recoltes/${id}`, data);
    return response.data;
};

export const deleteRecolteRequest = async (id) => {
    const response = await api.delete(`/recoltes/${id}`);
    return response.data;
};
