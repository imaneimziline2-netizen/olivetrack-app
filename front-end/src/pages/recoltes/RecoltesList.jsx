import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchParcelles } from "../../../store/slices/parcelleSlice.js";
import { fetchRecoltes, deleteRecolte } from "../../../store/slices/recolteSlice.js";

function RecoltesList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { parcelles } = useSelector((state) => state.parcelles);
    const { recoltes, loading, error } = useSelector((state) => state.recoltes);

    const [selectedParcelleId, setSelectedParcelleId] = useState("");
    const activeParcelleId = selectedParcelleId || parcelles?.[0]?._id || "";

    const [deleteId, setDeleteId] = useState(null);
    const [deleteError, setDeleteError] = useState("");

    useEffect(() => {
        dispatch(fetchParcelles());
    }, [dispatch]);

    useEffect(() => {
        if (activeParcelleId) {
            dispatch(fetchRecoltes(activeParcelleId));
        }
    }, [dispatch, activeParcelleId]);

    const handleDelete = async () => {
        if (!deleteId) return;
        const result = await dispatch(deleteRecolte(deleteId));
        if (deleteRecolte.fulfilled.match(result)) {
            setDeleteId(null);
            setDeleteError("");
        } else {
            setDeleteError(result.payload || "Impossible de supprimer cette récolte");
        }
    };

    const totalRecolte = recoltes.reduce((sum, r) => sum + (r.quantiteOlives || 0), 0);

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Suivi des Récoltes </h1>
                    <p className="text-sm text-gray-500 mt-1">Historique des récoltes par parcelle</p>
                </div>
                <button
                    onClick={() => navigate(activeParcelleId ? `/recoltes/new?parcelleId=${activeParcelleId}` : "/recoltes/new")}
                    className="bg-[#19525A] text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                    + Nouvelle Récolte
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
                <div className="text-xs bg-emerald-50 text-green-700 font-semibold px-3 py-1.5 rounded-lg">
                    Total : {totalRecolte.toLocaleString()} kg
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs">{error}</div>
                )}
                {deleteError && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs">{deleteError}</div>
                )}

                {loading ? (
                    <p className="text-center text-gray-400 py-12">Chargement...</p>
                ) : recoltes.length > 0 ? (
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-xs text-gray-400 uppercase">
                            <tr>
                                <th className="text-left px-4 py-2">Date</th>
                                <th className="text-left px-4 py-2">Quantité (kg)</th>
                                <th className="text-right px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {recoltes.map((r) => (
                                <tr key={r._id}>
                                    <td className="px-4 py-2.5">{new Date(r.date).toLocaleDateString("fr-FR")}</td>
                                    <td className="px-4 py-2.5 font-semibold">{r.quantiteOlives} kg</td>
                                    <td className="px-4 py-2.5 text-right">
                                        <button
                                            onClick={() => setDeleteId(r._id)}
                                            className="text-xs text-red-600 hover:text-red-800"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-400 py-12 text-sm">Aucune récolte enregistrée.</p>
                )}
            </div>

            {deleteId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-80">
                        <h3 className="font-semibold mb-2">Supprimer cette récolte ?</h3>
                        <p className="text-xs text-gray-500 mb-4">Cette action peut être refusée si une partie de la quantité a déjà été triturée.</p>
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

export default RecoltesList;