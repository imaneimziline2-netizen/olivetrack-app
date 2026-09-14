import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchParcelleById,
    fetchParcelleStock,
} from "../../../store/slices/parcelleSlice.js";
import { fetchParcelleRendement } from "../../../store/slices/dashboardSlice.js";
import Card from "../../components/UI/Card.jsx";
import AlertBadge from "../../components/UI/AlertBadge.jsx";

function ParcelleDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const { currentParcelle, currentStock, loading, error } = useSelector(
        (state) => state.parcelles,
    );
    const { parcelleRendement } = useSelector((state) => state.dashboard);

    useEffect(() => {
        if (id) {
            dispatch(fetchParcelleById(id));
            dispatch(fetchParcelleStock(id));
            dispatch(
                fetchParcelleRendement({ parcelleId: id, annee: selectedYear }),
            );
        }
    }, [dispatch, id, selectedYear]);

    if (loading && !currentParcelle) {
        return (
            <div className="py-20 text-center text-gray-400">
                Chargement des détails...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl">
                <p className="font-semibold">Erreur : {error}</p>
                <button
                    className="text-xs text-green-700 mb-4"
                    variant="secondary"
                    onClick={() => navigate("/parcelles")}
                >
                    ← Retour aux parcelles
                </button>
            </div>
        );
    }

    if (!currentParcelle) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <button
                        className="text-xs font-semibold text-[#012419] hover:text-[#047857] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        onClick={() => navigate("/parcelles")}
                    >
                        ← Retour aux parcelles
                    </button>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                        {currentParcelle.nom}
                        <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-[#059669] rounded-full">
                            {currentParcelle.superficie} Ha
                        </span>
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">
                        📍 {currentParcelle.localisation} • Plantée en{" "}
                        {currentParcelle.anneePlantation || "N/A"}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className="text-xs font-semibold text-[#059669] hover:text-[#047857] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        variant="secondary"
                        onClick={() => navigate(`/parcelles/${id}/edit`)}
                    >
                        Modifier la parcelle
                    </button>
                </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider mr-2">
                    Actions rapides :
                </span>
                <button
                    className="text-xs font-semibold text-[#059669] hover:text-[#047857] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    variant="primary"
                    onClick={() => navigate(`/recoltes/new?parcelleId=${id}`)}
                >
                    Nouvelle Récolte
                </button>
                <button
                    className="text-xs font-semibold text-[#059669] hover:text-[#047857] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    variant="outline"
                    onClick={() =>
                        navigate(`/triturations/new?parcelleId=${id}`)
                    }
                >
                    Nouvelle Trituration
                </button>
                <button
                    className="text-xs font-semibold text-[#059669] hover:text-[#047857] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    variant="secondary"
                    onClick={() => navigate(`/ventes/new?parcelleId=${id}`)}
                    
                >
                    Nouvelle Vente
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card
                    title="Stock d'Olives en Temps Réel"
                    subtitle="Alimenté automatiquement par les récoltes, déduit par triturations et ventes"
                    className="md:col-span-2 bg-white"
                >
                    {currentStock ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                            <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-100">
                                <span className="text-xs font-semibold text-[#059669] uppercase block">
                                    Stock Actuel
                                </span>
                                <span className="text-3xl font-black text-gray-900 mt-1 block">
                                    {currentStock.Stock?.toLocaleString() || 0}
                                    <span className="text-sm font-bold text-[#059669] ml-1">
                                        kg
                                    </span>
                                </span>
                                <span className="text-[11px] text-gray-500 mt-1 block">
                                    Disponible pour transformation ou vente
                                </span>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-xs font-semibold text-gray-700 uppercase block">
                                    Total Entrant (Récoltes)
                                </span>
                                <span className="text-2xl font-bold text-gray-900 mt-1 block">
                                    +
                                    {currentStock.quantiteEntrant?.toLocaleString() ||
                                        0}
                                    <span className="text-xs font-bold ml-1">
                                        kg
                                    </span>
                                </span>
                                <span className="text-[11px] text-gray-500 mt-1 block">
                                    Cumul des récoltes enregistrées
                                </span>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-xs font-semibold text-gray-700 uppercase block">
                                    Total Sortant
                                </span>
                                <span className="text-2xl font-bold text-gray-900 mt-1 block">
                                    -
                                    {currentStock.quantiteSortante?.toLocaleString() ||
                                        0}
                                    <span className="text-xs font-bold ml-1">
                                        kg
                                    </span>
                                </span>
                                <span className="text-[11px] text-gray-500 mt-1 block">
                                    Trituré en huile ou vendu
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-xs text-gray-400 py-4">
                            Stock non initialisé.
                        </p>
                    )}
                </Card>

                <Card title="Caractéristiques Agrologiques">
                    <div className="space-y-3 text-xs">
                        <div className="flex justify-between pb-2 border-b border-gray-100">
                            <span className="text-gray-400">Variété</span>
                            <span className="font-semibold text-gray-800">
                                {currentParcelle.variete}
                            </span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-100">
                            <span className="text-gray-400">
                                Mode de culture
                            </span>
                            <span className="font-semibold text-gray-800">
                                {currentParcelle.modeCulture}
                            </span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-100">
                            <span className="text-gray-400">
                                Type d'irrigation
                            </span>
                            <span className="font-semibold text-gray-800">
                                {currentParcelle.typeIrrigation}
                            </span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-100">
                            <span className="text-gray-400">Densité</span>
                            <span className="font-semibold text-gray-800">
                                {currentParcelle.nombreArbres} arbres (~
                                {Math.round(
                                    currentParcelle.nombreArbres /
                                        currentParcelle.superficie,
                                )}{" "}
                                /Ha)
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            <Card
                title={`Analyse de Rendement (Campagne ${selectedYear})`}
                subtitle="Calculé automatiquement à partir des triturations et comparé aux 3 années précédentes"
                extra={
                    <select
                        value={selectedYear}
                        onChange={(e) =>
                            setSelectedYear(Number(e.target.value))
                        }
                        className="py-1 px-3 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 cursor-pointer"
                    >
                        {[
                            currentYear,
                            currentYear - 1,
                            currentYear - 2,
                            currentYear - 3,
                        ].map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                }
            >
                {parcelleRendement && parcelleRendement.rendement !== null ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                                <span className="text-xs text-[#059669] uppercase block font-semibold">
                                    Rendement {selectedYear}
                                </span>
                                <span className="text-2xl font-black text-gray-900 mt-1 block">
                                    {parcelleRendement.rendement}%
                                </span>
                            </div>
                            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-xs text-gray-500 uppercase block font-semibold">
                                    Moyenne Historique (3 ans)
                                </span>
                                <span className="text-2xl font-bold text-gray-700 mt-1 block">
                                    {parcelleRendement.moyenneHistorique
                                        ? `${parcelleRendement.moyenneHistorique}%`
                                        : "N/A"}
                                </span>
                            </div>
                            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-xs text-gray-500 uppercase block font-semibold">
                                    Écart relatif
                                </span>
                                <span
                                    className={`text-2xl font-bold mt-1 block ${
                                        (parcelleRendement.ecart || 0) < -20
                                            ? "text-red-600"
                                            : "text-[#059669]"
                                    }`}
                                >
                                    {parcelleRendement.ecart !== undefined
                                        ? `${parcelleRendement.ecart}%`
                                        : "0%"}
                                </span>
                            </div>
                            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-center">
                                <span className="text-xs text-gray-500 uppercase block font-semibold mb-1">
                                    Détection Anomalie
                                </span>
                                <div>
                                    {parcelleRendement.alerte ? (
                                        <AlertBadge
                                            type="anomaly"
                                            message={
                                                parcelleRendement.message ||
                                                "Alerte baisse"
                                            }
                                        />
                                    ) : (
                                        <AlertBadge
                                            type="success"
                                            message="Rendement satisfaisant"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {parcelleRendement.alerte && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 leading-relaxed">
                                <strong>⚠️ Diagnostic :</strong>{" "}
                                {parcelleRendement.message}. Il est conseillé de
                                vérifier les pratiques d'irrigation, de taille
                                ou de consulter le{" "}
                                <button
                                    onClick={() => navigate("/guide")}
                                    className="underline font-bold text-red-900 cursor-pointer"
                                >
                                    Guide Agronomique
                                </button>
                                .
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="py-8 text-center text-gray-400 text-xs">
                        Aucune trituration enregistrée pour l'année{" "}
                        {selectedYear} sur cette parcelle.
                    </div>
                )}
            </Card>
        </div>
    );
}

export default ParcelleDetail;
