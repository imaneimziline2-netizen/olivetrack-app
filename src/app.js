import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "../src/routes/userRoutes.js"
import parcelleRoutes from "./routes/parcelleRoutes.js";
import recolteRoutes from "./routes/recolteRoutes.js";


const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/parcelles", parcelleRoutes);
app.use("/api/recoltes", recolteRoutes);

export default app;