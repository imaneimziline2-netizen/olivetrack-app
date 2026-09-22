import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthlyYield } from "../../../store/slices/dashboardSlice.js";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import DonutChart from "../../components/UI/DonutChart.jsx";

function Dashboard() {
    const dispatch = useDispatch();
    const currentYear = new Date().getFullYear();

    const { statsGlobales, monthlyYield, loading, error } = useSelector(
        (state) => state.dashboard,
    );
    const user = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchMonthlyYield(currentYear));
    }, [dispatch, currentYear]);

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
                    <p className="text-xs text-[#19525A] mt-1">
                        ↑ +8.2% ce mois
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
                    <p className="text-xs text-[#19525A] mt-1">
                        ↑ +7.4% ce mois
                    </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Rendement Moyen</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {statsGlobales?.rendementMoyen || 0}%
                    </p>
                    <p className="text-xs text-[#19525A] mt-1">
                        ↑ +3.5% ce mois
                    </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Revenu Total</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {statsGlobales?.revenuTotal?.toLocaleString("fr-FR") ||
                            0}{" "}
                        MAD
                    </p>
                    <p className="text-xs text-[#19525A] mt-1">
                        ↑ +12.5% ce mois
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

            {/* Table Opérations */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                    Opérations récentes
                </h3>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-xs text-gray-400 border-b">
                            <th className="py-2">Opération</th>
                            <th className="py-2">Parcelle</th>
                            <th className="py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="py-2">Taille d'entretien</td>
                            <td className="py-2">Aïn Asserdoun</td>
                            <td className="py-2">08 Sep 2025</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
