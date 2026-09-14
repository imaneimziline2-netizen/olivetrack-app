import api from "./api.js";

export const getParcellesRequest = async () => {
    const response = await api.get("/parcelles");
    return response.data;
};

export const getParcelleByIdRequest = async (id) => {
    const response = await api.get(`/parcelles/${id}`);
    return response.data;
};

export const getStockRequest = async (id) => {
    const response = await api.get(`/parcelles/${id}/stock`);
    return response.data;
};

export const createParcelleRequest = async (data) => {
    const response = await api.post("/parcelles", data);
    return response.data;
};

export const updateParcelleRequest = async (id, data) => {
    const response = await api.put(`/parcelles/${id}`, data);
    return response.data;
};

export const deleteParcelleRequest = async (id) => {
    const response = await api.delete(`/parcelles/${id}`);
    return response.data;
};