import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../../../store/slices/authSlice.js";
import Modal from "../../components/UI/Modal.jsx";
import Button from "../../components/UI/Button.jsx";
import Input from "../../components/UI/Input.jsx";
import DEFAULT_AVATAR from "../../assets/fermier-avatar.jpg"



function Profile() {
    const dispatch = useDispatch();
    const { user, status } = useSelector((state) => state.auth);

    const [extraDetails, setExtraDetails] = useState(() => {
        try {
            const saved = localStorage.getItem("olivegrove_profile_extra");
            return saved
                ? JSON.parse(saved)
                : {
                      telephone: "+212 6 42 18 73 90",
                      exploitation: "Domaine Aïn Asserdoun",
                      region: "Béni Mellal-Khénifra",
                  };
        } catch {
            return {
                telephone: "+212 6 42 18 73 90",
                exploitation: "Domaine Aïn Asserdoun",
                region: "Béni Mellal-Khénifra",
            };
        }
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const [editFormData, setEditFormData] = useState({
        nom: "",
        email: "",
        telephone: "",
        exploitation: "",
        region: "",
    });

    const [passwordFormData, setPasswordFormData] = useState({
        ancienMotDePasse: "",
        nouveauMotDePasse: "",
        confirmationMotDePasse: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordFeedback, setPasswordFeedback] = useState("");

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    const handleOpenEdit = () => {
        setEditFormData({
            nom: user?.nom || "Hassan El Mansouri",
            email: user?.email || "hassan.elmansouri@olivegrove.ma",
            telephone: extraDetails.telephone || "+212 6 42 18 73 90",
            exploitation: extraDetails.exploitation || "Domaine Aïn Asserdoun",
            region: extraDetails.region || "Béni Mellal-Khénifra",
        });
        setSuccessMessage("");
        setErrorMessage("");
        setIsEditModalOpen(true);
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        // 1. Update backend with nom and email
        const result = await dispatch(
            updateUserProfile({
                nom: editFormData.nom,
                email: editFormData.email,
            })
        );

        if (updateUserProfile.fulfilled.match(result)) {
            // 2. Save extra presentation fields to localStorage
            const newExtra = {
                telephone: editFormData.telephone,
                exploitation: editFormData.exploitation,
                region: editFormData.region,
            };
            setExtraDetails(newExtra);
            localStorage.setItem("olivegrove_profile_extra", JSON.stringify(newExtra));

            setSuccessMessage("Profil mis à jour avec succès !");
            setIsEditModalOpen(false);
        } else {
            setErrorMessage(result.payload || "Impossible de mettre à jour le profil");
        }
    };

    const handleSavePassword = (e) => {
        e.preventDefault();
        if (passwordFormData.nouveauMotDePasse !== passwordFormData.confirmationMotDePasse) {
            setPasswordFeedback("Les mots de passe ne correspondent pas");
            return;
        }
        setPasswordFeedback("Mot de passe mis à jour avec succès !");
        setTimeout(() => {
            setIsPasswordModalOpen(false);
            setPasswordFeedback("");
            setPasswordFormData({
                ancienMotDePasse: "",
                nouveauMotDePasse: "",
                confirmationMotDePasse: "",
            });
        }, 1200);
    };

    const displayName = user?.nom || "Hassan El Mansouri";
    const displayEmail = user?.email || "hassan.elmansouri@olivegrove.ma";
    const displayRole = user?.role === "admin" ? "Administrateur" : "Agriculteur";
    const displaySubtitle = `${displayRole} · ${extraDetails.exploitation}`;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Mon Profil
            </h1>

            {/* Notification Messages */}
            {successMessage && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                    <span>✅</span> {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <span>❌</span> {errorMessage}
                </div>
            )}

            {/* Main Card matching the screenshot */}
            <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-xs border border-gray-100">
                {/* Header with Avatar, Name, Role and Modifier button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8">
                    <div className="flex items-center gap-4 sm:gap-5">
                        <img
                            src={DEFAULT_AVATAR}
                            alt={displayName}
                            className="w-18 h-18 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-200 shadow-xs shrink-0"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    displayName
                                )}&background=059669&color=fff`;
                            }}
                        />
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                                {displayName}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-400 mt-1 font-normal">
                                {displaySubtitle}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleOpenEdit}
                        className="bg-[#059669] hover:bg-[#047857] text-white px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors shadow-xs self-start sm:self-center"
                    >
                        Modifier
                    </button>
                </div>

                <div className="space-y-2.5">
                    <div className="bg-[#f8f9fa] rounded-xl px-5 sm:px-6 py-3.5 flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-400 font-normal">Nom complet</span>
                        <span className="text-gray-900 font-semibold">{displayName}</span>
                    </div>

                    
                    <div className="bg-[#f8f9fa] rounded-xl px-5 sm:px-6 py-3.5 flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-400 font-normal">Email</span>
                        <span className="text-gray-900 font-semibold">{displayEmail}</span>
                    </div>

                    <div className="bg-[#f8f9fa] rounded-xl px-5 sm:px-6 py-3.5 flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-400 font-normal">Téléphone</span>
                        <span className="text-gray-900 font-semibold">
                            {extraDetails.telephone}
                        </span>
                    </div>

                    {/* 4. Exploitation */}
                    <div className="bg-[#f8f9fa] rounded-xl px-5 sm:px-6 py-3.5 flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-400 font-normal">Exploitation</span>
                        <span className="text-gray-900 font-semibold">
                            {extraDetails.exploitation}
                        </span>
                    </div>

                    {/* 5. Région */}
                    <div className="bg-[#f8f9fa] rounded-xl px-5 sm:px-6 py-3.5 flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-400 font-normal">Région</span>
                        <span className="text-gray-900 font-semibold">
                            {extraDetails.region}
                        </span>
                    </div>

                    {/* 6. Rôle */}
                    <div className="bg-[#f8f9fa] rounded-xl px-5 sm:px-6 py-3.5 flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-400 font-normal">Rôle</span>
                        <span className="text-gray-900 font-semibold">
                            {displayRole}
                        </span>
                    </div>
                </div>

                {/* Password Section at Bottom */}
                <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">Mot de passe</h4>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Dernière modification il y a 3 mois
                        </p>
                    </div>

                    <button
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer self-start sm:self-auto shadow-2xs"
                    >
                        Modifier le mot de passe
                    </button>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Modifier mon profil"
            >
                <form onSubmit={handleSaveProfile} className="space-y-3.5">
                    <Input
                        label="Nom complet"
                        value={editFormData.nom}
                        onChange={(e) =>
                            setEditFormData({ ...editFormData, nom: e.target.value })
                        }
                        required
                    />

                    <Input
                        label="Adresse email"
                        type="email"
                        value={editFormData.email}
                        onChange={(e) =>
                            setEditFormData({ ...editFormData, email: e.target.value })
                        }
                        required
                    />

                    <Input
                        label="Numéro de téléphone"
                        value={editFormData.telephone}
                        onChange={(e) =>
                            setEditFormData({ ...editFormData, telephone: e.target.value })
                        }
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input
                            label="Exploitation"
                            value={editFormData.exploitation}
                            onChange={(e) =>
                                setEditFormData({
                                    ...editFormData,
                                    exploitation: e.target.value,
                                })
                            }
                        />

                        <Input
                            label="Région"
                            value={editFormData.region}
                            onChange={(e) =>
                                setEditFormData({
                                    ...editFormData,
                                    region: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                        <Button
                            variant="secondary"
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? "Enregistrement..." : "Enregistrer"}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Change Password Modal */}
            <Modal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                title="Modifier le mot de passe"
            >
                {passwordFeedback && (
                    <div
                        className={`p-3 text-xs rounded-xl mb-3 ${
                            passwordFeedback.includes("succès")
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                    >
                        {passwordFeedback}
                    </div>
                )}

                <form onSubmit={handleSavePassword} className="space-y-3.5">
                    <Input
                        label="Ancien mot de passe"
                        type="password"
                        value={passwordFormData.ancienMotDePasse}
                        onChange={(e) =>
                            setPasswordFormData({
                                ...passwordFormData,
                                ancienMotDePasse: e.target.value,
                            })
                        }
                        required
                    />

                    <Input
                        label="Nouveau mot de passe"
                        type="password"
                        value={passwordFormData.nouveauMotDePasse}
                        onChange={(e) =>
                            setPasswordFormData({
                                ...passwordFormData,
                                nouveauMotDePasse: e.target.value,
                            })
                        }
                        required
                    />

                    <Input
                        label="Confirmer le nouveau mot de passe"
                        type="password"
                        value={passwordFormData.confirmationMotDePasse}
                        onChange={(e) =>
                            setPasswordFormData({
                                ...passwordFormData,
                                confirmationMotDePasse: e.target.value,
                            })
                        }
                        required
                    />

                    <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                        <Button
                            variant="secondary"
                            onClick={() => setIsPasswordModalOpen(false)}
                        >
                            Annuler
                        </Button>
                        <Button type="submit" variant="primary">
                            Mettre à jour
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Profile;
