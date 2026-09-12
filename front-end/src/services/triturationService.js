import api from "./api.js";

export const getTriturationsRequest = async (parcelleId) => {
    const response = await api.get(`/parcelles/${parcelleId}/triturations`);
    return response.data;
};

export const getTriturationByIdRequest = async (id) => {
    const response = await api.get(`/triturations/${id}`);
    return response.data;
};

export const createTriturationRequest = async (parcelleId, data) => {
    const response = await api.post(`/parcelles/${parcelleId}/triturations`, data);
    return response.data;
};

export const deleteTriturationRequest = async (id) => {
    const response = await api.delete(`/triturations/${id}`);
    return response.data;
};
