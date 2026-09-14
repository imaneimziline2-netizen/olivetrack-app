import { useSelector } from "react-redux";

function DashboardHeader({ selectedYear, setSelectedYear }) {
    const user = useSelector((state) => state.auth?.user);
    const currentYear = new Date().getFullYear();
    const years = [
        currentYear,
        currentYear - 1,
        currentYear - 2,
        currentYear - 3,
    ];

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Bonjour, {user?.nom || "Hassan"}! 👋
                </h1>
                <p className="text-xs text-gray-400 mt-1">
                    Voici votre exploitation aujourd'hui en temps réel
                </p>
            </div>

            <div className="flex items-center gap-2">
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="py-1.5 px-3 bg-white border border-gray-200 rounded-lg text-xs font-semibold cursor-pointer"
                >
                    {years.map((y) => (
                        <option key={y} value={y}>
                            This {y}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default DashboardHeader;
