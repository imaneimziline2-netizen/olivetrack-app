import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchVentes, deleteVente } from "../../../store/slices/venduSlice";
import { fetchParcelles } from "../../../store/slices/parcelleSlice";

export default function VentesList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { parcelles } = useSelector((state) => state.parcelles);
    const { ventes, loading, error } = useSelector((state) => state.ventes);

    const [selectedParcelleId, setSelectedParcelleId] = useState("");
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        dispatch(fetchParcelles());
    }, [dispatch]);

    useEffect(() => {
        if (selectedParcelleId) {
            dispatch(fetchVentes(selectedParcelleId));
        }
    }, [dispatch, selectedParcelleId]);

    const [deleteError, setDeleteError] = useState("");

    const handleDelete = async () => {
        if (!deleteId) return;
        const result = await dispatch(deleteVente(deleteId));
        if (deleteVente.fulfilled.match(result)) {
            setDeleteId(null);
            setDeleteError("");
        } else {
            setDeleteError(
                result.payload || "Impossible de supprimer cette vente",
            );
        }
    };

    const totalRevenu = ventes.reduce((sum, v) => sum + (v.revenu || 0), 0);
    const totalQte = ventes.reduce(
        (sum, v) => sum + (v.quantiteVendue || 0),
        0,
    );

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Ventes</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Suivi des ventes d'huile d'olive
                    </p>
                </div>
                <button
                    onClick={() =>
                        navigate(
                            `/ventes/new${selectedParcelleId ? `?parcelleId=${selectedParcelleId}` : ""}`,
                        )
                    }
                    className="flex items-center gap-2 bg-[#059669] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#047857] transition-colors"
                >
                    <span className="text-lg">+</span> Nouvelle vente
                </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-xs p-4 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parcelle
                </label>
                <select
                    value={selectedParcelleId}
                    onChange={(e) => setSelectedParcelleId(e.target.value)}
                    className="w-full max-w-sm border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
                >
                    <option value="">Sélectionner une parcelle</option>
                    {parcelles.map((p) => (
                        <option key={p._id} value={p._id}>
                            {p.nom}
                        </option>
                    ))}
                </select>
            </div>

            {!selectedParcelleId ? (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-xs p-12 text-center">
                    <p className="text-4xl mb-3">🛒</p>
                    <p className="text-gray-500 text-sm">
                        Sélectionnez une parcelle pour voir ses ventes
                    </p>
                </div>
            ) : loading ? (
                <div className="text-center py-12 text-gray-400">
                    Chargement...
                </div>
            ) : error ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    {error}
                </div>
            ) : (
                <>
                    {ventes.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white border border-gray-100 rounded-2xl shadow-xs p-4">
                                <p className="text-xs text-gray-500 mb-1">
                                    Total ventes
                                </p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {ventes.length}
                                </p>
                            </div>
                            <div className="bg-white border border-gray-100 rounded-2xl shadow-xs p-4">
                                <p className="text-xs text-gray-500 mb-1">
                                    Quantité vendue
                                </p>
                                <p className="text-2xl font-bold text-[#059669]">
                                    {totalQte.toFixed(1)} L
                                </p>
                            </div>
                            <div className="bg-white border border-gray-100 rounded-2xl shadow-xs p-4">
                                <p className="text-xs text-gray-500 mb-1">
                                    Revenu total
                                </p>
                                <p className="text-2xl font-bold text-[#059669]">
                                    {totalRevenu.toFixed(2)} MAD
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
                        {ventes.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-3xl mb-3">📦</p>
                                <p className="text-gray-500 text-sm mb-4">
                                    Aucune vente enregistrée
                                </p>
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/ventes/new?parcelleId=${selectedParcelleId}`,
                                        )
                                    }
                                    className="bg-[#059669] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#047857] transition-colors"
                                >
                                    Ajouter une vente
                                </button>
                            </div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="text-left px-5 py-3 font-medium text-gray-600">
                                            Date
                                        </th>
                                        <th className="text-right px-5 py-3 font-medium text-gray-600">
                                            Quantité (L)
                                        </th>
                                        <th className="text-right px-5 py-3 font-medium text-gray-600">
                                            Revenu (MAD)
                                        </th>
                                        <th className="text-right px-5 py-3 font-medium text-gray-600">
                                            Prix/L
                                        </th>
                                        <th className="px-5 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {ventes.map((v) => {
                                        const prixUnitaire =
                                            v.quantiteVendue && v.revenu
                                                ? (
                                                      v.revenu /
                                                      v.quantiteVendue
                                                  ).toFixed(2)
                                                : "-";
                                        return (
                                            <tr
                                                key={v._id}
                                                className="hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="px-5 py-3 text-gray-700">
                                                    {v.date
                                                        ? new Date(
                                                              v.date,
                                                          ).toLocaleDateString(
                                                              "fr-FR",
                                                          )
                                                        : "-"}
                                                </td>
                                                <td className="px-5 py-3 text-right font-medium text-gray-800">
                                                    {v.quantiteVendue?.toFixed(
                                                        1,
                                                    ) || "-"}
                                                </td>
                                                <td className="px-5 py-3 text-right font-medium text-[#059669]">
                                                    {v.revenu?.toFixed(2) ||
                                                        "-"}
                                                </td>
                                                <td className="px-5 py-3 text-right text-gray-500">
                                                    {prixUnitaire}
                                                </td>
                                                <td className="px-5 py-3 text-right">
                                                    <button
                                                        onClick={() =>
                                                            setDeleteId(v._id)
                                                        }
                                                        className="text-red-400 hover:text-red-600 transition-colors text-xs"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}

            {deleteId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-80">
                        <h3 className="font-semibold text-gray-800 mb-2">
                            Supprimer cette vente ?
                        </h3>
                        <p className="text-sm text-gray-500 mb-5">
                            Cette action est irréversible.
                        </p>
                        {deleteError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                                {deleteError}
                            </div>
                        )}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600"
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
