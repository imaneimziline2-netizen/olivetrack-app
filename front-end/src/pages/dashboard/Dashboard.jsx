import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchMonthlyYield,
    fetchDashboard,
} from "../../../store/slices/dashboardSlice.js";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import DonutChart from "../../components/UI/parcelle/DonutChart.jsx";

function Dashboard() {
    const dispatch = useDispatch();
    const currentYear = new Date().getFullYear();

    const { stats, statsGlobales, monthlyYield, loading, error } = useSelector(
        (state) => state.dashboard,
    );
    const user = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchMonthlyYield(currentYear));
        dispatch(fetchDashboard(currentYear));
    }, [dispatch, currentYear]);

    const alertes = (stats || []).filter((s) => s.alerte === true);

    if (loading) return <p className="p-6 text-gray-400">Chargement...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Bonjour {user?.name || "Utilisateur"}, vos oliviers vous
                    attendent
                </h1>
                <p className="text-xs text-gray-400 mt-1">
                    voici l'état de votre domaine
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Total Récolte</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {statsGlobales?.totalRecolte?.toLocaleString("fr-FR") ||
                            0}{" "}
                        kg
                    </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Production Huile</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {statsGlobales?.productionHuile?.toLocaleString(
                            "fr-FR",
                        ) || 0}{" "}
                        L
                    </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Rendement Moyen</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {statsGlobales?.rendementMoyen || 0}%
                    </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Revenu Total</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {statsGlobales?.revenuTotal?.toLocaleString("fr-FR") ||
                            0}{" "}
                        MAD
                    </p>
                </div>
            </div>

            {/* Chart + Image */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">
                        Monthly Yield Analysis
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={monthlyYield}>
                            <XAxis dataKey="mois" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="totalHuile"
                                fill="#19525A"
                                radius={[4, 4, 0, 0]}
                            >
                                {monthlyYield.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            entry.totalHuile > 0
                                                ? "#49CCC3"
                                                : "#dcfce7"
                                        }
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <DonutChart
                    title="Répartition production"
                    totalLabel="Total"
                    data={[
                        {
                            name: "Olives récoltées",
                            value: statsGlobales?.totalRecolte || 0,
                        },
                        {
                            name: "Huile produite",
                            value: statsGlobales?.productionHuile || 0,
                        },
                        {
                            name: "Revenu (MAD)",
                            value: statsGlobales?.revenuTotal || 0,
                        },
                    ]}
                />
            </div>

            {alertes.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-red-700">
                            ⚠️ Alertes actives ({alertes.length})
                        </h3>
                        <span className="text-xs text-red-500">
                            Rendement en baisse significative
                        </span>
                    </div>
                    <div className="space-y-2">
                        {alertes.map((s) => (
                            <div
                                key={s.parcelleId}
                                className="flex items-center justify-between bg-white rounded-lg p-3 border border-red-100"
                            >
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {s.nomParcelle}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {s.message}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-red-600">
                                        {s.rendement}%
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        écart {s.ecart}%
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
