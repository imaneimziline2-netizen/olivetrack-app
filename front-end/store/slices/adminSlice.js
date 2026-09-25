import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAdminStatsRequest,
    getAllUsersRequest,
    getUserByIdRequest,
} from "../../src/services/adminService";

export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers",
    async (page, { rejectWithValue }) => {
        try {
            return await getAllUsersRequest(page);
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message ||
                    "Erreur lors du chargement des utilisateurs",
            );
        }
    },
);

export const fetchAdminStats = createAsyncThunk(
    "admin/fetchAdminStats",
    async (_, { rejectWithValue }) => {
        try {
            return await getAdminStatsRequest();
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Erreur stats admin",
            );
        }
    },
);

export const fetchUserById = createAsyncThunk(
    "admin/fetchUser",
    async (_id, { rejectWithValue }) => {
        try{
            return await getUserByIdRequest(_id);
        }catch(error){
                return rejectWithValue(error.response?.data?.message || "Utilisateur introuvable ")
        }
    },
);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        stats: null,
        users: [],
        currentUser:null,
        total: 0,
        page: 1,
        totalPages: 1,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAdminStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(fetchAdminStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserById.pending, (state)=>{
                state.loading = true;
                state.error = null
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default adminSlice.reducer;
