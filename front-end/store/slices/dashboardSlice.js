import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getDashboardStatsRequest,
    getParcelleRendementRequest,
    getMonthlyYieldRequest,
} from "../../src/services/dashboardService.js";

export const fetchDashboard = createAsyncThunk(
    "dashboard/fetchStats",
    async (annee, { rejectWithValue }) => {
        try {
            return await getDashboardStatsRequest(annee);
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Erreur dashboard"
            );
        }
    }
);

export const fetchParcelleRendement = createAsyncThunk(
    "dashboard/fetchParcelleRendement",
    async ({ parcelleId, annee }, { rejectWithValue }) => {
        try {
            return await getParcelleRendementRequest(parcelleId, annee);
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Erreur rendement"
            );
        }
    }
);

export const fetchMonthlyYield = createAsyncThunk(
    "dashboard/fetchMonthlyYield",
    async (annee, { rejectWithValue }) => {
        try {
            return await getMonthlyYieldRequest(annee);
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Erreur monthly"
            );
        }
    }
);


const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        stats: [],
        loading: false,

        parcelleRendement: null,
        rendementLoading: false,

        monthlyYield: [],
        monthlyLoading: false,

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
            // ===== fetchDashboard =====
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

            // ===== fetchParcelleRendement =====
            .addCase(fetchParcelleRendement.pending, (state) => {
                state.rendementLoading = true;
                state.error = null;
            })
            .addCase(fetchParcelleRendement.fulfilled, (state, action) => {
                state.rendementLoading = false;
                state.parcelleRendement = action.payload;
            })
            .addCase(fetchParcelleRendement.rejected, (state, action) => {
                state.rendementLoading = false;
                state.error = action.payload;
            })

            // ===== fetchMonthlyYield =====
            .addCase(fetchMonthlyYield.pending, (state) => {
                state.monthlyLoading = true;
                state.error = null;
            })
            .addCase(fetchMonthlyYield.fulfilled, (state, action) => {
                state.monthlyLoading = false;
                state.monthlyYield = action.payload;
            })
            .addCase(fetchMonthlyYield.rejected, (state, action) => {
                state.monthlyLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearParcelleRendement, clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;