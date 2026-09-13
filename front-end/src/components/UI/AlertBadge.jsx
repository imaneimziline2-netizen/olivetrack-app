function AlertBadge({
    type = "warning",
    message,
    ecart,
    className = "",
}) {
    if (type === "anomaly" || type === "danger") {
        return (
            <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200 ${className}`}
            >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                ⚠️ {message || `Baisse de rendement (${ecart}%)`}
            </span>
        );
    }

    if (type === "success") {
        return (
            <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 ${className}`}
            >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                ✅ {message || "Rendement stable"}
            </span>
        );
    }

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-lime-100 text-lime-800 border border-lime-200 ${className}`}
        >
            ℹ️ {message}
        </span>
    );
}

export default AlertBadge;
