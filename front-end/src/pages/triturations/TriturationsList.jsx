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
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Opérations de Trituration{" "}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Transformation des olives en huile
                    </p>
                </div>
                <button
                    onClick={() =>
                        navigate(
                            activeParcelleId
                                ? `/triturations/new?parcelleId=${activeParcelleId}`
                                : "/triturations/new",
                        )
                    }
                    className="bg-[#19525A] text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                    + Nouvelle Trituration
                </button>
            </div>

            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <label className="text-xs font-semibold text-gray-600">
                        Parcelle :
                    </label>
                    <select
                        value={activeParcelleId}
                        onChange={(e) => setSelectedParcelleId(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
                    >
                        {parcelles.map((p) => (
                            <option key={p._id} value={p._id}>
                                {p.nom}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                    <span>
                        Olives :{" "}
                        <strong>{totalOlives.toLocaleString()} kg</strong>
                    </span>
                    <span>
                        Huile : <strong>{totalHuile.toLocaleString()} L</strong>
                    </span>
                    <span className="bg-emerald-50 text-green-700 px-3 py-1 rounded-lg">
                        Rendement moyen : {avgRendement}%
                    </span>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs">
                        {error}
                    </div>
                )}
                {deleteError && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs">
                        {deleteError}
                    </div>
                )}

                {loading ? (
                    <p className="text-center text-gray-400 py-12">
                        Chargement...
                    </p>
                ) : triturations.length > 0 ? (
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-xs text-gray-400 uppercase">
                            <tr>
                                <th className="text-left px-4 py-2">Date</th>
                                <th className="text-left px-4 py-2">
                                    Olives (kg)
                                </th>
                                <th className="text-left px-4 py-2">
                                    Huile (L)
                                </th>
                                <th className="text-left px-4 py-2">
                                    Rendement
                                </th>
                                <th className="text-right px-4 py-2">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {triturations.map((t) => (
                                <tr key={t._id}>
                                    <td className="px-4 py-2.5">
                                        {new Date(t.date).toLocaleDateString(
                                            "fr-FR",
                                        )}
                                    </td>
                                    <td className="px-4 py-2.5">
                                        {t.quantite} kg
                                    </td>
                                    <td className="px-4 py-2.5">
                                        {t.quantitéHuile} L
                                    </td>
                                    <td className="px-4 py-2.5 font-bold text-green-700">
                                        {t.rendement}%
                                    </td>
                                    <td className="px-4 py-2.5 text-right">
                                        <button
                                            onClick={() => setDeleteId(t._id)}
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
                    <p className="text-center text-gray-400 py-12 text-sm">
                        Aucune trituration enregistrée.
                    </p>
                )}
            </div>

            {deleteId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-80">
                        <h3 className="font-semibold mb-2">
                            Supprimer cette trituration ?
                        </h3>
                        <p className="text-xs text-gray-500 mb-4">
                            Le stock d'olives sera restitué.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setDeleteId(null);
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

export default TriturationsList;
