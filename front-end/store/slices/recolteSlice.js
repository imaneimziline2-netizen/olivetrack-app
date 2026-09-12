import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getRecoltesRequest,
    createRecolteRequest,
    deleteRecolteRequest,
} from "../../src/services/recolteService.js";

export const fetchRecoltes = createAsyncThunk(
    "recoltes/fetchByParcelle",
    async (parcelleId, { rejectWithValue }) => {
        try {
            return await getRecoltesRequest(parcelleId);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Erreur lors du chargement des récoltes");
        }
    }
);

export const createRecolte = createAsyncThunk(
    "recoltes/create",
    async ({ parcelleId, data }, { rejectWithValue }) => {
        try {
            return await createRecolteRequest(parcelleId, data);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Erreur lors de l'enregistrement de la récolte");
        }
    }
);

export const deleteRecolte = createAsyncThunk(
    "recoltes/delete",
    async (id, { rejectWithValue }) => {
        try {
            await deleteRecolteRequest(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Erreur lors de la suppression de la récolte");
        }
    }
);

const recolteSlice = createSlice({
    name: "recoltes",
    initialState: {
        recoltes: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearRecoltes: (state) => {
            state.recoltes = [];
        },
        clearRecolteError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecoltes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecoltes.fulfilled, (state, action) => {
                state.loading = false;
                state.recoltes = action.payload;
            })
            .addCase(fetchRecoltes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createRecolte.fulfilled, (state, action) => {
                state.recoltes.unshift(action.payload);
            })
            .addCase(deleteRecolte.fulfilled, (state, action) => {
                state.recoltes = state.recoltes.filter((r) => r._id !== action.payload);
            });
    },
});

export const { clearRecoltes, clearRecolteError } = recolteSlice.actions;
export default recolteSlice.reducer;
