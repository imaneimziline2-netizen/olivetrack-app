import { useNavigate } from "react-router-dom";

function FeaturedParcelle({ parcelle, annee }) {
    const navigate = useNavigate();

    if (!parcelle) return null;

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="relative h-40 bg-gradient-to-br from-emerald-100 to-lime-100 flex items-center justify-center">
                <span className="text-5xl">🌳</span>
                <span
                    className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-full text-white ${
                        parcelle.alerte ? "bg-red-500" : "bg-emerald-500"
                    }`}
                >
                    {parcelle.alerte ? "Alerte" : "Bonne santé"}
                </span>
            </div>

            <div className="p-4">
                <h3 className="text-sm font-bold text-gray-900">
                    {parcelle.nomParcelle}
                </h3>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>{annee}</span>
                    <span>
                        {parcelle.rendement !== null
                            ? `${parcelle.rendement}%`
                            : "Pas de données"}
                    </span>
                </div>
                <button
                    onClick={() => navigate(`/parcelles/${parcelle.parcelleId}`)}
                    className="mt-3 text-xs font-semibold text-[#059669] hover:underline cursor-pointer"
                >
                    Voir tout →
                </button>
            </div>
        </div>
    );
}

export default FeaturedParcelle;