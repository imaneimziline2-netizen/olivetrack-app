const MOIS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

function MonthlyYieldChart({ data = [], annee, loading = false }) {
    const fullData = MOIS.map((nom, i) => {
        const found = data.find((d) => d.mois === i + 1);
        return {
            mois: nom,
            totalOlives: found?.totalOlives || 0,
            totalHuile: found?.totalHuile || 0,
        };
    });

    const maxValue = Math.max(...fullData.map((d) => d.totalOlives), 1);
    const totalYear = fullData.reduce((sum, d) => sum + d.totalOlives, 0);

    if (loading) {
        return (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-800">
                        Monthly Yield Analysis
                    </h3>
                    <span className="text-xs font-semibold text-gray-400">{annee}</span>
                </div>
                <div className="h-48 flex items-center justify-center text-gray-400 text-xs">
                    Chargement du graphique...
                </div>
            </div>
        );
    }

    if (totalYear === 0) {
        return (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-800">
                        Monthly Yield Analysis
                    </h3>
                    <span className="text-xs font-semibold text-gray-400">{annee}</span>
                </div>
                <div className="h-48 flex items-center justify-center text-gray-400 text-xs">
                    Aucune donnée pour {annee}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                        Monthly Yield Analysis
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                        Total annuel : {totalYear.toLocaleString()} kg
                    </p>
                </div>
                <span className="text-xs font-semibold text-gray-400">{annee}</span>
            </div>

            <div className="flex items-end justify-between gap-1 h-48">
                {fullData.map((d) => {
                    const height = (d.totalOlives / maxValue) * 100;
                    const isActive = d.totalOlives === maxValue && maxValue > 0;

                    return (
                        <div
                            key={d.mois}
                            className="flex flex-col items-center flex-1 group relative"
                        >
                            <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[9px] px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                                {d.totalOlives.toLocaleString()} kg
                            </div>
                            <div
                                className={`w-full rounded-t transition-all ${
                                    isActive ? "bg-[#059669]" : "bg-emerald-100"
                                } hover:bg-emerald-500`}
                                style={{ height: `${height}%`, minHeight: "4px" }}
                            />
                            <span className="text-[9px] text-gray-400 mt-1">{d.mois}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MonthlyYieldChart;