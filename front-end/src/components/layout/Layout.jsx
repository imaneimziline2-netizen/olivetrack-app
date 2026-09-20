import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import { fetchDashboard } from "../../../store/slices/dashboardSlice.js";

function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const dispatch = useDispatch();
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        dispatch(fetchDashboard(currentYear));
    }, [dispatch, currentYear]);

    return (
        <div className="min-h-screen flex bg-[#f8f9fa] font-sans text-gray-800">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
                <Navbar
                    onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
                />

                <main className="flex-1 px-6 pb-6 pt-2 sm:px-8 sm:pb-8 sm:pt-3 md:px-10 md:pb-10 md:pt-4 max-w-7xl w-full overflow-y-auto scrollbar-none">
                    {children || <Outlet />}
                </main>
            </div>
        </div>
    );
}

export default Layout;