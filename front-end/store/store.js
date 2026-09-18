import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import parcelleReducer from "./slices/parcelleSlice.js";
import recolteReducer from "./slices/recolteSlice.js";
import triturationReducer from "./slices/triturationSlice.js";
import venduReducer from "./slices/venduSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        parcelles: parcelleReducer,
        recoltes: recolteReducer,
        triturations: triturationReducer,
        ventes : venduReducer,
    },
});