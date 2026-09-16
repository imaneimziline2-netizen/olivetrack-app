import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchParcelles } from "../../../store/slices/parcelleSlice";
import { createTrituration } from "../../../store/slices/triturationSlice";

function TriturationForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const today = new Date().toISOString().split("T")[0];

    const { parcelles } = useSelector((state) => state.parcelles);
    const { loading, error } = useSelector((state) => state.triturations);

    const [parcelleId, setParcelleId] = useState(
        searchParams.get("parcelleId") || "",
    );

    const [formData, setFormData] = useState({
        date: today,
        quantite: "",
        quantiteHuile: "",
    });

    useEffect(() => {
        dispatch(fetchParcelles());
    }, [dispatch]);

    const rendement =
        formData.quantite && formData.quantiteHuile
            ? (
                  (parseFloat(formData.quantiteHuile) /
                      parseFloat(formData.quantite)) *
                  100
              ).toFixed(1)
            : null;

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!parcelleId) return;

        const payload = {
            date: formData.date,
            quantiteHuile: formData.quantiteHuile,
            quantite: formData.quantite,
        };

        const result = await dispatch(
            createTrituration({
                parcelleId,
                data: payload,
            }),
        );

        if (createTrituration.fulfilled.match(result)) {
            navigate(`/parcelles/${parcelleId}`);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-sm text-green-700 mb-4"
            >
                ← Retour
            </button>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h1 className="text-xl font-bold mb-1">Nouvelle Trituration</h1>

                <p className="text-xs text-gray-400 mb-4">
                    La quantité d'olives sera déduite du stock, le rendement
                    calculé automatiquement
                </p>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Parcelle */}
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

                    {/* Date */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Date
                        </label>

                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            max={today}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Quantité olives */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Quantité d'olives envoyées (kg)
                        </label>

                        <input
                            type="number"
                            name="quantite"
                            value={formData.quantite}
                            onChange={handleChange}
                            min="0.01"
                            step="0.01"
                            required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Quantité huile */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Quantité d'huile obtenue (L)
                        </label>

                        <input
                            type="number"
                            name="quantiteHuile"
                            value={formData.quantiteHuile}
                            onChange={handleChange}
                            min="0.01"
                            step="0.01"
                            required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Rendement */}
                    {rendement !== null && (
                        <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                            <span className="text-xl">🫒</span>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Rendement estimé (aperçu)
                                </p>

                                <p className="text-lg font-bold text-green-700">
                                    {rendement}%
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
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
                                : "Valider la trituration"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TriturationForm;
