import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsersRequest } from "../../services/adminService.js";
import Card from "../../components/UI/Card.jsx";
import Button from "../../components/UI/Button.jsx";

function UsersList() {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.user);

    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentUser && currentUser.role !== "admin") {
            navigate("/");
            return;
        }

        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getAllUsersRequest(page, 10);
                setUsers(data.users || []);
                setTotal(data.total || 0);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                setError(err.response?.data?.message || "Erreur lors du chargement des utilisateurs");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [currentUser, navigate, page]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-lime-950">
                        Supervision des Utilisateurs 🛡️
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Espace réservé à l'administrateur de la plateforme OliveTrack
                    </p>
                </div>
                <div className="text-xs font-semibold bg-lime-100 text-lime-900 px-3 py-1.5 rounded-xl">
                    Total inscrits : <strong>{total} utilisateur(s)</strong>
                </div>
            </div>

            <Card title="Liste des Utilisateurs Inscrits">
                {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl mb-4">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="py-12 text-center text-gray-400">
                        Chargement des utilisateurs...
                    </div>
                ) : users && users.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-lime-100 text-xs font-semibold text-gray-500 uppercase">
                                    <th className="py-3 px-4">Nom</th>
                                    <th className="py-3 px-4">Email</th>
                                    <th className="py-3 px-4">Rôle</th>
                                    <th className="py-3 px-4">Date d'inscription</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-lime-50">
                                {users.map((u) => (
                                    <tr key={u._id} className="hover:bg-lime-50/30 transition-colors">
                                        <td className="py-3.5 px-4 font-semibold text-lime-950">
                                            {u.nom}
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-600">
                                            {u.email}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span
                                                className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                                                    u.role === "admin"
                                                        ? "bg-purple-100 text-purple-800"
                                                        : "bg-lime-100 text-lime-800"
                                                }`}
                                            >
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-xs text-gray-500">
                                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString("fr-FR") : "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between pt-4 border-t border-lime-50 mt-4 text-xs">
                                <span className="text-gray-500">
                                    Page {page} sur {totalPages}
                                </span>
                                <div className="flex gap-2">
                                    <Button
                                        variant="secondary"
                                        disabled={page <= 1}
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        className="text-xs py-1.5 px-3"
                                    >
                                        Précédent
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        disabled={page >= totalPages}
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        className="text-xs py-1.5 px-3"
                                    >
                                        Suivant
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="py-12 text-center text-gray-400 text-xs">
                        Aucun utilisateur trouvé.
                    </div>
                )}
            </Card>
        </div>
    );
}

export default UsersList;
