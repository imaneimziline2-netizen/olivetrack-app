import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getParcellesRequest,
    getParcelleByIdRequest,
    getStockRequest,
    createParcelleRequest,
    updateParcelleRequest,
    deleteParcelleRequest,
} from "../../src/services/parcelleService.js";

export const fetchParcelles = createAsyncThunk(
    "parcelles/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            return await getParcellesRequest();
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Erreur lors du chargement des parcelles");
        }
    }
);

export const fetchParcelleById = createAsyncThunk(
    "parcelles/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            return await getParcelleByIdRequest(id);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Parcelle introuvable");
        }
    }
);

export const fetchParcelleStock = createAsyncThunk(
    "parcelles/fetchStock",
    async (id, { rejectWithValue }) => {
        try {
            return await getStockRequest(id);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Impossible de charger le stock");
        }
    }
);

export const createParcelle = createAsyncThunk(
    "parcelles/create",
    async (data, { rejectWithValue }) => {
        try {
            return await createParcelleRequest(data);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Erreur lors de la création de la parcelle");
        }
    }
);

export const updateParcelle = createAsyncThunk(
    "parcelles/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            return await updateParcelleRequest(id, data);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Erreur lors de la mise à jour");
        }
    }
);

export const deleteParcelle = createAsyncThunk(
    "parcelles/delete",
    async (id, { rejectWithValue }) => {
        try {
            await deleteParcelleRequest(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Erreur lors de la suppression");
        }
    }
);

const parcelleSlice = createSlice({
    name: "parcelles",
    initialState: {
        parcelles: [],
        currentParcelle: null,
        currentStock: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearCurrentParcelle: (state) => {
            state.currentParcelle = null;
            state.currentStock = null;
        },
        clearParcelleError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchParcelles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchParcelles.fulfilled, (state, action) => {
                state.loading = false;
                state.parcelles = action.payload;
            })
            .addCase(fetchParcelles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchParcelleById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchParcelleById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentParcelle = action.payload;
            })
            .addCase(fetchParcelleById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchParcelleStock.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchParcelleStock.fulfilled, (state, action) => {
                state.currentStock = action.payload;
            })
            .addCase(fetchParcelleStock.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(createParcelle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createParcelle.fulfilled, (state, action) => {
                state.loading = false;
                state.parcelles.unshift(action.payload);
            })
            .addCase(createParcelle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateParcelle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateParcelle.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.parcelles.findIndex((p) => p._id === action.payload._id);
                if (index !== -1) state.parcelles[index] = action.payload;
                state.currentParcelle = action.payload;
            })
            .addCase(updateParcelle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteParcelle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteParcelle.fulfilled, (state, action) => {
                state.loading = false;
                state.parcelles = state.parcelles.filter((p) => p._id !== action.payload);
                if (state.currentParcelle?._id === action.payload) {
                    state.currentParcelle = null;
                    state.currentStock = null;
                }
            })
            .addCase(deleteParcelle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCurrentParcelle, clearParcelleError } = parcelleSlice.actions;
export default parcelleSlice.reducer;