import { useDispatch, useSelector } from "react-redux";
import DEFAULT_AVATAR from "../../assets/fermier-avatar.jpg";
import { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../../../store/slices/authSlice";

function Profile() {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [editFormData, setEditFormData] = useState({
        nom: "",
        email: "",
        telephone: "",
        region: "",
    });

    const handleOpenEdit = () => {
        setEditFormData({
            nom: user?.nom || "",
            email: user?.email || "",
            telephone: user?.telephone || "",
            region: user?.region || "",
        });

        setIsEditModalOpen(true);
    };

    const handleCloseEdit = () => {
        setIsEditModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEditFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(updateProfile(editFormData)).unwrap();

            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Erreur update profile :", error);
        }
    };

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Mon Profil
            </h1>

            <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8">
                    <div className="flex items-center gap-4 sm:gap-5">
                        <img
                            src={DEFAULT_AVATAR}
                            alt={user?.nom || "Nom de l'utilisateur"}
                            className="w-18 h-18 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-200 shadow-sm shrink-0"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    user?.nom || "Hassan El Mansouri",
                                )}&background=059669&color=fff`;
                            }}
                        />

                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                {user?.nom || "Hassan El Mansouri"}
                            </h2>

                            <p className="text-xs sm:text-sm text-gray-400 mt-1">
                                {user?.role || "Agriculteur"}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleOpenEdit}
                        className="bg-[#059669] hover:bg-[#047857] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors self-start sm:self-center"
                    >
                        Modifier
                    </button>
                </div>

                <div className="space-y-2.5">
                    <div className="bg-[#f8f9fa] rounded-xl px-5 sm:px-6 py-3.5 flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-400">Nom complet</span>

                        <span className="text-gray-900 font-semibold">
                            {user?.nom || "Hassan El Mansouri"}
                        </span>
                    </div>

                    <div className="bg-[#f8f9fa] rounded-xl px-5 sm:px-6 py-3.5 flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-400">Email</span>

                        <span className="text-gray-900 font-semibold">
                            {user?.email || "hassan.elmansouri@olivegrove.ma"}
                        </span>
                    </div>

                    <div className="bg-[#f8f9fa] rounded-xl px-5 sm:px-6 py-3.5 flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-400">Téléphone</span>

                        <span className="text-gray-900 font-semibold">
                            {user?.telephone || "+212 6 12 34 56 78"}
                        </span>
                    </div>

                    {/* Région */}
                    <div className="bg-[#f8f9fa] rounded-xl px-5 sm:px-6 py-3.5 flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-400">Région</span>

                        <span className="text-gray-900 font-semibold">
                            {user?.region || "Béni Mellal-Khénifra"}
                        </span>
                    </div>

                    <div className="bg-[#f8f9fa] rounded-xl px-5 sm:px-6 py-3.5 flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-400">Rôle</span>

                        <span className="text-gray-900 font-semibold">
                            {user?.role || "Agriculteur"}
                        </span>
                    </div>
                </div>

                {/* Password section */}
                <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">
                            Mot de passe
                        </h4>

                        <p className="text-xs text-gray-400 mt-1">
                            Votre mot de passe est protégé.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg transition-colors self-start sm:self-auto"
                    >
                        Modifier le mot de passe
                    </button>
                </div>
            </div>

            {/* Modal Modifier Profil */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
                        {/* Header modal */}
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-gray-900">
                                Modifier mon profil
                            </h2>

                            <button
                                type="button"
                                onClick={handleCloseEdit}
                                className="text-gray-500 hover:text-gray-900 text-xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nom */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom complet
                                </label>

                                <input
                                    type="text"
                                    name="nom"
                                    value={editFormData.nom}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={editFormData.email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={handleCloseEdit}
                                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
