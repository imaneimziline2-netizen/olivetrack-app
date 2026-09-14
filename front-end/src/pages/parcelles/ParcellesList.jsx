import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchParcelles, deleteParcelle } from "../../../store/slices/parcelleSlice";

function ParcellesList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { parcelles, loading, error } = useSelector((state) => state.parcelles);
    const [selectedToDelete, setSelectedToDelete] = useState(null);
    const [deleteError, setDeleteError] = useState("");

    useEffect(() => {
        dispatch(fetchParcelles());
    }, [dispatch]);

    const handleDelete = async () => {
        if (!selectedToDelete) return;
        const result = await dispatch(deleteParcelle(selectedToDelete._id));
        if (deleteParcelle.fulfilled.match(result)) {
            setSelectedToDelete(null);
            setDeleteError("");
        } else {
            setDeleteError(result.payload || "Impossible de supprimer cette parcelle");
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Mes Parcelles 🌿</h1>
                <button
                    onClick={() => navigate("/parcelles/new")}
                    className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                    + Ajouter une parcelle
                </button>
            </div>

            {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                    {error}
                </div>
            )}

            {loading ? (
                <p className="text-gray-400 text-center py-12">Chargement...</p>
            ) : parcelles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {parcelles.map((p) => (
                        <div key={p._id} className="bg-white border border-gray-200 rounded-xl p-4">
                            <h3 className="font-bold text-gray-900">{p.nom}</h3>
                            <p className="text-xs text-gray-500 mt-1">{p.localisation} • {p.superficie} ha</p>
                            <p className="text-xs text-gray-500">{p.variete}</p>
                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() => navigate(`/parcelles/${p._id}`)}
                                    className="flex-1 text-xs border border-gray-200 rounded-lg py-1.5"
                                >
                                    Détails
                                </button>
                                <button
                                    onClick={() => navigate(`/parcelles/${p._id}/edit`)}
                                    className="text-xs border border-gray-200 rounded-lg py-1.5 px-3"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => setSelectedToDelete(p)}
                                    className="text-xs border border-red-200 text-red-600 rounded-lg py-1.5 px-3"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
                    <p className="text-gray-400">Aucune parcelle enregistrée.</p>
                </div>
            )}

            {selectedToDelete && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-80">
                        <h3 className="font-semibold mb-2">Supprimer "{selectedToDelete.nom}" ?</h3>
                        {deleteError && (
                            <div className="mb-3 p-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                                {deleteError}
                            </div>
                        )}
                        <div className="flex gap-3 mt-4">
                            <button onClick={() => { setSelectedToDelete(null); setDeleteError(""); }} className="flex-1 border rounded-lg py-2 text-sm">
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

export default ParcellesList;
