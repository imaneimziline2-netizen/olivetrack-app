import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById } from "../../../store/slices/adminSlice.js";

function UserDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser, loading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        if (id) dispatch(fetchUserById(id));
    }, [dispatch, id]);

    if (loading) return <p className="p-6 text-gray-400">Chargement...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;
    if (!currentUser) return null;

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <button
                onClick={() => navigate("/admin/users")}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
                <span>←</span>
                <span>Retour à la liste</span>
            </button>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold" style={{ color: "#134e4a" }}>
                        {currentUser.nom}
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        {currentUser.email}
                    </p>
                </div>

                <span
                    className="text-xs font-semibold px-4 py-2 rounded-full"
                    style={{
                        backgroundColor:
                            currentUser.role === "admin" ? "#fef3c7" : "#d1fae5",
                        color:
                            currentUser.role === "admin" ? "#92400e" : "#065f46",
                    }}
                >
                    {currentUser.role === "admin"
                        ? "Administrateur"
                        : "Exploitant agricole"}
                </span>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md"
                        style={{ backgroundColor: "#10b981" }}
                    >
                        {currentUser.nom?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold" style={{ color: "#134e4a" }}>
                            {currentUser.nom}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {currentUser.email}
                        </p>
                        {currentUser.telephone && (
                            <p className="text-sm text-gray-500 mt-1">
                                 {currentUser.telephone}
                            </p>
                        )}
                        {currentUser.region && (
                            <p className="text-sm text-gray-500 mt-1">
                                 {currentUser.region}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div
                        className="p-5 rounded-xl border"
                        style={{
                            backgroundColor: "#f0fdf4",
                            borderColor: "#d1fae5",
                        }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                           
                            <p className="text-xs font-semibold text-gray-500 uppercase">
                                Rôle
                            </p>
                        </div>
                        <p className="text-lg font-bold" style={{ color: "#134e4a" }}>
                            {currentUser.role === "admin"
                                ? "Administrateur"
                                : "Exploitant agricole"}
                        </p>
                    </div>

                    <div
                        className="p-5 rounded-xl border"
                        style={{
                            backgroundColor: "#fefce8",
                            borderColor: "#fef3c7",
                        }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                          
                            <p className="text-xs font-semibold text-gray-500 uppercase">
                                Inscrit le
                            </p>
                        </div>
                        <p className="text-lg font-bold" style={{ color: "#134e4a" }}>
                            {new Date(currentUser.createdAt).toLocaleDateString(
                                "fr-FR",
                                {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                }
                            )}
                        </p>
                    </div>

                    <div
                        className="p-5 rounded-xl border"
                        style={{
                            backgroundColor: "#fef2f2",
                            borderColor: "#fecaca",
                        }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            
                            <p className="text-xs font-semibold text-gray-500 uppercase">
                                Téléphone
                            </p>
                        </div>
                        <p className="text-lg font-bold" style={{ color: "#134e4a" }}>
                            {currentUser.telephone || "—"}
                        </p>
                    </div>

                    <div
                        className="p-5 rounded-xl border"
                        style={{
                            backgroundColor: "#fff7ed",
                            borderColor: "#fed7aa",
                        }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            
                            <p className="text-xs font-semibold text-gray-500 uppercase">
                                Région
                            </p>
                        </div>
                        <p className="text-lg font-bold" style={{ color: "#134e4a" }}>
                            {currentUser.region || "—"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;