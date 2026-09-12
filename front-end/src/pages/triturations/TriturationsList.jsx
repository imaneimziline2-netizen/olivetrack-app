import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchParcelles } from "../../../store/slices/parcelleSlice.js";
import { fetchTriturations, deleteTrituration } from "../../../store/slices/triturationSlice.js";
import Card from "../../components/UI/Card.jsx";
import Button from "../../components/UI/Button.jsx";

function TriturationsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { parcelles } = useSelector((state) => state.parcelles);
    const { triturations, loading, error } = useSelector((state) => state.triturations);

    const [selectedParcelleId, setSelectedParcelleId] = useState("");
    const activeParcelleId = selectedParcelleId || parcelles?.[0]?._id || "";

    useEffect(() => {
        dispatch(fetchParcelles());
    }, [dispatch]);

    useEffect(() => {
        if (activeParcelleId) {
            dispatch(fetchTriturations(activeParcelleId));
        }
    }, [dispatch, activeParcelleId]);

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous supprimer cette opération de trituration ? Le stock d'olives sera restitué.")) {
            await dispatch(deleteTrituration(id));
            if (activeParcelleId) {
                dispatch(fetchTriturations(activeParcelleId));
            }
        }
    };

    const totalOlives = triturations?.reduce((sum, t) => sum + (t.quantite || 0), 0) || 0;
    const totalHuile = triturations?.reduce((sum, t) => sum + (t.quantitéHuile || 0), 0) || 0;
    const avgRendement = totalOlives > 0 ? Math.round((totalHuile / totalOlives) * 100 * 10) / 10 : 0;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Opérations de Trituration 🫒
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Transformation des olives en huile et calcul du rendement d'extraction
                    </p>
                </div>

                <Button
                    variant="primary"
                    onClick={() =>
                        navigate(
                            activeParcelleId
                                ? `/triturations/new?parcelleId=${activeParcelleId}`
                                : "/triturations/new"
                        )
                    }
                >
                    + Nouvelle Trituration
                </Button>
            </div>

            {/* Parcelle Filter & Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                <div className="flex items-center gap-3">
                    <label className="text-xs font-bold text-gray-700 uppercase">
                        Sélectionner la parcelle :
                    </label>
                    <select
                        value={activeParcelleId}
                        onChange={(e) => setSelectedParcelleId(e.target.value)}
                        className="py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 outline-none focus:border-[#059669] cursor-pointer"
                    >
                        {parcelles.map((p) => (
                            <option key={p._id} value={p._id}>
                                {p.nom} ({p.variete})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="text-gray-600">
                        Olives : <strong className="text-gray-900">{totalOlives.toLocaleString()} kg</strong>
                    </span>
                    <span className="text-gray-600">
                        Huile : <strong className="text-gray-900">{totalHuile.toLocaleString()} L</strong>
                    </span>
                    <span className="bg-emerald-50 text-[#059669] px-3 py-1 rounded-xl">
                        Rendement moyen : <strong>{avgRendement}%</strong>
                    </span>
                </div>
            </div>

            {/* Table */}
            <Card title="Historique des Triturations">
                {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl mb-4">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="py-12 text-center text-gray-400">
                        Chargement des triturations...
                    </div>
                ) : triturations && triturations.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase">
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">Olives envoyées (kg)</th>
                                    <th className="py-3 px-4">Huile obtenue (L)</th>
                                    <th className="py-3 px-4">Rendement</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {triturations.map((t) => (
                                    <tr key={t._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-3.5 px-4 font-medium text-gray-800">
                                            📅 {new Date(t.date).toLocaleDateString("fr-FR")}
                                        </td>
                                        <td className="py-3.5 px-4 font-semibold text-gray-700">
                                            {t.quantite?.toLocaleString()} kg
                                        </td>
                                        <td className="py-3.5 px-4 font-semibold text-gray-700">
                                            {t.quantitéHuile?.toLocaleString()} L
                                        </td>
                                        <td className="py-3.5 px-4 font-bold text-[#059669]">
                                            {t.rendement}%
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <button
                                                onClick={() => handleDelete(t._id)}
                                                className="text-xs text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-12 text-center text-gray-400 text-xs">
                        <p>🫒 Aucune opération de trituration enregistrée pour cette parcelle.</p>
                        <Button
                            variant="primary"
                            onClick={() =>
                                navigate(
                                    activeParcelleId
                                        ? `/triturations/new?parcelleId=${activeParcelleId}`
                                        : "/triturations/new"
                                )
                            }
                            className="mt-3 text-xs"
                        >
                            Enregistrer une trituration
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default TriturationsList;
