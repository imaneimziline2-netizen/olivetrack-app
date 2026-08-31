import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "../src/routes/userRoutes.js"
import parcelleRoutes from "./routes/parcelleRoutes.js";


const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/parcelles", parcelleRoutes);

export default app;