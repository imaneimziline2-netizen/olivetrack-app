import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getTriturationsRequest,
    createTriturationRequest,
    deleteTriturationRequest,
} from "../../src/services/triturationService.js";

export const fetchTriturations = createAsyncThunk(
    "triturations/fetchByParcelle",
    async (parcelleId, { rejectWithValue }) => {
        try {
            return await getTriturationsRequest(parcelleId);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Erreur lors du chargement des triturations");
        }
    }
);

export const createTrituration = createAsyncThunk(
    "triturations/create",
    async ({ parcelleId, data }, { rejectWithValue }) => {
        try {
            return await createTriturationRequest(parcelleId, data);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Erreur lors de l'enregistrement de la trituration");
        }
    }
);

export const deleteTrituration = createAsyncThunk(
    "triturations/delete",
    async (id, { rejectWithValue }) => {
        try {
            await deleteTriturationRequest(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Erreur lors de la suppression");
        }
    }
);

const triturationSlice = createSlice({
    name: "triturations",
    initialState: {
        triturations: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearTriturations: (state) => {
            state.triturations = [];
        },
        clearTriturationError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTriturations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTriturations.fulfilled, (state, action) => {
                state.loading = false;
                state.triturations = action.payload;
            })
            .addCase(fetchTriturations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createTrituration.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTrituration.fulfilled, (state, action) => {
                state.loading = false;
                state.triturations.unshift(action.payload);
            })
            .addCase(createTrituration.rejected, (state, action) => {  
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteTrituration.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTrituration.fulfilled, (state, action) => {
                state.loading = false;
                state.triturations = state.triturations.filter((t) => t._id !== action.payload);
            })
            .addCase(deleteTrituration.rejected, (state, action) => {  
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearTriturations, clearTriturationError } = triturationSlice.actions;
export default triturationSlice.reducer;