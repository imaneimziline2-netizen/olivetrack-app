import mongoose from "mongoose";

const parcelleStockSchema = new mongoose.Schema(
    {
        nom: { type: String, required: true },
        Stock: { type: Number, required: true, default: 0, min: 0 },
        quantiteEntrant: { type: Number, required: true, default: 0, min: 0 },
        quantiteSortante: { type: Number, required: true, default: 0, min: 0 },
        parcelleId: { type: mongoose.Schema.Types.ObjectId, ref: "Parcelle", required: true, unique: true },
    },
    { timestamps: true }
);

export default mongoose.model("ParcelleStock", parcelleStockSchema);