import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminStats } from "../../../store/slices/adminSlice.js";

function AdminDashboard() {
    const dispatch = useDispatch();
    const { stats, loading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchAdminStats());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="fixed top-[4.5rem] bottom-0 left-0 md:left-64 right-0 bg-white flex items-center justify-center z-10">
                <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-green-600 animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed top-[4.5rem] bottom-0 left-0 md:left-64 right-0 bg-white flex items-center justify-center p-6 z-10">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                    <p className="text-red-500 font-medium">{error}</p>
                </div>
            </div>
        );
    }

    const heroStats = [
        {
            label: "Utilisateurs totaux",
            value: stats?.totalUsers || 0,
            sub: `${stats?.totalAdmins || 0} admins · ${stats?.totalAgriculteurs || 0} agriculteurs`,
            icon: (
                <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/ios-filled/50/conference-call.png"
                    alt="conference-call"
                />
            ),
        },
        {
            label: "Revenu généré",
            value: `${stats?.revenuTotal?.toLocaleString("fr-FR") || 0} MAD`,
            sub: `${stats?.nbVentes || 0} ventes enregistrées`,
            icon: (
                <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/ios-filled/50/income.png"
                    alt="income"
                />
            ),
        },
    ];

    const miniStats = [
        {
            label: "Parcelles",
            value: stats?.totalParcelles || 0,
            sub: `${stats?.superficieTotale?.toLocaleString("fr-FR") || 0} ha`,
            icon: (
                <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios-filled/50/natural-food.png"
                    alt="natural-food"
                />
            ),
        },
        {
            label: "Huile produite",
            value: `${stats?.totalHuile?.toLocaleString("fr-FR") || 0} L`,
            sub: `${stats?.nbTriturations || 0} triturations`,
            icon: (
                <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/external-smashingstocks-mixed-smashing-stocks/68/external-oil-global-warming-smashingstocks-mixed-smashing-stocks.png"
                    alt="oil"
                />
            ),
        },
        {
            label: "Récoltes",
            value: stats?.nbRecoltes || 0,
            sub: "cette saison",
            icon: (
                <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/glyph-neue/64/shopping-basket.png"
                    alt="shopping-basket"
                />
            ),
        },
    ];

    const activities = [
        {
            label: "Récoltes",
            value: stats?.nbRecoltes || 0,
            icon: (
                <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/sf-black-filled/64/shopping-basket.png"
                    alt="shopping-basket"
                />
            ),
        },
        {
            label: "Triturations",
            value: stats?.nbTriturations || 0,
            icon: (
                <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/ios-filled/50/merge-horizontal.png"
                    alt="merge-horizontal"
                />
            ),
        },
        {
            label: "Ventes",
            value: stats?.nbVentes || 0,
            icon: (
                <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/ios/50/estimate.png"
                    alt="estimate"
                />
            ),
        },
    ];

    return (
        <div className="fixed top-[4.5rem] bottom-0 left-0 md:left-64 right-0 bg-gray-50 overflow-y-auto">
            <div className="w-full px-6 lg:px-12 py-10">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                            <img
                                width="40"
                                height="40"
                                src="https://img.icons8.com/ios-filled/50/user-shield.png"
                                alt="user-shield"
                            />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-green-700 uppercase">
                                Admin Panel
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                                Tableau de bord
                            </p>
                        </div>
                    </div>

                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-teal-100">
                        <span className="text-sm font-bold text-green-700">
                            {stats?.annee || "—"}
                        </span>
                    </div>
                </div>

                <div className="mb-10">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                        Vue d'ensemble
                        <span className="block text-gray-400 text-2xl lg:text-3xl mt-2 font-light">
                            de votre plateforme agricole
                        </span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                    {heroStats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-7 border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                    {stat.icon}
                                </div>
                                <span className="text-xs font-bold text-gray-300">
                                    0{i + 1}
                                </span>
                            </div>

                            <p className="text-xs font-medium text-gray-400 uppercase mb-2">
                                {stat.label}
                            </p>
                            <p className="text-4xl lg:text-5xl font-bold text-gray-900">
                                {stat.value}
                            </p>
                            <p className="text-sm text-gray-400 mt-3">
                                {stat.sub}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                    {miniStats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-gradient-to-br from-white to-[#bcfaec] rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 p-1 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                    {stat.icon}
                                </div>
                                <p className="text-xs font-medium text-gray-400 uppercase">
                                    {stat.label}
                                </p>
                            </div>
                            <p className="text-2xl font-bold text-green-700">
                                {stat.value}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {stat.sub}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-7 py-5 flex items-center justify-between border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <h3 className="text-sm font-semibold text-gray-900">
                                Activité récente
                            </h3>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-6 h-1 rounded-full bg-green-500"></span>
                            <span className="w-6 h-1 rounded-full bg-gray-200"></span>
                            <span className="w-6 h-1 rounded-full bg-gray-200"></span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                        {activities.map((item, i) => (
                            <div
                                key={i}
                                className="p-7 flex items-center gap-4 hover:bg-green-50 transition-colors duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase">
                                        {item.label}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 mt-0.5">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
