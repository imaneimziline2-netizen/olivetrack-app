import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function DonutChart({
    data = [],
    title = "Répartition",
    totalLabel = "Total",
    height = 250,
    innerRadius = 60,
    outerRadius = 90,
     colors = ["#FFE566", "#49CCC3", "#FF6464"],
}){
    if (!data || data.length === 0) {
        return (
            <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-center">
                    {title}
                </h3>
                <p className="text-center text-gray-400 text-sm py-12">
                    Aucune donnée
                </p>
            </div>
        );
    }

    const total = data.reduce((sum, d) => sum + (d.value || 0), 0);

    const dataWithColors = data.map((d, i) => ({
        ...d,
        color: d.color || colors[i % colors.length],
    }));

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
            {title && (
                <h3 className="font-semibold text-gray-900 mb-3 text-center">
                    {title}
                </h3>
            )}

            <div className="relative">
                <ResponsiveContainer width="100%" height={height}>
                    <PieChart>
                        <Pie
                            data={dataWithColors}
                            cx="50%"
                            cy="50%"
                            innerRadius={innerRadius}
                            outerRadius={outerRadius}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {dataWithColors.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => value.toLocaleString("fr-FR")}
                        />
                    </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-2xl font-bold text-gray-900">
                        {total.toLocaleString("fr-FR")}
                    </p>
                    <p className="text-xs text-gray-400">{totalLabel}</p>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-4">
                {dataWithColors.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1">
                        <span
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-xs text-gray-500">
                            {entry.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DonutChart;
