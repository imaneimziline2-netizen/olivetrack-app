import { useEffect, useState } from "react";

import {
    getGuideAgronomique,
    getGuideByMois,
} from "../../services/guideService";

const ICONS = {
    irrigation: (
        <img
            width="48"
            height="48"
            src="https://img.icons8.com/fluency-systems-filled/48/watering.png"
            alt="watering"
        />
    ),
    taille: (
        <img
            width="32"
            height="32"
            src="https://img.icons8.com/stamp/32/cut.png"
            alt="cut"
        />
    ),
    fertilisation: (
        <img
            width="48"
            height="48"
            src="https://img.icons8.com/parakeet-filled/48/plant-under-sun.png"
            alt="plant-under-sun"
        />
    ),
    protection: (
        <img
            width="48"
            height="48"
            src="https://img.icons8.com/fluency-systems-filled/48/security-checked.png"
            alt="security-checked"
        />
    ),
    recolte: (
        <img
            width="50"
            height="50"
            src="https://img.icons8.com/external-others-pike-picture/50/external-Harvesting-Berries-olive-others-pike-picture-2.png"
            alt="external-Harvesting-Berries-olive-others-pike-picture-2"
        />
    ),
};

const LABELS = {
    irrigation: "Irrigation",
    taille: "Taille",
    fertilisation: "Fertilisation",
    protection: "Protection",
    recolte: "Récolte",
};

export default function GuideAgronomique() {
    // Mois actuel : 1 = janvier, 12 = décembre
    const currentMonth = new Date().getMonth() + 1;

    // Mois sélectionné
    const [selectedMois, setSelectedMois] = useState(currentMonth);

    // Tous les guides
    const [guideAgronomiqueData, setGuideAgronomiqueData] = useState([]);

    // Guide du mois sélectionné
    const [guide, setGuide] = useState(null);

    // État de chargement
    const [loading, setLoading] = useState(true);

    // Erreur éventuelle
    const [error, setError] = useState(null);

    /*
     * Charger tous les mois
     */
    useEffect(() => {
        const loadGuide = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getGuideAgronomique();

                setGuideAgronomiqueData(data);
            } catch (err) {
                console.error(
                    "Erreur lors du chargement du guide agronomique :",
                    err,
                );

                setError("Impossible de charger le guide agronomique.");
            } finally {
                setLoading(false);
            }
        };

        loadGuide();
    }, []);

    /*
     * Charger le guide correspondant au mois sélectionné
     */
    useEffect(() => {
        const loadSelectedGuide = async () => {
            try {
                const data = await getGuideByMois(selectedMois);

                setGuide(data);
            } catch (err) {
                console.error(
                    "Erreur lors du chargement du guide du mois :",
                    err,
                );

                setGuide(null);
            }
        };

        loadSelectedGuide();
    }, [selectedMois]);

    /*
     * Chargement
     */
    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="text-4xl mb-3">🌿</div>

                    <p className="text-sm text-gray-500">
                        Chargement du guide agronomique...
                    </p>
                </div>
            </div>
        );
    }

    /*
     * Erreur
     */
    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <span className="text-2xl">⚠️</span>

                    <div>
                        <h2 className="font-semibold text-red-800">Erreur</h2>

                        <p className="text-sm text-red-600 mt-1">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Guide Agronomique
                </h1>

                <p className="text-sm text-gray-500 mt-0.5">
                    Conseils mensuels pour la gestion de votre oliveraie
                </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-xs p-4 mb-6 overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                    {guideAgronomiqueData.map((g) => {
                        const isActive = g.mois === selectedMois;
                        const isCurrent = g.mois === currentMonth;

                        return (
                            <button
                                key={g.mois}
                                type="button"
                                onClick={() => setSelectedMois(g.mois)}
                                className={`
                                    px-4
                                    py-2
                                    rounded-lg
                                    text-sm
                                    font-medium
                                    transition-colors
                                    whitespace-nowrap
                                    ${
                                        isActive
                                            ? "bg-[#49CCC3] text-white shadow-sm"
                                            : isCurrent
                                              ? "bg-[#edf7ee] text-[#15803d] border border-[#059669]/30"
                                              : "text-gray-500 hover:bg-gray-50"
                                    }
                                `}
                            >
                                {g.nom}

                                {isCurrent && !isActive && (
                                    <span className="ml-1 text-[10px] align-top text-[#059669]">
                                        ●
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {guide ? (
                <>
                    <div className="bg-[#edf7ee] border border-[#059669]/30 rounded-2xl p-4 mb-6 flex items-start gap-3">
                        <img
                            width="50"
                            height="50"
                            src="https://img.icons8.com/plasticine/100/olive.png"
                            alt="olive"
                        />
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-[#19525A] uppercase tracking-wide">
                                    {guide.saison}
                                </span>

                                <span className="text-gray-300">•</span>

                                <span className="text-xs text-gray-500">
                                    {guide.nom}
                                </span>
                            </div>

                            <p className="text-sm font-medium text-gray-800">
                                {guide.focus}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(guide.actions).map(([key, value]) => (
                            <div
                                key={key}
                                className="bg-white border border-gray-100 rounded-2xl shadow-xs p-5 flex gap-4"
                            >
                                <div className="w-10 h-10 flex items-center justify-center bg-[#edf7ee] rounded-xl text-xl flex-shrink-0">
                                    {ICONS[key] || "📌"}
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-800 text-sm mb-1">
                                        {LABELS[key] || key}
                                    </h3>

                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
                    <div className="text-4xl mb-3">🌿</div>

                    <h2 className="font-semibold text-gray-800">
                        Aucun guide disponible
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Aucun conseil agronomique n'est disponible pour ce mois.
                    </p>
                </div>
            )}
        </div>
    );
}
