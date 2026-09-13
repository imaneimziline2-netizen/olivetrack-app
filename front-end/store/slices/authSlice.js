import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest, registerRequest } from "../../src/services/authService.js";
import { getProfileRequest, updateProfileRequest } from "../../src/services/userService.js";

let savedUser = null;
try {
    const raw = localStorage.getItem("user");
    if (raw) savedUser = JSON.parse(raw);
} catch {
    savedUser = null;
}

export const registerUser = createAsyncThunk(
    "auth/register",
    async (formData, { rejectWithValue }) => {
        try {
            const data = await registerRequest(formData);
            localStorage.setItem("token", data.token);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
            }
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Erreur d'inscription");
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (formData, { rejectWithValue }) => {
        try {
            const data = await loginRequest(formData);
            localStorage.setItem("token", data.token);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
            }
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Erreur de connexion");
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    "auth/fetchProfile",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getProfileRequest();
            localStorage.setItem("user", JSON.stringify(data));
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Impossible de récupérer le profil");
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "auth/updateProfile",
    async (formData, { rejectWithValue }) => {
        try {
            const data = await updateProfileRequest(formData);
            localStorage.setItem("user", JSON.stringify(data));
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Impossible de mettre à jour le profil");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: savedUser,
        token: localStorage.getItem("token") || null,
        status: "idle",
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.status = "idle";
            state.error = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        clearAuthError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Fetch profile
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            })

            // Update profile
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;