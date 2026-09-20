import api from "./api.js";

export const getAllUsersRequest = async (page = 1, limit = 20) => {
    const response = await api.get("/admin/users", {
        params: { page, limit },
    });
    return response.data;
};

export const getUserByIdRequest = async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
};

export const getAdminStatsRequest = async () => {
    const response = await api.get("/admin/stats");
    return response.data;
};
