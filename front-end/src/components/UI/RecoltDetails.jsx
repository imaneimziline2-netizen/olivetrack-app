import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRecoltes } from "../../../store/slices/recolteSlice";

const RecoltDetails = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { recoltes } = useSelector((state) => state.recoltes);

    useEffect(() => {
        dispatch(fetchRecoltes(id));
    }, [id]);

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-sm font-semibold">
                    Historique des récoltes
                </h3>
                <button
                    onClick={() => navigate(`/recoltes/new?parcelleId=${id}`)}
                    className="text-xs text-green-700 font-semibold"
                >
                    + Ajouter
                </button>
            </div>
            {recoltes.length > 0 ? (
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-400 uppercase">
                        <tr>
                            <th className="text-left px-4 py-2">Date</th>
                            <th className="text-left px-4 py-2">
                                Quantité (kg)
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {recoltes.map((r) => (
                            <tr key={r._id}>
                                <td className="px-4 py-2.5">
                                    {new Date(r.date).toLocaleDateString(
                                        "fr-FR",
                                    )}
                                </td>
                                <td className="px-4 py-2.5 font-semibold">
                                    {r.quantiteOlives} kg
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-400 text-sm py-8">
                    Aucune récolte enregistrée.
                </p>
            )}
        </div>
    );
};

export default RecoltDetails;
