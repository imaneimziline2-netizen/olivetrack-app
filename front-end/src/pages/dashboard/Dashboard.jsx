import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDashboard } from "../../../store/slices/dashboardSlice.js";
import Card from "../../components/UI/Card.jsx";
import Button from "../../components/UI/Button.jsx";
import AlertBadge from "../../components/UI/AlertBadge.jsx";

function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const { stats, loading, error } = useSelector((state) => state.dashboard);
    const user = useSelector((state) => state.auth?.user);

    useEffect(() => {
        dispatch(fetchDashboard(selectedYear));
    }, [dispatch, selectedYear]);

    // Calculate aggregated KPIs
    const parcellesCount = stats?.length || 0;
    const totalOlives = stats?.reduce((acc, curr) => acc + (curr.totalOlives || 0), 0) || 0;
    const totalHuile = stats?.reduce((acc, curr) => acc + (curr.totalHuile || 0), 0) || 0;
    const averageRendement =
        totalOlives > 0 ? Math.round((totalHuile / totalOlives) * 100 * 10) / 10 : 0;

    const anomalies = stats?.filter((item) => item.alerte === true) || [];

    const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

    return (
        <div className="space-y-6">
            {/* Header & Year Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Bonjour, {user?.nom || "Hassan El Amrani"} 🌿
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Tableau de bord de suivi de production oléicole
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <label className="text-xs font-semibold text-gray-600 uppercase">
                        Campagne :
                    </label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="py-2 px-4 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 shadow-xs outline-none focus:border-[#059669] cursor-pointer"
                    >
                        {years.map((y) => (
                            <option key={y} value={y}>
                                Année {y}
                            </option>
                        ))}
                    </select>
                    <Button
                        variant="primary"
                        onClick={() => navigate("/parcelles/new")}
                        className="text-xs"
                    >
                        + Nouvelle Parcelle
                    </Button>
                </div>
            </div>

            {/* Anomaly banner if any parcel has an alert */}
            {anomalies.length > 0 && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">⚠️</span>
                        <div>
                            <h4 className="text-sm font-bold text-red-900">
                                Attention : {anomalies.length} anomalie(s) de rendement détectée(s) en {selectedYear} !
                            </h4>
                            <p className="text-xs text-red-700 mt-0.5">
                                Une baisse de plus de 20% par rapport à la moyenne historique a été constatée.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Parcelles
                            </p>
                            <h3 className="text-3xl font-extrabold text-gray-900 mt-1">
                                {parcellesCount}
                            </h3>
                            <p className="text-xs text-[#059669] mt-1 font-medium">Exploitations actives</p>
                        </div>
                        <span className="text-3xl p-3 bg-emerald-50 rounded-2xl">🌿</span>
                    </div>
                </Card>

                <Card className="bg-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Olives Triturées
                            </p>
                            <h3 className="text-3xl font-extrabold text-gray-900 mt-1">
                                {totalOlives.toLocaleString()} <span className="text-sm font-semibold">kg</span>
                            </h3>
                            <p className="text-xs text-[#059669] mt-1 font-medium">Campagne {selectedYear}</p>
                        </div>
                        <span className="text-3xl p-3 bg-emerald-50 rounded-2xl">🧺</span>
                    </div>
                </Card>

                <Card className="bg-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Huile Extraite
                            </p>
                            <h3 className="text-3xl font-extrabold text-gray-900 mt-1">
                                {totalHuile.toLocaleString()} <span className="text-sm font-semibold">L</span>
                            </h3>
                            <p className="text-xs text-[#059669] mt-1 font-medium">Production totale</p>
                        </div>
                        <span className="text-3xl p-3 bg-emerald-50 rounded-2xl">🫒</span>
                    </div>
                </Card>

                <Card className="bg-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Rendement Moyen
                            </p>
                            <h3 className="text-3xl font-extrabold text-gray-900 mt-1">
                                {averageRendement} <span className="text-sm font-semibold">%</span>
                            </h3>
                            <p className="text-xs text-[#059669] mt-1 font-medium">Taux d'extraction moyen</p>
                        </div>
                        <span className="text-3xl p-3 bg-emerald-50 rounded-2xl">📈</span>
                    </div>
                </Card>
            </div>

            {/* Parcelles Performance Table */}
            <Card
                title={`Performances des Parcelles (${selectedYear})`}
                subtitle="Rendement annuel et détection des baisses de performance"
                extra={
                    <Button
                        variant="secondary"
                        onClick={() => navigate("/parcelles")}
                        className="text-xs"
                    >
                        Voir toutes les parcelles →
                    </Button>
                }
            >
                {loading ? (
                    <div className="py-12 text-center text-gray-400">
                        Chargement des données...
                    </div>
                ) : error ? (
                    <div className="py-6 text-center text-red-500 text-sm">
                        {error}
                    </div>
                ) : stats && stats.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase">
                                    <th className="py-3 px-4">Parcelle</th>
                                    <th className="py-3 px-4">Olives (kg)</th>
                                    <th className="py-3 px-4">Huile (L)</th>
                                    <th className="py-3 px-4">Rendement</th>
                                    <th className="py-3 px-4">Moyenne Hist.</th>
                                    <th className="py-3 px-4">Statut</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {stats.map((row) => (
                                    <tr key={row.parcelleId} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-3.5 px-4 font-semibold text-gray-900">
                                            {row.nomParcelle}
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-700">
                                            {row.totalOlives !== undefined ? row.totalOlives.toLocaleString() : "-"}
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-700">
                                            {row.totalHuile !== undefined ? row.totalHuile.toLocaleString() : "-"}
                                        </td>
                                        <td className="py-3.5 px-4 font-bold text-[#059669]">
                                            {row.rendement !== null && row.rendement !== undefined
                                                ? `${row.rendement}%`
                                                : "Pas de données"}
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-500">
                                            {row.moyenneHistorique
                                                ? `${row.moyenneHistorique}%`
                                                : "-"}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            {row.alerte ? (
                                                <AlertBadge
                                                    type="anomaly"
                                                    message={row.message || `Baisse (${row.ecart}%)`}
                                                />
                                            ) : row.rendement ? (
                                                <AlertBadge type="success" message="Normal" />
                                            ) : (
                                                <span className="text-xs text-gray-400">En attente</span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <button
                                                onClick={() => navigate(`/parcelles/${row.parcelleId}`)}
                                                className="text-xs font-semibold text-[#059669] hover:text-[#047857] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                                            >
                                                Détails →
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-12 text-center text-gray-400">
                        <p className="text-lg">🌿 Aucune parcelle enregistrée pour le moment.</p>
                        <Button
                            variant="primary"
                            onClick={() => navigate("/parcelles/new")}
                            className="mt-4 text-xs"
                        >
                            Créer ma première parcelle
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default Dashboard;
