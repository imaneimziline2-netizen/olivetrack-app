import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getDashboardStatsRequest,
    getMonthlyYieldRequest,
} from "../../src/services/dashboardService.js";

export const fetchDashboard = createAsyncThunk(
    "dashboard/fetchStats",
    async (annee, { rejectWithValue }) => {
        try {
            return await getDashboardStatsRequest(annee);
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message ||
                    "Erreur lors du chargement du tableau de bord",
            );
        }
    },
);

export const fetchMonthlyYield = createAsyncThunk(
    "dashboard/fetchMonthlyYield",
    async (annee, { rejectWithValue }) => {
        try {
            return await getMonthlyYieldRequest(annee);
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message ||
                    "Erreur lors du chargement du rendement mensuel",
            );
        }
    },
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        stats: [], 
        statsGlobales: null, 
        monthlyYield: [],
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
                state.statsGlobales = action.payload.statsGlobales;
                state.stats = action.payload.statsParcelles;
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMonthlyYield.fulfilled, (state, action) => {
                state.monthlyYield = action.payload;
            });
    },
});

export const { clearParcelleRendement, clearDashboardError } =
    dashboardSlice.actions;
export default dashboardSlice.reducer;
