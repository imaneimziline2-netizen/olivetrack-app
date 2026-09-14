function KpiCards({ stats }) {
    const totalOlives = stats.reduce((sum, s) => sum + (s.totalOlives || 0), 0);
    const totalHuile = stats.reduce((sum, s) => sum + (s.totalHuile || 0), 0);
    const rendements = stats.filter((s) => s.rendement !== null).map((s) => s.rendement);
    const rendementMoyen =
        rendements.length > 0
            ? Math.round((rendements.reduce((a, b) => a + b, 0) / rendements.length) * 10) / 10
            : 0;

    const cards = [
        {
            label: "Total Récolte",
            value: totalOlives.toLocaleString(),
            unit: "kg",
            icon: "🧺",
            bg: "bg-emerald-100",
            color: "text-emerald-600",
            sub: "Récolte totale des olives",
        },
        {
            label: "Production Huile",
            value: totalHuile.toLocaleString(),
            unit: "L",
            icon: "🫒",
            bg: "bg-orange-100",
            color: "text-orange-600",
            sub: "Production totale d'huile d'olive",
        },
        {
            label: "Rendement Moyen",
            value: rendementMoyen,
            unit: "%",
            icon: "📈",
            bg: "bg-blue-100",
            color: "text-blue-600",
            sub: "Rendement moyen des parcelles",
        },
        {
            label: "Parcelles Actives",
            value: stats.length,
            unit: "",
            icon: "💰",
            bg: "bg-purple-100",
            color: "text-purple-600",
            sub: "Nombre de parcelles actives",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, i) => (
                <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-start"
                >
                    <div>
                        <p className="text-xs text-gray-400">{card.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                            {card.value}
                            {card.unit && (
                                <span className="text-sm font-semibold ml-1">{card.unit}</span>
                            )}
                        </p>
                        <p className={`text-[10px] mt-1 ${card.color}`}>{card.sub}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-full ${card.bg} flex items-center justify-center`}>
                        {card.icon}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default KpiCards;