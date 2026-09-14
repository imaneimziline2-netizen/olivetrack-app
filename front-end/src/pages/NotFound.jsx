import { useNavigate } from "react-router-dom";
import logo from "../assets/image-removebg-preview.png";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
            <img src={logo} alt="Logo" className="w-32 h-32 mb-4" />
            <h1 className="text-4xl font-extrabold text-lime-950 mb-2">404</h1>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
                Page introuvable
            </h2>
            <p className="text-sm text-gray-500 max-w-md mb-6">
                La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <button
                className="text-xs font-semibold text-[#059669] hover:text-[#047857] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                variant="primary"
                onClick={() => navigate("/")}
            >
                ← Retour au tableau de bord
            </button>
        </div>
    );
}

export default NotFound;
