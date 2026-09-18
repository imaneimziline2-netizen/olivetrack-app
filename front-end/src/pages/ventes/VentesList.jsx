import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchParcelles } from "../../../store/slices/parcelleSlice.js";
import { fetchVentes, deleteVente } from "../../../store/slices/venduSlice.js";

function VentesList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { parcelles } = useSelector((state) => state.parcelles);
    const { ventes, loading, error } = useSelector((state) => state.ventes);

    const [selectedParcelleId, setSelectedParcelleId] = useState("");
    const activeParcelleId = selectedParcelleId || parcelles?.[0]?._id || "";

    const [deleteId, setDeleteId] = useState(null);
    const [deleteError, setDeleteError] = useState("");

    useEffect(() => {
        dispatch(fetchParcelles());
    }, [dispatch]);

    useEffect(() => {
        if (activeParcelleId) {
            dispatch(fetchVentes(activeParcelleId));
        }
    }, [dispatch, activeParcelleId]);

    const handleDelete = async () => {
        if (!deleteId) return;
        const result = await dispatch(deleteVente(deleteId));
        if (deleteVente.fulfilled.match(result)) {
            setDeleteId(null);
            setDeleteError("");
        } else {
            setDeleteError(result.payload || "Impossible de supprimer cette vente");
        }
    };

    const totalQte = ventes.reduce((sum, v) => sum + (v.quantiteVendue || 0), 0);
    const totalRevenu = ventes.reduce((sum, v) => sum + (v.revenu || 0), 0);

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Ventes 💰</h1>
                    <p className="text-sm text-gray-500 mt-1">Suivi des ventes d'olives</p>
                </div>
                <button
                    onClick={() => navigate(activeParcelleId ? `/ventes/new?parcelleId=${activeParcelleId}` : "/ventes/new")}
                    className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                    + Nouvelle Vente
                </button>
            </div>

            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <label className="text-xs font-semibold text-gray-600">Parcelle :</label>
                    <select
                        value={activeParcelleId}
                        onChange={(e) => setSelectedParcelleId(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
                    >
                        {parcelles.map((p) => (
                            <option key={p._id} value={p._id}>{p.nom}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                    <span>Quantité : <strong>{totalQte.toLocaleString()} kg</strong></span>
                    <span className="bg-emerald-50 text-green-700 px-3 py-1 rounded-lg">Revenu total : {totalRevenu.toLocaleString()} MAD</span>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {error && <div className="p-3 bg-red-50 text-red-700 text-xs">{error}</div>}
                {deleteError && <div className="p-3 bg-red-50 text-red-700 text-xs">{deleteError}</div>}

                {loading ? (
                    <p className="text-center text-gray-400 py-12">Chargement...</p>
                ) : ventes.length > 0 ? (
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-xs text-gray-400 uppercase">
                            <tr>
                                <th className="text-left px-4 py-2">Date</th>
                                <th className="text-left px-4 py-2">Quantité (kg)</th>
                                <th className="text-left px-4 py-2">Revenu (MAD)</th>
                                <th className="text-left px-4 py-2">Prix/kg</th>
                                <th className="text-right px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {ventes.map((v) => {
                                const prixUnitaire = v.quantiteVendue && v.revenu ? (v.revenu / v.quantiteVendue).toFixed(2) : "-";
                                return (
                                    <tr key={v._id}>
                                        <td className="px-4 py-2.5">{new Date(v.date).toLocaleDateString("fr-FR")}</td>
                                        <td className="px-4 py-2.5">{v.quantiteVendue} kg</td>
                                        <td className="px-4 py-2.5 font-semibold text-green-700">{v.revenu} MAD</td>
                                        <td className="px-4 py-2.5 text-gray-500">{prixUnitaire}</td>
                                        <td className="px-4 py-2.5 text-right">
                                            <button onClick={() => setDeleteId(v._id)} className="text-xs text-red-600">
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-400 py-12 text-sm">Aucune vente enregistrée.</p>
                )}
            </div>

            {deleteId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-80">
                        <h3 className="font-semibold mb-2">Supprimer cette vente ?</h3>
                        <p className="text-xs text-gray-500 mb-4">Le stock sera restitué automatiquement.</p>
                        <div className="flex gap-3">
                            <button onClick={() => { setDeleteId(null); setDeleteError(""); }} className="flex-1 border rounded-lg py-2 text-sm">
                                Annuler
                            </button>
                            <button onClick={handleDelete} className="flex-1 bg-red-600 text-white rounded-lg py-2 text-sm">
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VentesList;