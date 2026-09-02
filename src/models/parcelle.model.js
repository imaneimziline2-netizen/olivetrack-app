import mongoose from "mongoose";

const parcelleSchema = new mongoose.Schema(
    {
        nom: { type: String, required: true, trim: true },
        superficie: { type: Number, required: true, min: 0 }, //(Ha)
        localisation: { type: String, required: true },

        variete: {
            type: String,
            required: true,
            enum: [
                "Picholine Marocaine",
                "Haouzia",
                "Menara",
                "Arbequina",
                "Arbosana",
                "Koroneiki",
                "Picual",
                "Autre",
            ],
        },
        typeIrrigation: {
            type: String,
            required: true,
            enum: ["Goutte-à-goutte", "Gravitaire", "Bour / Pluvial"],
        },
        modeCulture: {
            type: String,
            required: true,
            enum: ["Traditionnel", "Intensif", "Super-intensif"],
        },
        nombreArbres: { type: Number, required: true, min: 1 },
        anneePlantation: { type: Number, min: 1900 },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model("Parcelle", parcelleSchema);
