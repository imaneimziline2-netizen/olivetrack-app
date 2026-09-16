import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchParcelles } from "../../../store/slices/parcelleSlice.js";
import { createRecolte } from "../../../store/slices/recolteSlice.js";

function RecolteForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { parcelles } = useSelector((state) => state.parcelles);
    const { loading, error } = useSelector((state) => state.recoltes);

    const today = new Date().toISOString().split("T")[0];
    const [parcelleId, setParcelleId] = useState(
        searchParams.get("parcelleId") || "",
    );
    const [formData, setFormData] = useState({
        date: today,
        quantiteOlives: "",
    });

    useEffect(() => {
        dispatch(fetchParcelles());
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!parcelleId) {
            console.error("Aucune parcelle sélectionnée");
            return;
        }

        const payload = {
            date: formData.date,
            quantiteOlives: Number(formData.quantiteOlives),
        };

        const result = await dispatch(
            createRecolte({ parcelleId, data: payload }),
        );

        console.log("4. بعد dispatch, result:", result);
        if (createRecolte.fulfilled.match(result)) {
            console.log("5. نجح، navigate...");
            navigate(`/parcelles/${parcelleId}`);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="text-sm text-green-700 mb-4"
            >
                ← Retour
            </button>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h1 className="text-xl font-bold mb-1">Nouvelle Récolte </h1>
                <p className="text-xs text-gray-400 mb-4">
                    La quantité alimentera automatiquement le stock de la
                    parcelle
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Parcelle
                        </label>
                        <select
                            value={parcelleId}
                            onChange={(e) => setParcelleId(e.target.value)}
                            required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="">-- Choisir une parcelle --</option>
                            {parcelles.map((p) => (
                                <option key={p._id} value={p._id}>
                                    {p.nom}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            max={today}
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Quantité d'olives (kg)
                        </label>
                        <input
                            type="number"
                            name="quantiteOlives"
                            min="1"
                            step="1"
                            value={formData.quantiteOlives}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="border rounded-lg px-4 py-2 text-sm"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-700 text-white rounded-lg px-4 py-2 text-sm disabled:opacity-50"
                        >
                            {loading
                                ? "Enregistrement..."
                                : "Valider la récolte"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RecolteForm;
