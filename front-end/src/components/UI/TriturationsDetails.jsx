import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTriturations } from "../../../store/slices/triturationSlice";

const TriturationsDetails = ({ id }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { triturations } = useSelector((state) => state.triturations);

    useEffect(()=>{
        dispatch(fetchTriturations(id))
    },[id])

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-sm font-semibold">
                    Historique des triturations
                </h3>

                <button
                    onClick={() =>
                        navigate(`/triturations/new?parcelleId=${id}`)
                    }
                    className="text-xs text-green-700 font-semibold"
                >
                    + Ajouter
                </button>
            </div>
            {triturations.length > 0 ? (
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-400 uppercase">
                        <tr>
                            <th className="text-left px-4 py-2">Date</th>
                            <th className="text-left px-4 py-2">Olives (kg)</th>
                            <th className="text-left px-4 py-2">Huile (L)</th>
                            <th className="text-left px-4 py-2">Rendement</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {triturations.map((t) => (
                            <tr key={t._id}>
                                <td className="px-4 py-2.5">
                                    {new Date(t.date).toLocaleDateString(
                                        "fr-FR",
                                    )}
                                </td>
                                <td className="px-4 py-2.5">{t.quantite} kg</td>
                                <td className="px-4 py-2.5">
                                    {t.quantiteHuile} L
                                </td>
                                <td className="px-4 py-2.5 font-bold text-green-700">
                                    {t.rendement}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-400 text-sm py-8">
                    Aucune trituration enregistrée.
                </p>
            )}
        </div>
    );
};

export default TriturationsDetails;
