import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getVentesRequest,
    createVenteRequest,
    deleteVenteRequest,
} from "../../src/services/venduService.js";

export const fetchVentes = createAsyncThunk(
    "ventes/fetchByParcelle",
    async (parcelleId, { rejectWithValue }) => {
        try {
            return await getVentesRequest(parcelleId);
        } catch (err) {
            console.log(err.response);

            return rejectWithValue(
                err.response?.data?.message ||
                    "Erreur lors du chargement des ventes",
            );
        }
    },
);

export const createVente = createAsyncThunk(
    "ventes/create",
    async ({ parcelleId, data }, { rejectWithValue }) => {
        try {
            return await createVenteRequest(parcelleId, data);
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message ||
                    "Erreur lors de l'enregistrement de la vente",
            );
        }
    },
);

export const deleteVente = createAsyncThunk(
    "ventes/delete",
    async (id, { rejectWithValue }) => {
        try {
            await deleteVenteRequest(id);
            return id;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Erreur lors de la suppression",
            );
        }
    },
);

const venduSlice = createSlice({
    name: "ventes",
    initialState: {
        ventes: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearVentes: (state) => {
            state.ventes = [];
        },
        clearVenteError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVentes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVentes.fulfilled, (state, action) => {
                state.loading = false;
                state.ventes = action.payload;
            })
            .addCase(fetchVentes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createVente.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createVente.fulfilled, (state, action) => {
                state.loading = false;
                state.ventes.unshift(action.payload);
            })
            .addCase(createVente.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteVente.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteVente.fulfilled, (state, action) => {
                state.loading = false;
                state.ventes = state.ventes.filter(
                    (v) => v._id !== action.payload,
                );
            })
            .addCase(deleteVente.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearVentes, clearVenteError } = venduSlice.actions;
export default venduSlice.reducer;
