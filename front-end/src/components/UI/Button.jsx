function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    disabled = false,
    className = "",
}) {
    const base = "inline-flex items-center justify-center font-medium rounded-xl text-sm px-4 py-2.5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-lime-500 to-lime-600 text-white hover:from-lime-600 hover:to-lime-700 shadow-md shadow-lime-500/20 active:translate-y-0.5",
        secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 active:translate-y-0.5",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20 active:translate-y-0.5",
        outline: "bg-transparent text-lime-700 border-2 border-lime-500 hover:bg-lime-50",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant] || variants.primary} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;
