import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTriturations } from "../../../../store/slices/triturationSlice";
import SearchBar from "../SearchBar.jsx";

const TriturationsDetails = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { triturations } = useSelector((state) => state.triturations);

    const [search, setSearch] = useState("");
    const [searchType, setSearchType] = useState("all");

    useEffect(() => {
        dispatch(fetchTriturations(id));
    }, [id, dispatch]);

    const filtered = triturations.filter((t) => {
        if (!search) return true;

        const dateStr = new Date(t.date).toLocaleDateString("fr-FR");
        const qteStr = String(t.quantite);
        const huileStr = String(t.quantiteHuile);
        const rendStr = String(t.rendement);

        if (searchType === "date") return dateStr.includes(search);
        if (searchType === "quantite") return qteStr.includes(search);
        return (
            dateStr.includes(search) ||
            qteStr.includes(search) ||
            huileStr.includes(search) ||
            rendStr.includes(search)
        );
    });

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-[#00B894]/20 bg-gradient-to-r from-[#1B5E5A]/5 to-[#00B894]/5">
                <h3 className="text-sm font-semibold text-[#1B5E5A]">
                    Historique des triturations
                </h3>
                <button
                    onClick={() =>
                        navigate(`/triturations/new?parcelleId=${id}`)
                    }
                    className="text-xs font-semibold text-[#F08C5A] hover:text-[#F5D76E] transition"
                >
                    + Ajouter
                </button>
            </div>

            {/* Barre de recherche + Choix */}
            <div className="flex items-center gap-2 p-4 border-b border-gray-100">
                <select
                    value={searchType}
                    onChange={(e) => {
                        setSearchType(e.target.value);
                        setSearch("");
                    }}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00B894]/40 focus:border-[#00B894]"
                >
                    <option value="all">Tout</option>
                    <option value="date">Date</option>
                    <option value="quantite">Quantité</option>
                </select>

                <div className="flex-1">
                    <SearchBar
                        onSearch={setSearch}
                        placeholder={
                            searchType === "date"
                                ? "Rechercher par date..."
                                : searchType === "quantite"
                                ? "Rechercher par quantité..."
                                : "Rechercher..."
                        }
                    />
                </div>
            </div>

            {/* Table */}
            {filtered.length > 0 ? (
                <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-[#1B5E5A] to-[#00B894] text-white text-xs uppercase">
                        <tr>
                            <th className="text-left px-4 py-2">Date</th>
                            <th className="text-left px-4 py-2">Olives (kg)</th>
                            <th className="text-left px-4 py-2">Huile (L)</th>
                            <th className="text-left px-4 py-2">Rendement</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filtered.map((t) => (
                            <tr
                                key={t._id}
                                className="hover:bg-[#00B894]/5 transition"
                            >
                                <td className="px-4 py-2.5">
                                    {new Date(t.date).toLocaleDateString(
                                        "fr-FR"
                                    )}
                                </td>
                                <td className="px-4 py-2.5">{t.quantite} kg</td>
                                <td className="px-4 py-2.5">
                                    {t.quantiteHuile} L
                                </td>
                                <td className="px-4 py-2.5 font-bold text-[#F08C5A]">
                                    {t.rendement}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-400 text-sm py-8">
                    Aucune trituration trouvée.
                </p>
            )}
        </div>
    );
};

export default TriturationsDetails;