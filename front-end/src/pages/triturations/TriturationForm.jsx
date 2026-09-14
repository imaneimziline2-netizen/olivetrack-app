import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createTrituration } from "../../../store/slices/triturationSlice";
import { fetchParcelles } from "../../../store/slices/parcelleSlice";

export default function TriturationForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { parcelles } = useSelector((state) => state.parcelles);
    const { loading, error } = useSelector((state) => state.triturations);

    const [form, setForm] = useState({
        parcelleId: searchParams.get("parcelleId") || "",
        date: "",
        quantite: "",
        quantitéHuile: "",
    });

    useEffect(() => {
        dispatch(fetchParcelles());
    }, [dispatch]);

    const rendement =
        form.quantite && form.quantitéHuile
            ? (
                  (parseFloat(form.quantitéHuile) / parseFloat(form.quantite)) *
                  100
              ).toFixed(1)
            : null;

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { parcelleId, ...data } = form;
        const result = await dispatch(
            createTrituration({
                parcelleId,
                data: {
                    date: data.date,
                    quantite: parseFloat(data.quantite),
                    quantitéHuile: parseFloat(data.quantitéHuile),
                },
            }),
        );

        if (createTrituration.fulfilled.match(result)) {
            navigate("/triturations");
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Nouvelle Trituration
            </h1>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-xs p-6">
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Parcelle */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Parcelle
                        </label>
                        <select
                            name="parcelleId"
                            value={form.parcelleId}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
                        >
                            <option value="">Sélectionner une parcelle</option>
                            {parcelles.map((p) => (
                                <option key={p._id} value={p._id}>
                                    {p.nom}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
                        />
                    </div>

                    {/* Quantité olives */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantité d'olives (kg)
                        </label>
                        <input
                            type="number"
                            name="quantite"
                            value={form.quantite}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            placeholder="Ex: 500"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
                        />
                    </div>

                    {/* Quantité huile */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantité d'huile (L)
                        </label>
                        <input
                            type="number"
                            name="quantitéHuile"
                            value={form.quantitéHuile}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            placeholder="Ex: 100"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
                        />
                    </div>

                    {/* Live rendement preview */}
                    {rendement !== null && (
                        <div className="flex items-center gap-3 p-3 bg-[#edf7ee] border border-[#059669]/30 rounded-lg">
                            <span className="text-2xl">🫒</span>
                            <div>
                                <p className="text-xs text-gray-500">
                                    Rendement estimé
                                </p>
                                <p className="text-lg font-bold text-[#059669]">
                                    {rendement}%
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate("/triturations")}
                            className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-[#059669] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#047857] transition-colors disabled:opacity-50"
                        >
                            {loading ? "Enregistrement..." : "Enregistrer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}