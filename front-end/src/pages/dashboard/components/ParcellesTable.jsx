import { useNavigate } from "react-router-dom";
import Card from "../../../components/UI/Card.jsx";
import AlertBadge from "../../../components/UI/AlertBadge.jsx";

function ParcellesTable({ stats, selectedYear }) {
    const navigate = useNavigate();

    return (
        <Card
            title={`Performances des Parcelles (${selectedYear})`}
            subtitle="Rendement annuel et détection des baisses"
            extra={
                <button
                    variant="secondary"
                    onClick={() => navigate("/parcelles")}
                    className="text-xs"
                >
                    Voir toutes →
                </button>
            }
        >
            {stats.length > 0 ? (
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
                                <tr
                                    key={row.parcelleId}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                                        {row.nomParcelle}
                                    </td>
                                    <td className="py-3.5 px-4 text-gray-700">
                                        {row.totalOlives !== undefined
                                            ? row.totalOlives.toLocaleString()
                                            : "-"}
                                    </td>
                                    <td className="py-3.5 px-4 text-gray-700">
                                        {row.totalHuile !== undefined
                                            ? row.totalHuile.toLocaleString()
                                            : "-"}
                                    </td>
                                    <td className="py-3.5 px-4 font-bold text-[#059669]">
                                        {row.rendement !== null && row.rendement !== undefined
                                            ? `${row.rendement}%`
                                            : "—"}
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
                                            <span className="text-xs text-gray-400">
                                                En attente
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3.5 px-4 text-right">
                                        <button
                                            onClick={() =>
                                                navigate(`/parcelles/${row.parcelleId}`)
                                            }
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
                    <p className="text-lg">🌿 Aucune parcelle enregistrée.</p>
                    <button
                        variant="primary"
                        onClick={() => navigate("/parcelles/new")}
                        className="mt-4 text-xs"
                    >
                        Créer ma première parcelle
                    </button>
                </div>
            )}
        </Card>
    );
}

export default ParcellesTable;