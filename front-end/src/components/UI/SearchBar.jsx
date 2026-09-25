import { useState } from "react";

function SearchBar({ onSearch, placeholder = "Rechercher..." }) {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onSearch(newValue.trim());
    };

    const handleClear = () => {
        setValue("");
        onSearch("");
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#19525A]/30"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <img
                    src="https://img.icons8.com/ios-filled/50/search--v1.png"
                    alt="search"
                    className="w-4 h-4 opacity-50"
                />
            </span>
            {value && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                    ✕
                </button>
            )}
        </div>
    );
}

export default SearchBar;