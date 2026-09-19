import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        nom: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        motDePasse: { type: String, required: true, select: false },
        role: {
            type: String,
            enum: ["agriculteur", "admin"],
            default: "agriculteur",
        },
        telephone: { type: String, required: false },
        region: { type: String, required: false },
    },
    { timestamps: true },
);

userSchema.index(
    { role: 1 },
    { unique: true, partialFilterExpression: { role: "admin" } },
);

export default mongoose.model("User", userSchema);
