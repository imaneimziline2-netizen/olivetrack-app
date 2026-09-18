import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/slices/authSlice.js";
import DEFAULT_AVATAR from "../../assets/fermier-avatar.jpg";

function Navbar({ onToggleSidebar }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth?.user);
    const { stats } = useSelector((state) => state.dashboard?.stats || []);

    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");


    const anomaliesCount = stats?.filter((s) => s.alerte === true)?.length ?? 0;

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const handleSearch = (e) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            navigate(`/parcelles`);
        }
    };



    return (
        <header className="h-18 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleSidebar}
                    className="md:hidden p-2 text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                <div className="relative w-60 sm:w-80 md:w-96">
                    <svg
                        className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        placeholder="Rechercher une parcelle, opération..."
                        className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-gray-200/90 rounded-lg text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-5">
                <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center px-3 py-1 bg-amber-50/90 border border-amber-200/70 text-amber-700 text-xs font-semibold rounded-full hover:bg-amber-100 transition-colors cursor-pointer"
                >
                    {anomaliesCount} anomalies
                </button>

                <button
                    onClick={() => navigate("/")}
                    className="text-gray-400 hover:text-gray-600 relative p-1 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
                    title="Notifications"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                    {anomaliesCount > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500"></span>
                    )}
                </button>

                <div className="relative">
                    <div
                        onClick={() => setUserMenuOpen((prev) => !prev)}
                        className="flex items-center gap-3 cursor-pointer py-1 select-none"
                    >
                        <img
                            src={DEFAULT_AVATAR}
                            alt="Avatar"
                            className="w-9 h-9 rounded-full object-cover border border-gray-200 shrink-0"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    "https://ui-avatars.com/api/?name=Hassan+El+Mansouri&background=059669&color=fff";
                            }}
                        />
                        <div className="hidden sm:block text-left">
                            <p className="text-xs font-bold text-gray-900 leading-tight">
                                {user?.nom || "Hassan El Amrani"}
                            </p>
                            <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                                {user?.role === "admin"
                                    ? "Administrateur"
                                    : "Exploitant agricole"}
                            </p>
                        </div>
                        <svg
                            className={`w-3.5 h-3.5 text-gray-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>

                    {userMenuOpen && (
                        <>
                            <div
                                onClick={() => setUserMenuOpen(false)}
                                className="fixed inset-0 z-30"
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100 text-xs">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="font-bold text-gray-900">
                                        {user?.nom || "Hassan El Amrani"}
                                    </p>
                                    <p className="text-gray-400 text-[11px] truncate">
                                        {user?.email ||
                                            "agriculteur@olivegrove.ma"}
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        navigate("/profile");
                                        setUserMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer font-medium"
                                >
                                    Mon Profil
                                </button>
                                <button
                                    onClick={() => {
                                        navigate("/parcelles");
                                        setUserMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer font-medium"
                                >
                                    Mes Parcelles
                                </button>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button
                                    onClick={() => {
                                        setUserMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer font-medium"
                                >
                                    Se déconnecter
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
