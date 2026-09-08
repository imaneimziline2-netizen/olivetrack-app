import mongoose from "mongoose";

const recolteSchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        quantiteOlives: { type: Number, required: true, min: 0 },
        parcelleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Parcelle",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Recolte", recolteSchema);