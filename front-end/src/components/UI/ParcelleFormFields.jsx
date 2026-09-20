import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VARIETES = ["Picholine Marocaine", "Haouzia", "Menara", "Arbequina", "Arbosana", "Koroneiki", "Picual", "Autre"];
const TYPES_IRRIGATION = ["Goutte-à-goutte", "Gravitaire", "Bour / Pluvial"];
const MODES_CULTURE = ["Traditionnel", "Intensif", "Super-intensif"];

function ParcelleFormFields({ initialData, onSubmit, loading, isEdit }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nom: initialData?.nom || "",
        superficie: initialData?.superficie || "",
        localisation: initialData?.localisation || "",
        variete: initialData?.variete || VARIETES[0],
        typeIrrigation: initialData?.typeIrrigation || TYPES_IRRIGATION[0],
        modeCulture: initialData?.modeCulture || MODES_CULTURE[0],
        nombreArbres: initialData?.nombreArbres || "",
        anneePlantation: initialData?.anneePlantation || new Date().getFullYear(),
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nom</label>
                <input
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    minLength={2}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Superficie (ha)</label>
                    <input
                        name="superficie"
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={formData.superficie}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Localisation</label>
                    <input
                        name="localisation"
                        value={formData.localisation}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Variété</label>
                    <select name="variete" value={formData.variete} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                        {VARIETES.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Irrigation</label>
                    <select name="typeIrrigation" value={formData.typeIrrigation} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                        {TYPES_IRRIGATION.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Mode de culture</label>
                    <select name="modeCulture" value={formData.modeCulture} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                        {MODES_CULTURE.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Nombre d'arbres</label>
                    <input
                        name="nombreArbres"
                        type="number"
                        min="1"
                        value={formData.nombreArbres}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Année de plantation</label>
                    <input
                        name="anneePlantation"
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        value={formData.anneePlantation}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => navigate("/parcelles")} className="border rounded-lg px-4 py-2 text-sm">
                    Annuler
                </button>
                <button type="submit" disabled={loading} className="bg-[#38b0a9] text-white rounded-lg px-4 py-2 text-sm disabled:opacity-50">
                    {loading ? "Enregistrement..." : isEdit ? "Enregistrer" : "Créer la parcelle"}
                </button>
            </div>
        </form>
    );
}

export default ParcelleFormFields;