import api from "./api.js";

export const getProfileRequest = async () => {
    const response = await api.get("/users/me");
    return response.data;
};

export const updateProfileRequest = async (data) => {
    const response = await api.put("/users/me", data);
    return response.data;
};
