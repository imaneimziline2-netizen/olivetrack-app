import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchVentes } from "../../../store/slices/venduSlice";

function VenteDetails({ id }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { ventes } = useSelector((state) => state.ventes);

    useEffect(() => {
        console.log("fetching Ventes");
        dispatch(fetchVentes(id));
    }, [id]);

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-sm font-semibold">Historique des ventes</h3>
                <button
                    onClick={() => navigate(`/ventes/new?parcelleId=${id}`)}
                    className="text-xs text-green-700 font-semibold"
                >
                    + Ajouter
                </button>
            </div>
            {ventes.length > 0 ? (
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-400 uppercase">
                        <tr>
                            <th className="text-left px-4 py-2">Date</th>
                            <th className="text-left px-4 py-2">
                                Quantité (L)
                            </th>
                            <th className="text-left px-4 py-2">Revenu</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {ventes.map((v) => (
                            <tr key={v._id}>
                                <td className="px-4 py-2.5">
                                    {new Date(v.date).toLocaleDateString(
                                        "fr-FR",
                                    )}
                                </td>
                                <td className="px-4 py-2.5">
                                    {v.quantiteVendue} L
                                </td>
                                <td className="px-4 py-2.5 font-semibold text-green-700">
                                    {v.revenu} MAD
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-400 text-sm py-8">
                    Aucune vente enregistrée.
                </p>
            )}
        </div>
    );
}

export default VenteDetails;
