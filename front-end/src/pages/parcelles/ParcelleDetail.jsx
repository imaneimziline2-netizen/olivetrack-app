import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchParcelleById, fetchParcelleStock, clearCurrentParcelle } from "../../../store/slices/parcelleSlice.js";
import { fetchRecoltes } from "../../../store/slices/recolteSlice.js";
import { fetchTriturations  } from "../../../store/slices/triturationSlice.js";
import { fetchVentes } from "../../../store/slices/venduSlice.js";

const TABS = ["Vue d'ensemble", "Récoltes", "Trituration", "Ventes"];

function ParcelleDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("Vue d'ensemble");

    const { currentParcelle, currentStock, loading, error } = useSelector((state) => state.parcelles);
    const { recoltes } = useSelector((state) => state.recoltes);
    const { triturations } = useSelector((state) => state.triturations);
    const { ventes } = useSelector((state) => state.ventes);

    useEffect(() => {
        dispatch(fetchParcelleById(id));
        dispatch(fetchParcelleStock(id));
        return () => dispatch(clearCurrentParcelle());
    }, [dispatch, id]);

    useEffect(() => {
        if (activeTab === "Récoltes") dispatch(fetchRecoltes(id));
        if (activeTab === "Trituration") dispatch(fetchTriturations(id));
        if (activeTab === "Ventes") {console.log("Fetching ventes for parcelle", id); dispatch(fetchVentes(id));};
    }, [dispatch, id, activeTab]);

    if (loading && !currentParcelle) {
        return <p className="p-6 text-center text-gray-400">Chargement...</p>;
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>
                <button onClick={() => navigate("/parcelles")} className="mt-4 text-sm text-green-700">
                    ← Retour
                </button>
            </div>
        );
    }

    if (!currentParcelle) return null;

    return (
        <div className="p-6 space-y-6">
            <div>
                <button onClick={() => navigate("/parcelles")} className="text-xs text-gray-400 hover:text-green-700">
                    Mes Parcelles / <span className="text-gray-700">{currentParcelle.nom}</span>
                </button>

                <div className="flex items-center justify-between mt-2">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{currentParcelle.nom}</h1>
                        <p className="text-xs text-gray-400 mt-1">
                            {currentParcelle.variete} • {currentParcelle.superficie} ha • {currentParcelle.typeIrrigation}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 border-b border-gray-200">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                            activeTab === tab
                                ? "border-green-700 text-green-700"
                                : "border-transparent text-gray-400 hover:text-gray-600"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === "Vue d'ensemble" && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <p className="text-xs text-gray-400">Total Récolté</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">
                                {recoltes.reduce((s, r) => s + (r.quantiteOlives || 0), 0)} kg
                            </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <p className="text-xs text-gray-400">Huile Produite</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">
                                {triturations.reduce((s, t) => s + (t.quantiteHuile || 0), 0)} L
                            </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <p className="text-xs text-gray-400">Rendement</p>
                            <p className="text-xl font-bold text-green-700 mt-1">
                                {triturations.length > 0
                                    ? `${triturations[triturations.length - 1].rendement}%`
                                    : "—"}
                            </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <p className="text-xs text-gray-400">Stock Actuel</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">{currentStock?.Stock ?? "—"} kg</p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h3 className="text-sm font-semibold mb-3">Détail du stock</h3>
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                                <p className="text-lg font-bold text-green-700">{currentStock?.Stock ?? 0} kg</p>
                                <p className="text-[10px] text-gray-400">Disponible</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-700">+{currentStock?.quantiteEntrant ?? 0}</p>
                                <p className="text-[10px] text-gray-400">Entrant total</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-700">-{currentStock?.quantiteSortante ?? 0}</p>
                                <p className="text-[10px] text-gray-400">Sortant total</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={() => navigate(`/recoltes/new?parcelleId=${id}`)} className="bg-green-700 text-white rounded-lg px-4 py-2 text-xs">
                            Nouvelle Récolte
                        </button>
                        <button onClick={() => navigate(`/triturations/new?parcelleId=${id}`)} className="border rounded-lg px-4 py-2 text-xs">
                            Nouvelle Trituration
                        </button>
                        <button onClick={() => navigate(`/ventes/new?parcelleId=${id}`)} className="border rounded-lg px-4 py-2 text-xs">
                            Nouvelle Vente
                        </button>
                        <button onClick={() => navigate(`/parcelles/${id}/edit`)} className="border rounded-lg px-4 py-2 text-xs ml-auto">
                            Modifier
                        </button>
                    </div>
                </div>
            )}

            {activeTab === "Récoltes" && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-sm font-semibold">Historique des récoltes</h3>
                        <button onClick={() => navigate(`/recoltes/new?parcelleId=${id}`)} className="text-xs text-green-700 font-semibold">
                            + Ajouter
                        </button>
                    </div>
                    {recoltes.length > 0 ? (
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-xs text-gray-400 uppercase">
                                <tr>
                                    <th className="text-left px-4 py-2">Date</th>
                                    <th className="text-left px-4 py-2">Quantité (kg)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {recoltes.map((r) => (
                                    <tr key={r._id}>
                                        <td className="px-4 py-2.5">{new Date(r.date).toLocaleDateString("fr-FR")}</td>
                                        <td className="px-4 py-2.5 font-semibold">{r.quantiteOlives} kg</td>
                                    
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-400 text-sm py-8">Aucune récolte enregistrée.</p>
                    )}
                </div>
            )}

            {activeTab === "Trituration" && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-sm font-semibold">Historique des triturations</h3>
                        <button onClick={() => navigate(`/triturations/new?parcelleId=${id}`)} className="text-xs text-green-700 font-semibold">
                            + Ajouter
                        </button>
                    </div>
                    {triturations.length > 0 ? (
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-xs text-gray-400 uppercase">
                                <tr>
                                    <th className="text-left px-4 py-2">Date</th>
                                    <th className="text-left px-4 py-2">Olives (kg)</th>
                                    <th className="text-left px-4 py-2">Huile (L)</th>
                                    <th className="text-left px-4 py-2">Rendement</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {triturations.map((t) => (
                                    <tr key={t._id}>
                                        <td className="px-4 py-2.5">{new Date(t.date).toLocaleDateString("fr-FR")}</td>
                                        <td className="px-4 py-2.5">{t.quantite} kg</td>
                                        <td className="px-4 py-2.5">{t.quantiteHuile} L</td>
                                        <td className="px-4 py-2.5 font-bold text-green-700">{t.rendement}%</td>
                                       
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-400 text-sm py-8">Aucune trituration enregistrée.</p>
                    )}
                </div>
            )}

            {activeTab === "Ventes" && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-sm font-semibold">Historique des ventes</h3>
                        <button onClick={() => navigate(`/ventes/new?parcelleId=${id}`)} className="text-xs text-green-700 font-semibold">
                            + Ajouter
                        </button>
                    </div>
                    {ventes.length > 0 ? (
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-xs text-gray-400 uppercase">
                                <tr>
                                    <th className="text-left px-4 py-2">Date</th>
                                    <th className="text-left px-4 py-2">Quantité (L)</th>
                                    <th className="text-left px-4 py-2">Revenu</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {ventes.map((v) => (
                                    <tr key={v._id}>
                                        <td className="px-4 py-2.5">{new Date(v.date).toLocaleDateString("fr-FR")}</td>
                                        <td className="px-4 py-2.5">{v.quantiteVendue} L</td>
                                        <td className="px-4 py-2.5 font-semibold text-green-700">{v.revenu} MAD</td>
                                       
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-400 text-sm py-8">Aucune vente enregistrée.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ParcelleDetail;