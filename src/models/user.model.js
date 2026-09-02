import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    // statut: { type: String, enum: ["actif", "desactive"], default: "actif" },
},
{timestamps: true});

export default mongoose.model("User", userSchema);
