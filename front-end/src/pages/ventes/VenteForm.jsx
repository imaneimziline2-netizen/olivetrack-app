import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createVente } from "../../../store/slices/venduSlice";
import { fetchParcelles } from "../../../store/slices/parcelleSlice";

export default function VenteForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { parcelles } = useSelector((state) => state.parcelles);
    const { loading, error } = useSelector((state) => state.ventes);

    const [form, setForm] = useState({
        parcelleId: searchParams.get("parcelleId") || "",
        date: "",
        quantiteVendue: "",
        revenu: "",
    });

    useEffect(() => {
        dispatch(fetchParcelles());
    }, [dispatch]);

    const prixUnitaire =
        form.quantiteVendue && form.revenu
            ? (
                  parseFloat(form.revenu) / parseFloat(form.quantiteVendue)
              ).toFixed(2)
            : null;

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { parcelleId, ...data } = form;
        const result = await dispatch(
            createVente({
                parcelleId,
                data: {
                    date: data.date,
                    quantiteVendue: parseFloat(data.quantiteVendue),
                    revenu: parseFloat(data.revenu),
                },
            }),
        );
        if (createVente.fulfilled.match(result)) {
            navigate("/ventes");
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Nouvelle Vente
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
                            Date de vente
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

                    {/* Quantité */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantité vendue (L)
                        </label>
                        <input
                            type="number"
                            name="quantiteVendue"
                            value={form.quantiteVendue}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            placeholder="Ex: 50"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
                        />
                    </div>

                    {/* Revenu */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Revenu (MAD)
                        </label>
                        <input
                            type="number"
                            name="revenu"
                            value={form.revenu}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            placeholder="Ex: 1500"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
                        />
                    </div>

                    {/* Live prix unitaire */}
                    {prixUnitaire !== null && (
                        <div className="flex items-center gap-3 p-3 bg-[#edf7ee] border border-[#059669]/30 rounded-lg">
                            <span className="text-2xl">💰</span>
                            <div>
                                <p className="text-xs text-gray-500">
                                    Prix unitaire estimé
                                </p>
                                <p className="text-lg font-bold text-[#059669]">
                                    {prixUnitaire} MAD/L
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate("/ventes")}
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
