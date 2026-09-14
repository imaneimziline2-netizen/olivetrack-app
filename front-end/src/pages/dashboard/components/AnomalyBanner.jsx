function AnomalyBanner({ stats, selectedYear }) {
    const anomalies = stats.filter((s) => s.alerte === true);

    if (anomalies.length === 0) return null;

    return (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
                <h4 className="text-sm font-bold text-red-900">
                    {anomalies.length} anomalie(s) détectée(s) en {selectedYear}
                </h4>
                <p className="text-xs text-red-700 mt-0.5">
                    Baisse de rendement de plus de 20% constatée par rapport à la moyenne historique.
                </p>
            </div>
        </div>
    );
}

export default AnomalyBanner;