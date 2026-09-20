import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../store/slices/authSlice.js";
import logo from "../../assets/image-removebg-preview.png";

function Sidebar({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.auth.user);

    const isOperationsActive =
        location.pathname.startsWith("/recoltes") ||
        location.pathname.startsWith("/triturations") ||
        location.pathname.startsWith("/ventes");

    const [operationsExpanded, setOperationsExpanded] =
        useState(isOperationsActive);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs md:hidden"
                />
            )}

            <aside
                className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200/80 transition-transform duration-300 ease-in-out flex flex-col justify-between shrink-0 ${
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                }`}
            >
                <div>
                    <div className="h-18 px-6 flex items-center justify-between border-b border-gray-100">
                        <div
                            onClick={() => {
                                navigate("/");
                                onClose?.();
                            }}
                            className="flex items-center gap-3 cursor-pointer select-none"
                        >
                            <div className="w-10 h-10">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="w-10 h-10"
                                />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-[#19525A]">
                                Olive
                                <span className="text-[#49CCC3]">Grove</span>
                            </span>
                        </div>

                        <button
                            onClick={onClose}
                            className="md:hidden text-gray-400 hover:text-gray-700 text-lg p-1"
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="pt-5 space-y-1">
                        {user?.role !== "admin" && (
                            <NavLink
                                to="/"
                                end
                                onClick={() => onClose?.()}
                                className={({ isActive }) =>
                                    `flex items-center gap-3.5 px-6 py-3 text-sm font-medium transition-colors border-l-4 ${
                                        isActive
                                            ? "bg-[#edf7ee] text-[#19525A] border-[#49CCC3]  font-semibold"
                                            : "text-gray-400 hover:text-gray-700 hover:bg-gray-50/80 border-transparent"
                                    }`
                                }
                            >
                                <svg
                                    className="w-4.5 h-4.5 shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        x="3"
                                        y="3"
                                        width="7"
                                        height="7"
                                        rx="1.5"
                                    />
                                    <rect
                                        x="14"
                                        y="3"
                                        width="7"
                                        height="7"
                                        rx="1.5"
                                    />
                                    <rect
                                        x="14"
                                        y="14"
                                        width="7"
                                        height="7"
                                        rx="1.5"
                                    />
                                    <rect
                                        x="3"
                                        y="14"
                                        width="7"
                                        height="7"
                                        rx="1.5"
                                    />
                                </svg>
                                <span>Dashboard</span>
                            </NavLink>
                        )}

                        {user?.role !== "admin" && (
                            <NavLink
                                to="/parcelles"
                                onClick={() => onClose?.()}
                                className={({ isActive }) =>
                                    `flex items-center gap-3.5 px-6 py-3 text-sm font-medium transition-colors border-l-4 ${
                                        isActive
                                            ? "bg-[#edf7ee] text-[#19525A] border-[#49CCC3]  font-semibold"
                                            : "text-gray-400 hover:text-gray-700 hover:bg-gray-50/80 border-transparent"
                                    }`
                                }
                            >
                                <svg
                                    className="w-4.5 h-4.5 shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                                </svg>
                                <span>Mes Parcelles</span>
                            </NavLink>
                        )}

                        {user?.role !== "admin" && (
                            <div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOperationsExpanded((prev) => !prev)
                                    }
                                    className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors border-l-4 cursor-pointer ${
                                        isOperationsActive
                                            ? "bg-[#edf7ee] text-[#19525A] border-[#49CCC3] font-semibold"
                                            : "text-gray-400 hover:text-gray-700 hover:bg-gray-50/80 border-transparent"
                                    }`}
                                >
                                    <div className="flex items-center gap-3.5">
                                        <svg
                                            className="w-4.5 h-4.5 shrink-0"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect
                                                x="2"
                                                y="4"
                                                width="20"
                                                height="16"
                                                rx="2"
                                            />
                                            <path d="M6 8h12M6 12h8M6 16h5" />
                                        </svg>
                                        <span>Opérations</span>
                                    </div>
                                    <svg
                                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                            operationsExpanded
                                                ? "rotate-180 text-[#19525A]"
                                                : "text-gray-400"
                                        }`}
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
                                </button>

                                {operationsExpanded && (
                                    <div className="pl-14 pr-4 py-1.5 space-y-1 bg-gray-50/50">
                                        <NavLink
                                            to="/recoltes"
                                            onClick={() => onClose?.()}
                                            className={({ isActive }) =>
                                                `block py-1.5 text-xs font-medium transition-colors ${
                                                    isActive
                                                        ? "text-[#19525A] font-semibold"
                                                        : "text-gray-500 hover:text-gray-800"
                                                }`
                                            }
                                        >
                                            • Récoltes
                                        </NavLink>
                                        <NavLink
                                            to="/triturations"
                                            onClick={() => onClose?.()}
                                            className={({ isActive }) =>
                                                `block py-1.5 text-xs font-medium transition-colors ${
                                                    isActive
                                                        ? "text-[#19525A] font-semibold"
                                                        : "text-gray-500 hover:text-gray-800"
                                                }`
                                            }
                                        >
                                            • Triturations
                                        </NavLink>
                                        <NavLink
                                            to="/ventes"
                                            onClick={() => onClose?.()}
                                            className={({ isActive }) =>
                                                `block py-1.5 text-xs font-medium transition-colors ${
                                                    isActive
                                                        ? "text-[#19525A] font-semibold"
                                                        : "text-gray-500 hover:text-gray-800"
                                                }`
                                            }
                                        >
                                            • Ventes
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        )}

                        {user?.role !== "admin" && (
                            <NavLink
                                to="/guide"
                                onClick={() => onClose?.()}
                                className={({ isActive }) =>
                                    `flex items-center gap-3.5 px-6 py-3 text-sm font-medium transition-colors border-l-4 ${
                                        isActive
                                            ? "bg-[#edf7ee] text-[#19525A] border-[#49CCC3]  font-semibold"
                                            : "text-gray-400 hover:text-gray-700 hover:bg-gray-50/80 border-transparent"
                                    }`
                                }
                            >
                                <svg
                                    className="w-4.5 h-4.5 shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                                    <path d="M6 6h10M6 10h10" />
                                </svg>
                                <span>Guide Agronomique</span>
                            </NavLink>
                        )}
                        {user?.role === "admin" && (
                            <>
                                <NavLink
                                    to="/admin/dashboard"
                                    onClick={() => onClose?.()}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3.5 px-6 py-3 text-sm font-medium transition-colors border-l-4 ${
                                            isActive
                                                ? "bg-[#edf7ee] text-[#49CCC3] border-[#19525A] font-semibold"
                                                : "text-gray-400 hover:text-gray-700 hover:bg-gray-50/80 border-transparent"
                                        }`
                                    }
                                >
                                    <svg
                                        className="w-4.5 h-4.5 shrink-0"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect
                                            x="3"
                                            y="3"
                                            width="7"
                                            height="7"
                                            rx="1.5"
                                        />
                                        <rect
                                            x="14"
                                            y="3"
                                            width="7"
                                            height="7"
                                            rx="1.5"
                                        />
                                        <rect
                                            x="14"
                                            y="14"
                                            width="7"
                                            height="7"
                                            rx="1.5"
                                        />
                                        <rect
                                            x="3"
                                            y="14"
                                            width="7"
                                            height="7"
                                            rx="1.5"
                                        />
                                    </svg>
                                    <span>Dashboard Admin</span>
                                </NavLink>

                                <NavLink
                                    to="/admin/users"
                                    onClick={() => onClose?.()}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3.5 px-6 py-3 text-sm font-medium transition-colors border-l-4 ${
                                            isActive
                                                ? "bg-[#edf7ee] text-[#49CCC3] border-[#19525A] font-semibold"
                                                : "text-gray-400 hover:text-gray-700 hover:bg-gray-50/80 border-transparent"
                                        }`
                                    }
                                >
                                    <svg
                                        className="w-4.5 h-4.5 shrink-0"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                    <span>Utilisateurs (Admin)</span>
                                </NavLink>
                            </>
                        )}

                        <NavLink
                            to="/profile"
                            onClick={() => onClose?.()}
                            className={({ isActive }) =>
                                `flex items-center gap-3.5 px-6 py-3 text-sm font-medium transition-colors border-l-4 ${
                                    isActive
                                        ? "bg-[#edf7ee] text-[#19525A] border-[#49CCC3] font-semibold"
                                        : "text-gray-400 hover:text-gray-700 hover:bg-gray-50/80 border-transparent"
                                }`
                            }
                        >
                            <svg
                                className="w-4.5 h-4.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <span>Profil</span>
                        </NavLink>
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                    >
                        <svg
                            className="w-4.5 h-4.5 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>Se déconnecter</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
