import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchParcelles } from "../../../store/slices/parcelleSlice.js";
import { createVente } from "../../../store/slices/venduSlice.js";

function VenteForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { parcelles } = useSelector((state) => state.parcelles);
    const { loading, error } = useSelector((state) => state.ventes);

    const today = new Date().toISOString().split("T")[0];
    const [parcelleId, setParcelleId] = useState(searchParams.get("parcelleId") || "");
    const [formData, setFormData] = useState({
        date: today,
        quantiteVendue: "",
        revenu: "",
    });

    useEffect(() => {
        dispatch(fetchParcelles());
    }, [dispatch]);

    const prixUnitaire =
        formData.quantiteVendue && formData.revenu
            ? (parseFloat(formData.revenu) / parseFloat(formData.quantiteVendue)).toFixed(2)
            : null;

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!parcelleId) return;

        const payload = {
            date: formData.date,
            quantiteVendue: Number(formData.quantiteVendue),
            revenu: Number(formData.revenu),
        };

        const result = await dispatch(createVente({ parcelleId, data: payload }));

        if (createVente.fulfilled.match(result)) {
            navigate(`/parcelles/${parcelleId}`);
        }
        // إذا rejected، error فـstate كيتعرض تلقائيا تحت (بحال "Quantité insuffisante en stock")
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <button onClick={() => navigate(-1)} className="text-sm text-green-700 mb-4">
                ← Retour
            </button>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h1 className="text-xl font-bold mb-1">Nouvelle Vente </h1>
                <p className="text-xs text-gray-400 mb-4">
                    La quantité d'olives vendue sera déduite du stock de la parcelle
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Parcelle</label>
                        <select
                            value={parcelleId}
                            onChange={(e) => setParcelleId(e.target.value)}
                            required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="">-- Choisir une parcelle --</option>
                            {parcelles.map((p) => (
                                <option key={p._id} value={p._id}>{p.nom}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Date de vente</label>
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
                        <label className="block text-xs font-medium text-gray-600 mb-1">Quantité vendue (kg)</label>
                        <input
                            type="number"
                            name="quantiteVendue"
                            min="0.01"
                            step="0.01"
                            value={formData.quantiteVendue}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Revenu (MAD)</label>
                        <input
                            type="number"
                            name="revenu"
                            min="0.01"
                            step="0.01"
                            value={formData.revenu}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    {prixUnitaire !== null && (
                        <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                            <span className="text-xl">💰</span>
                            <div>
                                <p className="text-xs text-gray-500">Prix unitaire</p>
                                <p className="text-lg font-bold text-green-700">{prixUnitaire} MAD/kg</p>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button type="button" onClick={() => navigate(-1)} className="border rounded-lg px-4 py-2 text-sm">
                            Annuler
                        </button>
                        <button type="submit" disabled={loading} className="bg-green-700 text-white rounded-lg px-4 py-2 text-sm disabled:opacity-50">
                            {loading ? "Enregistrement..." : "Enregistrer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VenteForm;