import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Layout from "../components/layout/Layout.jsx";

import ParcellesList from "../pages/parcelles/ParcellesList.jsx";
import ParcelleDetail from "../pages/parcelles/ParcelleDetail.jsx";
import ParcelleForm from "../pages/parcelles/ParcelleForm.jsx";

import RecolteForm from "../pages/recoltes/RecolteForm.jsx"

import NotFound from "../pages/NotFound.jsx";
import RecoltesList from "../pages/recoltes/RecoltesList.jsx";
import TriturationForm from "../pages/triturations/TriturationForm.jsx";
import TriturationsList from "../pages/triturations/TriturationsList.jsx";

function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route path="/parcelles" element={<ParcellesList />} />
                <Route path="/parcelles/new" element={<ParcelleForm />} />
                <Route path="/parcelles/:id" element={<ParcelleDetail />} />
                <Route path="/parcelles/:id/edit" element={<ParcelleForm />} />
                <Route path="/recoltes/new" element={<RecolteForm/>}/>
                <Route path="/recoltes" element={<RecoltesList/>}/>
                <Route path="/triturations/new" element={<TriturationForm/>}/>
                <Route path="/triturations" element={<TriturationsList/>}/>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;