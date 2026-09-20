import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminStats } from "../../../store/slices/adminSlice.js";

function AdminDashboard() {
    const dispatch = useDispatch();
    const { stats, loading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchAdminStats());
        console.log("Admin stats fetched:", stats);
    }, [dispatch]);

    if (loading) return <p className="p-6 text-gray-400">Chargement...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: "#134e4a" }}>
                        Tableau de bord Admin
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">
                        Vue globale de la plateforme • {stats?.annee}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#10b981" }} />
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#fcd34d" }} />
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#fecaca" }} />
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f97316" }} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400">Utilisateurs</p>
                            <p className="text-2xl font-bold mt-1" style={{ color: "#134e4a" }}>
                                {stats?.totalUsers || 0}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {stats?.totalAdmins || 0} admin • {stats?.totalAgriculteurs || 0} agriculteurs
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#d1fae5" }}>
                            <span className="text-xl">👥</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400">Parcelles</p>
                            <p className="text-2xl font-bold mt-1" style={{ color: "#134e4a" }}>
                                {stats?.totalParcelles || 0}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {stats?.superficieTotale?.toLocaleString("fr-FR") || 0} ha au total
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#fef3c7" }}>
                            <span className="text-xl">🌿</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400">Production Huile</p>
                            <p className="text-2xl font-bold mt-1" style={{ color: "#134e4a" }}>
                                {stats?.totalHuile?.toLocaleString("fr-FR") || 0} L
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {stats?.nbTriturations || 0} triturations
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#fecaca" }}>
                            <span className="text-xl">🫒</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400">Revenu Total</p>
                            <p className="text-2xl font-bold mt-1" style={{ color: "#134e4a" }}>
                                {stats?.revenuTotal?.toLocaleString("fr-FR") || 0} MAD
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {stats?.nbVentes || 0} ventes
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#fed7aa" }}>
                            <span className="text-xl">💰</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                <h3 className="font-semibold mb-4" style={{ color: "#134e4a" }}>
                    Activité de la plateforme • {stats?.annee}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: "#f0fdf4" }}>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#10b981" }}>
                            <span className="text-lg text-white">🌾</span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Récoltes</p>
                            <p className="text-xl font-bold" style={{ color: "#134e4a" }}>
                                {stats?.nbRecoltes || 0}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: "#fefce8" }}>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#fcd34d" }}>
                            <span className="text-lg">🫒</span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Triturations</p>
                            <p className="text-xl font-bold" style={{ color: "#134e4a" }}>
                                {stats?.nbTriturations || 0}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: "#fff7ed" }}>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#f97316" }}>
                            <span className="text-lg text-white">💵</span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Ventes</p>
                            <p className="text-xl font-bold" style={{ color: "#134e4a" }}>
                                {stats?.nbVentes || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;