import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
    const { token, user } = useSelector((state) => state.auth);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" replace />;
        }

        if (user?.role === "agriculteur") {
            return <Navigate to="/" replace />;
        }

        return <Navigate to="/login" replace />;
    }

    // Supports two usages:
    // 1) <ProtectedRoute><SomeComponent /></ProtectedRoute>  -> renders children
    // 2) <Route element={<ProtectedRoute allowedRoles={[...]} />}> -> renders <Outlet />
    return children ? children : <Outlet />;
}

export default ProtectedRoute;
