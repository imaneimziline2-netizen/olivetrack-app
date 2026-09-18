import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getRecoltesRequest,
    createRecolteRequest,
    updateRecolteRequest,
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

export const updateRecolte = createAsyncThunk(
    "recoltes/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            return await updateRecolteRequest(id, data);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Erreur lors de la mise à jour");
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecoltes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecoltes.fulfilled, (state, action) => {
                state.loading = false;
                state.recoltes = action.payload;
            })
            .addCase(fetchRecoltes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createRecolte.pending, (state) => {
                state.loading = true;
            })
            .addCase(createRecolte.fulfilled, (state, action) => {
                state.loading = false;
                state.recoltes.unshift(action.payload);
            })
            .addCase(createRecolte.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateRecolte.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateRecolte.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.recoltes.findIndex((r) => r._id === action.payload._id);
                if (index !== -1) state.recoltes[index] = action.payload;
            })
            .addCase(updateRecolte.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteRecolte.fulfilled, (state, action) => {
                state.recoltes = state.recoltes.filter((r) => r._id !== action.payload);
            })
            .addCase(deleteRecolte.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearRecoltes } = recolteSlice.actions;
export default recolteSlice.reducer;