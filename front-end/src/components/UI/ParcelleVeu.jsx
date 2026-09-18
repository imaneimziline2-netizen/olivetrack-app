import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRecoltes } from "../../../store/slices/recolteSlice";
import { fetchTriturations } from "../../../store/slices/triturationSlice";

function ParcelleVeu({ id, currentStock }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { recoltes } = useSelector((state) => state.recoltes);
    const { triturations } = useSelector((state) => state.triturations);

    useEffect(() => {
        dispatch(fetchRecoltes(id));
        dispatch(fetchTriturations(id));
    }, [dispatch, id]);

    return (

        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Total Récolté</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                        {recoltes.reduce(
                            (s, r) => s + (r.quantiteOlives || 0),
                            0,
                        )}{" "}
                        kg
                    </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Huile Produite</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                        {triturations.reduce(
                            (s, t) => s + (t.quantiteHuile || 0),
                            0,
                        )}{" "}
                        L
                    </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Rendement</p>
                    <p className="text-xl font-bold text-green-700 mt-1">
                        {triturations.length > 0
                            ? `${triturations[triturations.length - 1].rendement}%`
                            : "—"}
                    </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Stock Actuel</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                        {currentStock?.Stock ?? "—"} kg
                    </p>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold mb-3">Détail du stock</h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                        <p className="text-lg font-bold text-green-700">
                            {currentStock?.Stock ?? 0} kg
                        </p>
                        <p className="text-[10px] text-gray-400">Disponible</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-700">
                            +{currentStock?.quantiteEntrant ?? 0}
                        </p>
                        <p className="text-[10px] text-gray-400">
                            Entrant total
                        </p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-700">
                            -{currentStock?.quantiteSortante ?? 0}
                        </p>
                        <p className="text-[10px] text-gray-400">
                            Sortant total
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={() => navigate(`/recoltes/new?parcelleId=${id}`)}
                    className="bg-green-700 text-white rounded-lg px-4 py-2 text-xs"
                >
                    Nouvelle Récolte
                </button>
                <button
                    onClick={() =>
                        navigate(`/triturations/new?parcelleId=${id}`)
                    }
                    className="border rounded-lg px-4 py-2 text-xs"
                >
                    Nouvelle Trituration
                </button>
                <button
                    onClick={() => navigate(`/ventes/new?parcelleId=${id}`)}
                    className="border rounded-lg px-4 py-2 text-xs"
                >
                    Nouvelle Vente
                </button>
                <button
                    onClick={() => navigate(`/parcelles/${id}/edit`)}
                    className="border rounded-lg px-4 py-2 text-xs ml-auto"
                >
                    Modifier
                </button>
            </div>
        </div>
    );
}

export default ParcelleVeu;
