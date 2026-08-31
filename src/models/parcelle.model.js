import mongoose from "mongoose";

const parcelleSchema = new mongoose.Schema(
    {
        nom: { type: String, required: true },
        superficie: { type: Number, required: true, min: 0 },
        localisation: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model("Parcelle", parcelleSchema);
