import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button.jsx";
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
            <Button variant="primary" onClick={() => navigate("/")}>
                ← Retour au tableau de bord
            </Button>
        </div>
    );
}

export default NotFound;
