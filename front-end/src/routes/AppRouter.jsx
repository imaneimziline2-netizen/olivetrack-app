import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <h1 className="text-center mt-16">Bienvenue sur OliveTrack 🌿</h1>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default AppRouter;