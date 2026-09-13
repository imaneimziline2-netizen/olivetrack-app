import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getDashboardStatsRequest,
    getParcelleRendementRequest,
} from "../../src/services/dashboardService.js";

export const fetchDashboard = createAsyncThunk(
    "dashboard/fetchStats",
    async (annee, { rejectWithValue }) => {
        try {
            return await getDashboardStatsRequest(annee);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Erreur lors du chargement du tableau de bord");
        }
    }
);

export const fetchParcelleRendement = createAsyncThunk(
    "dashboard/fetchParcelleRendement",
    async ({ parcelleId, annee }, { rejectWithValue }) => {
        try {
            return await getParcelleRendementRequest(parcelleId, annee);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Erreur lors du calcul du rendement");
        }
    }
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        stats: [],
        parcelleRendement: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearParcelleRendement: (state) => {
            state.parcelleRendement = null;
        },
        clearDashboardError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchParcelleRendement.fulfilled, (state, action) => {
                state.parcelleRendement = action.payload;
            });
    },
});

export const { clearParcelleRendement, clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
