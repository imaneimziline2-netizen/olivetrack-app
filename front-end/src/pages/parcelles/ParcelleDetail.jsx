import { TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchParcelleById,
    fetchParcelleStock,
    clearCurrentParcelle,
    fetchParcelleRendement,
} from "../../../store/slices/parcelleSlice.js";
import ParcelleVeu from "../../components/UI/parcelle/ParcelleVeu.jsx";
import RecoltDetails from "../../components/UI/opérations/RecoltDetails.jsx";
import TriturationsDetails from "../../components/UI/opérations/TriturationsDetails.jsx";
import VenteDetails from "../../components/UI/opérations/VenteDetails.jsx";
import NotFound from "../NotFound.jsx";

function ParcelleDetail() {
    const TABS = ["Vue d'ensemble", "Récoltes", "Trituration", "Ventes"];
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(TABS[0]);

    const {
        currentParcelle,
        currentStock,
        loading,
        error,
        currentParcelleRendement,
    } = useSelector((state) => state.parcelles);

    console.log(currentParcelleRendement);
    console.log(loading);

    useEffect(() => {
        dispatch(fetchParcelleById(id));
        dispatch(fetchParcelleStock(id));
        dispatch(
            fetchParcelleRendement({
                parcelleId: id,
                annee: new Date().getFullYear(),
            }),
        );

        return () => dispatch(clearCurrentParcelle());
    }, [dispatch, id]);

    console.log(currentParcelleRendement);

    if (loading) {
        return <p className="p-6 text-center text-gray-400">Chargement...</p>;
    }

    if (!currentParcelle) {
        return <NotFound />;
    }

    console.log("erroroooooooo", error);
    if (error) {
        console.log("kaynnnnnn");

        return (
            <div className="p-6">
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {error}
                </div>
                <button
                    onClick={() => navigate("/parcelles")}
                    className="mt-4 text-sm text-green-700"
                >
                    ← Retour
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <button
                    onClick={() => navigate("/parcelles")}
                    className="text-xs text-gray-400 hover:text-[#38b0a9] transition-colors"
                >
                    Mes Parcellesj /{" "}
                    <span className="text-gray-700">{currentParcelle.nom}</span>
                </button>

                <div className="flex items-center justify-between mt-2">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {currentParcelle.nom}
                        </h1>
                        <p className="text-xs text-gray-400 mt-1">
                            {currentParcelle.variete} •{" "}
                            {currentParcelle.superficie} ha •{" "}
                            {currentParcelle.typeIrrigation}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 border-b border-gray-200">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                            activeTab === tab
                                ? "border-[#38b0a9] text-[#188e88]"
                                : "border-transparent text-gray-400 hover:text-gray-600"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {currentParcelleRendement?.alerte && (
                <div className="bg-red-400 p-4 flex items-center gap-3 rounded-md">
                    <TriangleAlert />
                    <p>{currentParcelleRendement?.message}</p>
                </div>
            )}

            {activeTab === TABS[0] && (
                <ParcelleVeu id={id} currentStock={currentStock} />
            )}

            {activeTab === TABS[1] && <RecoltDetails id={id} />}

            {activeTab === TABS[2] && <TriturationsDetails id={id} />}

            {activeTab === TABS[3] && <VenteDetails id={id} />}
        </div>
    );
}

export default ParcelleDetail;
