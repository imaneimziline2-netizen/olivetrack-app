import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersRequest } from "../../src/services/adminService";

export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers",
    async (page, { rejectWithValue }) => {
        try {
            return await getAllUsersRequest(page);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Une erreur s'est produite lors de la récupération des utilisateurs.",
            );
        }
    },
);
