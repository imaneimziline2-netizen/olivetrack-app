import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-[#f8f9fa] font-sans text-gray-800">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
                <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
                <main className="flex-1 p-6 sm:p-8 md:p-10 max-w-7xl w-full overflow-y-auto">
                    {children || <Outlet />}
                </main>
            </div>
        </div>
    );
}

export default Layout;
