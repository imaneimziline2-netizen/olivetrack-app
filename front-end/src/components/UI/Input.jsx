function Input({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    error = "",
    required = false,
    min,
    max,
    step,
    disabled = false,
    className = "",
}) {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-xs font-semibold text-lime-900 mb-1.5 uppercase tracking-wider">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value ?? ""}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                className={`w-full py-2.5 px-3.5 border rounded-xl text-sm bg-lime-50/30 text-lime-950 placeholder-gray-400 outline-none transition-all duration-200 focus:bg-white focus:ring-3 ${
                    error
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-lime-200 focus:border-lime-500 focus:ring-lime-200/40"
                } disabled:bg-gray-100 disabled:text-gray-400`}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

export default Input;
