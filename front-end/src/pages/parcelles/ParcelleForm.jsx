import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    createParcelle,
    updateParcelle,
    fetchParcelleById,
} from "../../../store/slices/parcelleSlice.js";
import Card from "../../components/UI/Card.jsx";
import Button from "../../components/UI/Button.jsx";
import Input from "../../components/UI/Input.jsx";

const VARIETES = [
    "Picholine Marocaine",
    "Haouzia",
    "Menara",
    "Arbequina",
    "Arbosana",
    "Koroneiki",
    "Picual",
    "Autre",
];

const MODES_CULTURE = ["Traditionnel", "Intensif", "Super-intensif"];
const TYPES_IRRIGATION = ["Goutte-à-goutte", "Gravitaire", "Bour / Pluvial"];

function ParcelleFormFields({ initialData, onSubmit, loading, error, isEdit, onCancel }) {
    const [formData, setFormData] = useState({
        nom: initialData?.nom || "",
        superficie: initialData?.superficie || "",
        localisation: initialData?.localisation || "",
        variete: initialData?.variete || "Picholine Marocaine",
        typeIrrigation: initialData?.typeIrrigation || "Goutte-à-goutte",
        modeCulture: initialData?.modeCulture || "Traditionnel",
        nombreArbres: initialData?.nombreArbres || "",
        anneePlantation: initialData?.anneePlantation || new Date().getFullYear(),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Card
            title={isEdit ? "Modifier la Parcelle" : "Enregistrer une Nouvelle Parcelle"}
            subtitle="Renseignez les caractéristiques techniques de la parcelle"
        >
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Nom de la parcelle"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="ex: Parcelle Olivier Haut"
                    required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Superficie (en Hectares)"
                        name="superficie"
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={formData.superficie}
                        onChange={handleChange}
                        placeholder="ex: 2.5"
                        required
                    />

                    <Input
                        label="Localisation"
                        name="localisation"
                        value={formData.localisation}
                        onChange={handleChange}
                        placeholder="ex: Marrakech - Route d'Ourika"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                            Variété *
                        </label>
                        <select
                            name="variete"
                            value={formData.variete}
                            onChange={handleChange}
                            className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm bg-gray-50/50 text-gray-900 outline-none focus:bg-white focus:border-[#059669] cursor-pointer"
                            required
                        >
                            {VARIETES.map((v) => (
                                <option key={v} value={v}>
                                    {v}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                            Irrigation *
                        </label>
                        <select
                            name="typeIrrigation"
                            value={formData.typeIrrigation}
                            onChange={handleChange}
                            className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm bg-gray-50/50 text-gray-900 outline-none focus:bg-white focus:border-[#059669] cursor-pointer"
                            required
                        >
                            {TYPES_IRRIGATION.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                            Mode Culture *
                        </label>
                        <select
                            name="modeCulture"
                            value={formData.modeCulture}
                            onChange={handleChange}
                            className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm bg-gray-50/50 text-gray-900 outline-none focus:bg-white focus:border-[#059669] cursor-pointer"
                            required
                        >
                            {MODES_CULTURE.map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Nombre d'arbres"
                        name="nombreArbres"
                        type="number"
                        min="1"
                        value={formData.nombreArbres}
                        onChange={handleChange}
                        placeholder="ex: 500"
                        required
                    />

                    <Input
                        label="Année de plantation"
                        name="anneePlantation"
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        value={formData.anneePlantation}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <Button
                        variant="secondary"
                        onClick={onCancel}
                    >
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    >
                        {loading ? "Enregistrement..." : isEdit ? "Enregistrer les modifications" : "Créer la parcelle"}
                    </Button>
                </div>
            </form>
        </Card>
    );
}

function ParcelleForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentParcelle, loading, error } = useSelector((state) => state.parcelles);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (isEdit) {
            dispatch(fetchParcelleById(id));
        }
    }, [dispatch, id, isEdit]);

    const handleFormSubmit = async (formData) => {
        setFormError("");

        const payload = {
            ...formData,
            superficie: Number(formData.superficie),
            nombreArbres: Number(formData.nombreArbres),
            anneePlantation: Number(formData.anneePlantation),
        };

        try {
            if (isEdit) {
                const result = await dispatch(updateParcelle({ id, data: payload }));
                if (updateParcelle.fulfilled.match(result)) {
                    navigate(`/parcelles/${id}`);
                } else {
                    setFormError(result.payload || "Erreur de modification");
                }
            } else {
                const result = await dispatch(createParcelle(payload));
                if (createParcelle.fulfilled.match(result)) {
                    navigate("/parcelles");
                } else {
                    setFormError(result.payload || "Erreur de création");
                }
            }
        } catch {
            setFormError("Une erreur inattendue est survenue");
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <button
                onClick={() => navigate("/parcelles")}
                className="text-xs font-semibold text-[#059669] hover:text-[#047857] inline-flex items-center gap-1 cursor-pointer"
            >
                ← Annuler et retourner aux parcelles
            </button>

            {isEdit && !currentParcelle ? (
                <div className="py-12 text-center text-gray-400">
                    Chargement de la parcelle...
                </div>
            ) : (
                <ParcelleFormFields
                    key={isEdit ? currentParcelle?._id : "new"}
                    initialData={isEdit ? currentParcelle : null}
                    onSubmit={handleFormSubmit}
                    loading={loading}
                    error={formError || error}
                    isEdit={isEdit}
                    onCancel={() => navigate("/parcelles")}
                />
            )}
        </div>
    );
}

export default ParcelleForm;
