import api from "./api.js";

export const registerRequest = async ({ nom, email, motDePasse }) => {
    const response = await api.post("/auth/register", { nom, email, motDePasse });
    return response.data;
};

export const loginRequest = async ({ email, motDePasse }) => {
    const response = await api.post("/auth/login", { email, motDePasse });
    return response.data;
};