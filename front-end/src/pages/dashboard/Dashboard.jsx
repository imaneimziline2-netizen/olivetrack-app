import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard, fetchMonthlyYield } from "../../../store/slices/dashboardSlice.js";
import DashboardHeader from "./components/DashboardHeader.jsx";
import AnomalyBanner from "./components/AnomalyBanner.jsx";
import KpiCards from "./components/KpiCards.jsx";
import MonthlyYieldChart from "./components/MonthlyYieldChart.jsx";
import FeaturedParcelle from "./components/FeaturedParcelle.jsx";
import ParcellesTable from "./components/ParcellesTable.jsx";

function Dashboard() {
    const dispatch = useDispatch();
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const {
        stats,
        monthlyYield,
        loading,
        monthlyLoading,
        error,
    } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchDashboard(selectedYear));
        dispatch(fetchMonthlyYield(selectedYear));
    }, [dispatch, selectedYear]);

    if (loading && stats.length === 0) {
        return (
            <div className="py-20 text-center text-gray-400">
                Chargement du tableau de bord...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl">
                Erreur : {error}
            </div>
        );
    }

    const featuredParcelle = stats[0];

    return (
        <div className="space-y-6">
            <DashboardHeader
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
            />

            <AnomalyBanner stats={stats} selectedYear={selectedYear} />

            <KpiCards stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                    <MonthlyYieldChart
                        data={monthlyYield}
                        annee={selectedYear}
                        loading={monthlyLoading}
                    />
                </div>
                <FeaturedParcelle parcelle={featuredParcelle} annee={selectedYear} />
            </div>

            <ParcellesTable stats={stats} selectedYear={selectedYear} />
        </div>
    );
}

export default Dashboard;