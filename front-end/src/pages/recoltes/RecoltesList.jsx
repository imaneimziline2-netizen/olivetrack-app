import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchParcelles } from "../../../store/slices/parcelleSlice.js";
import { fetchRecoltes, deleteRecolte } from "../../../store/slices/recolteSlice.js";
import Card from "../../components/UI/Card.jsx";
import Button from "../../components/UI/Button.jsx";

function RecoltesList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { parcelles } = useSelector((state) => state.parcelles);
    const { recoltes, loading, error } = useSelector((state) => state.recoltes);

    const [selectedParcelleId, setSelectedParcelleId] = useState("");
    const activeParcelleId = selectedParcelleId || parcelles?.[0]?._id || "";

    useEffect(() => {
        dispatch(fetchParcelles());
    }, [dispatch]);

    useEffect(() => {
        if (activeParcelleId) {
            dispatch(fetchRecoltes(activeParcelleId));
        }
    }, [dispatch, activeParcelleId]);

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette récolte ?")) {
            await dispatch(deleteRecolte(id));
            if (activeParcelleId) {
                dispatch(fetchRecoltes(activeParcelleId));
            }
        }
    };

    const totalRecolte = recoltes?.reduce((sum, r) => sum + (r.quantiteOlives || 0), 0) || 0;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Suivi des Récoltes 🧺
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Consultez et enregistrez les récoltes d'olives qui approvisionnent vos stocks
                    </p>
                </div>

                <Button
                    variant="primary"
                    onClick={() =>
                        navigate(
                            activeParcelleId
                                ? `/recoltes/new?parcelleId=${activeParcelleId}`
                                : "/recoltes/new"
                        )
                    }
                >
                    + Nouvelle Récolte
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

                <div className="text-xs text-[#059669] font-semibold bg-emerald-50 px-3 py-1.5 rounded-xl">
                    Total récolté sur cette parcelle :{" "}
                    <span className="text-sm font-extrabold text-gray-900">
                        {totalRecolte.toLocaleString()} kg
                    </span>
                </div>
            </div>

            {/* Table */}
            <Card title="Historique des Récoltes">
                {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl mb-4">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="py-12 text-center text-gray-400">
                        Chargement des récoltes...
                    </div>
                ) : recoltes && recoltes.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase">
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">Quantité d'olives (kg)</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recoltes.map((r) => (
                                    <tr key={r._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-3.5 px-4 font-medium text-gray-800">
                                            📅 {new Date(r.date).toLocaleDateString("fr-FR")}
                                        </td>
                                        <td className="py-3.5 px-4 font-bold text-gray-900">
                                            {r.quantiteOlives?.toLocaleString()} kg
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <button
                                                onClick={() => handleDelete(r._id)}
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
                        <p>🧺 Aucune récolte enregistrée pour cette parcelle.</p>
                        <Button
                            variant="primary"
                            onClick={() =>
                                navigate(
                                    activeParcelleId
                                        ? `/recoltes/new?parcelleId=${activeParcelleId}`
                                        : "/recoltes/new"
                                )
                            }
                            className="mt-3 text-xs"
                        >
                            Enregistrer une récolte
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default RecoltesList;
