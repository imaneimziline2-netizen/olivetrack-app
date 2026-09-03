import mongoose from "mongoose";

const venduSchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        quantiteVendue: { type: Number, required: true, min: 0 }, // olives vendues
        revenu: { type: Number, required: true, min: 0 },
        parcelleStockId: { type: mongoose.Schema.Types.ObjectId, ref: "ParcelleStock", required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Vendu", venduSchema);