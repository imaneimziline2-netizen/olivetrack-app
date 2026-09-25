import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchParcelles } from "../../../store/slices/parcelleSlice.js";
import {
    fetchTriturations,
    deleteTrituration,
} from "../../../store/slices/triturationSlice.js";

function TriturationsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { parcelles } = useSelector((state) => state.parcelles);
    const { triturations, loading, error } = useSelector(
        (state) => state.triturations,
    );

    const [selectedParcelleId, setSelectedParcelleId] = useState("");
    const activeParcelleId = selectedParcelleId || parcelles?.[0]?._id || "";

    const [deleteId, setDeleteId] = useState(null);
    const [deleteError, setDeleteError] = useState("");

    useEffect(() => {
        dispatch(fetchParcelles());
    }, [dispatch]);

    useEffect(() => {
        if (activeParcelleId) {
            dispatch(fetchTriturations(activeParcelleId));
        }
    }, [dispatch, activeParcelleId]);

    const handleDelete = async () => {
        if (!deleteId) return;
        const result = await dispatch(deleteTrituration(deleteId));
        if (deleteTrituration.fulfilled.match(result)) {
            setDeleteId(null);
            setDeleteError("");
        } else {
            setDeleteError(
                result.payload || "Impossible de supprimer cette trituration",
            );
        }
    };

    const totalOlives = triturations.reduce(
        (sum, t) => sum + (t.quantite || 0),
        0,
    );
    const totalHuile = triturations.reduce(
        (sum, t) => sum + (t.quantiteHuile || 0),
        0,
    );
    const avgRendement =
        totalOlives > 0
            ? Math.round((totalHuile / totalOlives) * 100 * 10) / 10
            : 0;

    return (
        <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
            {/* ===== Header ===== */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1B5E5A]">
                            Opérations de Trituration
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Transformation des olives en huile
                        </p>
                    </div>
                </div>

                <button
                    onClick={() =>
                        navigate(
                            activeParcelleId
                                ? `/triturations/new?parcelleId=${activeParcelleId}`
                                : "/triturations/new",
                        )
                    }
                    className="group flex items-center gap-2 bg-gradient-to-r from-[#1B5E5A] to-[#00B894] 
                               text-white px-4 py-2.5 rounded-xl text-sm font-medium 
                               shadow-md shadow-[#00B894]/20 
                               hover:shadow-lg hover:shadow-[#00B894]/30 
                               transition-all duration-200"
                >
                    <span className="text-lg leading-none group-hover:rotate-90 transition-transform duration-200">
                        +
                    </span>
                    Nouvelle Trituration
                </button>
            </div>

            {/* ===== Cards: Parcelle + Stats ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Card: Choix parcelle */}
                <div
                    className="bg-white border border-gray-100 rounded-2xl p-4 
                                shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                                Parcelle
                            </label>
                            <select
                                value={activeParcelleId}
                                onChange={(e) =>
                                    setSelectedParcelleId(e.target.value)
                                }
                                className="w-full mt-0.5 bg-transparent text-sm font-medium text-gray-800 
                                           focus:outline-none cursor-pointer"
                            >
                                {parcelles.map((p) => (
                                    <option key={p._id} value={p._id}>
                                        {p.nom}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Card: Olives */}
                <div
                    className="bg-gradient-to-br from-[#1B5E5A] to-[#00B894] rounded-2xl p-4 
                                text-white shadow-md shadow-[#00B894]/20 
                                flex items-center gap-3"
                >
                    <div>
                        <p className="text-[11px] font-semibold text-white/70 uppercase tracking-wide">
                            Olives
                        </p>
                        <p className="text-lg font-bold leading-tight">
                            {totalOlives.toLocaleString()}{" "}
                            <span className="text-xs font-normal">kg</span>
                        </p>
                    </div>
                </div>

                {/* Card: Huile */}
                <div
                    className="bg-gradient-to-br from-[#F08C5A] to-[#F5D76E] rounded-2xl p-4 
                                text-white shadow-md shadow-[#F08C5A]/20 
                                flex items-center gap-3"
                >
                    <div>
                        <p className="text-[11px] font-semibold text-white/80 uppercase tracking-wide">
                            Huile
                        </p>
                        <p className="text-lg font-bold leading-tight">
                            {totalHuile.toLocaleString()}{" "}
                            <span className="text-xs font-normal">L</span>
                        </p>
                    </div>
                </div>

                {/* Card: Rendement */}
                <div
                    className="bg-white border border-gray-100 rounded-2xl p-4 
                                shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center gap-3">
                        <div>
                            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                                Rendement
                            </p>
                            <p className="text-lg font-bold text-[#1B5E5A] leading-tight">
                                {avgRendement}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Table ===== */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                {/* Errors */}
                {error && (
                    <div className="px-4 py-3 bg-red-50 text-red-600 text-xs border-b border-red-100">
                        ⚠️ {error}
                    </div>
                )}
                {deleteError && (
                    <div className="px-4 py-3 bg-red-50 text-red-600 text-xs border-b border-red-100">
                        ⚠️ {deleteError}
                    </div>
                )}

                {loading ? (
                    <div className="py-16 text-center">
                        <div className="inline-block w-8 h-8 border-4 border-[#00B894]/30 border-t-[#1B5E5A] rounded-full animate-spin"></div>
                        <p className="text-gray-400 text-sm mt-3">
                            Chargement...
                        </p>
                    </div>
                ) : triturations.length > 0 ? (
                    <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-[#1B5E5A]/5 to-[#00B894]/5 text-[#1B5E5A] text-xs uppercase tracking-wide">
                            <tr>
                                <th className="text-left px-5 py-3 font-semibold">
                                    {" "}
                                    Date
                                </th>
                                <th className="text-left px-5 py-3 font-semibold">
                                    {" "}
                                    Olives
                                </th>
                                <th className="text-left px-5 py-3 font-semibold">
                                    {" "}
                                    Huile
                                </th>
                                <th className="text-left px-5 py-3 font-semibold">
                                    {" "}
                                    Rendement
                                </th>
                                <th className="text-right px-5 py-3 font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {triturations.map((t) => (
                                <tr
                                    key={t._id}
                                    className="hover:bg-[#00B894]/5 transition-colors group"
                                >
                                    <td className="px-5 py-3.5 text-gray-700">
                                        {new Date(t.date).toLocaleDateString(
                                            "fr-FR",
                                        )}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span
                                            className="inline-flex items-center gap-1.5 
                                                         bg-[#00B894]/10 text-[#1B5E5A] 
                                                         font-semibold text-xs px-3 py-1 rounded-full"
                                        >
                                            {t.quantite} kg
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span
                                            className="inline-flex items-center gap-1.5 
                                                         bg-[#F08C5A]/10 text-[#F08C5A] 
                                                         font-semibold text-xs px-3 py-1 rounded-full"
                                        >
                                            {t.quantiteHuile} L
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className="font-bold text-[#F08C5A]">
                                            {t.rendement}%
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-right">
                                        <button
                                            onClick={() => setDeleteId(t._id)}
                                            className="opacity-0 group-hover:opacity-100 
                                                       text-xs text-[#F08C5A] hover:text-[#1B5E5A] 
                                                       font-medium transition-all"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="py-16 text-center">
                        <p className="text-gray-500 text-sm font-medium">
                            Aucune trituration enregistrée
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                            Commencez par ajouter une nouvelle trituration
                        </p>
                    </div>
                )}
            </div>

            {/* ===== Modal Suppression ===== */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    Supprimer cette trituration ?
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Cette action est irréversible
                                </p>
                            </div>
                        </div>

                        <p
                            className="text-xs text-gray-500 mb-5 leading-relaxed bg-[#F5D76E]/10 
                                      border border-[#F5D76E]/30 rounded-xl p-3"
                        >
                            Le stock d'olives sera restitué.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setDeleteId(null);
                                    setDeleteError("");
                                }}
                                className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm 
                                           font-medium text-gray-600 hover:bg-gray-50 transition"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-gradient-to-r from-[#F08C5A] to-[#F5D76E] 
                                           text-white rounded-xl py-2.5 text-sm font-medium 
                                           shadow-md shadow-[#F08C5A]/20 
                                           hover:shadow-lg hover:shadow-[#F08C5A]/30 transition"
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

export default TriturationsList;
