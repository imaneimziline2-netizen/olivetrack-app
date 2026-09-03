import express from "express";
import authRoutes from "../src/modules/auth/authRoutes.js";
import userRoutes from "../src/modules/users/userRoutes.js"
import parcelleRoutes from "../src/modules/parcelles/parcelleRoutes.js";
import recolteRoutes from "../src/modules/recoltes/recolteRoutes.js";
import triturationRoutes from "./modules/triturations/triturationRoutes.js";
import venduRoutes from "./modules/ventes/venduRoutes.js";


const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/parcelles", parcelleRoutes);
app.use("/api/recoltes", recolteRoutes);
app.use("/api/triturations", triturationRoutes);
app.use("/api/ventes", venduRoutes);

export default app;