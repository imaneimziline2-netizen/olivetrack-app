import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchParcelles,
    deleteParcelle,
} from "../../../store/slices/parcelleSlice.js";
import { fetchDashboard } from "../../../store/slices/dashboardSlice.js";

function ParcellesList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const { parcelles, loading, error } = useSelector(
        (state) => state.parcelles,
    );
    const { stats } = useSelector((state) => state.dashboard);

    const [selectedToDelete, setSelectedToDelete] = useState(null);
    const [deleteError, setDeleteError] = useState("");

    useEffect(() => {
        dispatch(fetchParcelles());
        dispatch(fetchDashboard(currentYear));
    }, [dispatch, currentYear]);

    const handleDelete = async () => {
        if (!selectedToDelete) return;
        const result = await dispatch(deleteParcelle(selectedToDelete._id));
        if (deleteParcelle.fulfilled.match(result)) {
            setSelectedToDelete(null);
            setDeleteError("");
        } else {
            setDeleteError(
                result.payload || "Impossible de supprimer cette parcelle",
            );
        }
    };

    const totalHectares = parcelles.reduce(
        (sum, p) => sum + (p.superficie || 0),
        0,
    );

    const getStatsForParcelle = (parcelleId) => {
        return stats?.find((s) => s.parcelleId === parcelleId) || null;
    };

    const formatDate = (date) => {
        if (!date) return "—";
        return new Date(date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Mes Parcelles
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">
                        {parcelles.length} parcelle
                        {parcelles.length > 1 ? "s" : ""} •{" "}
                        {totalHectares.toFixed(1)} hectares au total
                    </p>
                </div>
                <button
                    onClick={() => navigate("/parcelles/new")}
                    className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800"
                >
                    + Nouvelle Parcelle
                </button>
            </div>

            {/* Erreur */}
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                    {error}
                </div>
            )}

            {/* Liste */}
            {loading ? (
                <p className="text-gray-400 text-center py-12">Chargement...</p>
            ) : parcelles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {parcelles.map((p) => {
                        const parcelleStats = getStatsForParcelle(p._id);
                        const isAlerte = parcelleStats?.alerte === true;

                        return (
                            <div
                                key={p._id}
                                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                            >
                                {/* Photo placeholder */}
                                <div className="h-32 bg-gradient-to-br from-green-700 via-green-600 to-amber-700 flex items-center justify-center">
                                    <span className="text-4xl opacity-80">
                                        🫒
                                    </span>
                                </div>

                                <div className="p-4">
                                    {/* Nom + badge */}
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-bold text-gray-900 truncate">
                                            {p.nom}
                                        </h3>
                                        {parcelleStats && (
                                            <span
                                                className={`text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
                                                    isAlerte
                                                        ? "bg-red-50 text-red-600"
                                                        : "bg-emerald-50 text-green-700"
                                                }`}
                                            >
                                                {isAlerte
                                                    ? "À surveiller"
                                                    : "Bonne santé"}
                                            </span>
                                        )}
                                    </div>

                                    {/* Superficie + variété */}
                                    <p className="text-xs text-gray-400 mt-1">
                                        {p.superficie} ha • {p.variete}
                                    </p>

                                    {/* Localisation + irrigation */}
                                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                        📍 {p.localisation} • 💧{" "}
                                        {p.typeIrrigation}
                                    </p>

                                    {/* Dernière récolte + Rendement total */}
                                    <div className="grid grid-cols-2 gap-2 mt-3">
                                        <div className="bg-gray-50 rounded-lg p-2">
                                            <p className="text-[10px] text-gray-400">
                                                Dernière récolte
                                            </p>
                                            <p className="text-sm font-bold text-gray-900">
                                                {parcelleStats?.derniereRecolte
                                                    ?.date
                                                    ? formatDate(
                                                          parcelleStats
                                                              .derniereRecolte
                                                              .date,
                                                      )
                                                    : "—"}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-2">
                                            <p className="text-[10px] text-gray-400">
                                                Rendement total
                                            </p>
                                            <p className="text-sm font-bold text-gray-900">
                                                {parcelleStats?.derniereRecolte
                                                    ?.quantite_kg !== undefined
                                                    ? `${parcelleStats.derniereRecolte.quantite_kg.toLocaleString("fr-FR")} kg`
                                                    : "—"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/parcelles/${p._id}/edit`,
                                                    )
                                                }
                                                className="text-xs text-gray-500 hover:text-gray-700"
                                            >
                                                ✏️ Modifier
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setSelectedToDelete(p)
                                                }
                                                className="text-xs text-red-500 hover:text-red-700"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <button
                                            onClick={() =>
                                                navigate(`/parcelles/${p._id}`)
                                            }
                                            className="text-xs text-green-700 font-semibold hover:text-green-800"
                                        >
                                            Ouvrir la parcelle →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
                    <p className="text-4xl mb-3">🌱</p>
                    <p className="text-gray-400">
                        Aucune parcelle enregistrée.
                    </p>
                    <button
                        onClick={() => navigate("/parcelles/new")}
                        className="mt-4 text-sm text-green-700 font-semibold"
                    >
                        + Créer ma première parcelle
                    </button>
                </div>
            )}

            {/* Modal suppression */}
            {selectedToDelete && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-80">
                        <h3 className="font-semibold mb-2">
                            Supprimer "{selectedToDelete.nom}" ?
                        </h3>
                        {deleteError && (
                            <div className="mb-3 p-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                                {deleteError}
                            </div>
                        )}
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => {
                                    setSelectedToDelete(null);
                                    setDeleteError("");
                                }}
                                className="flex-1 border rounded-lg py-2 text-sm"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-red-600 text-white rounded-lg py-2 text-sm"
                            >
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
