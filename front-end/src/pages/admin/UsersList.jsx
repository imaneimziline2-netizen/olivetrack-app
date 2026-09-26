import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../store/slices/adminSlice.js";
import { useNavigate } from "react-router-dom";

function UsersList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, page, totalPages, total, loading, error } = useSelector(
        (state) => state.admin,
    );
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchUsers(currentPage));
    }, [dispatch, currentPage]);

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1
                        className="text-2xl font-bold"
                        style={{ color: "#134e4a" }}
                    >
                        Utilisateurs
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">
                        {total} utilisateur{total > 1 ? "s" : ""} enregistré
                        {total > 1 ? "s" : ""}
                    </p>
                </div>
               
            </div>

            {/* Erreur */}
            {error && (
                <div
                    className="p-3 border text-sm rounded-lg"
                    style={{
                        backgroundColor: "#fef2f2",
                        borderColor: "#fecaca",
                        color: "#991b1b",
                    }}
                >
                    {error}
                </div>
            )}

            {/* Tableau */}
            <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-100">
                {loading ? (
                    <p className="text-center text-gray-400 py-12">
                        Chargement...
                    </p>
                ) : users.length > 0 ? (
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ backgroundColor: "#134e4a" }}>
                                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white">
                                    Nom
                                </th>
                                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white">
                                    Email
                                </th>
                                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white">
                                    Rôle
                                </th>
                                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white">
                                    Inscrit le
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, index) => (
                                <tr
                                    key={u._id}
                                    onClick={() => navigate(`/admin/users/${u._id}`)}  
                                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                                    style={{
                                        backgroundColor:
                                            index % 2 === 0
                                                ? "white"
                                                : "#fafafa",
                                    }}
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            {/* Avatar */}
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                                style={{
                                                    backgroundColor: "#10b981",
                                                }}
                                            >
                                                {u.nom?.charAt(0).toUpperCase()}
                                            </div>
                                            <span
                                                className="font-medium"
                                                style={{ color: "#134e4a" }}
                                            >
                                                {u.nom}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-gray-500">
                                        {u.email}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className="text-[11px] font-semibold px-3 py-1 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    u.role === "admin"
                                                        ? "#fef3c7"
                                                        : "#d1fae5",
                                                color:
                                                    u.role === "admin"
                                                        ? "#92400e"
                                                        : "#065f46",
                                            }}
                                        >
                                            {u.role === "admin"
                                                ? "Administrateur"
                                                : "Exploitant agricole"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-gray-400 text-xs">
                                        {new Date(
                                            u.createdAt,
                                        ).toLocaleDateString("fr-FR", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-400 py-12 text-sm">
                        Aucun utilisateur trouvé.
                    </p>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={page <= 1}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30"
                        style={{ backgroundColor: "#134e4a", color: "white" }}
                    >
                        ← Précédent
                    </button>
                    <span className="text-xs text-gray-500 px-3">
                        Page {page} / {totalPages}
                    </span>
                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={page >= totalPages}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30"
                        style={{ backgroundColor: "#134e4a", color: "white" }}
                    >
                        Suivant →
                    </button>
                </div>
            )}
        </div>
    );
}

export default UsersList;
