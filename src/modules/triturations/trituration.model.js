import mongoose from "mongoose";

const triturationSchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        quantite: { type: Number, required: true, min: 0 },       // olives envoyées
        quantitéHuile: { type: Number, required: true, min: 0 },  // huile obtenue
        rendement: { type: Number, required: true },               // calculé serveur
        parcelleStockId: { type: mongoose.Schema.Types.ObjectId, ref: "ParcelleStock", required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Trituration", triturationSchema);