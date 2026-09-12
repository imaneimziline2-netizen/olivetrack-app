import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchParcelles } from "../../../store/slices/parcelleSlice.js";
import { createRecolte } from "../../../store/slices/recolteSlice.js";
import Card from "../../components/UI/Card.jsx";
import Button from "../../components/UI/Button.jsx";
import Input from "../../components/UI/Input.jsx";

function RecolteForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { parcelles } = useSelector((state) => state.parcelles);
    const { loading, error } = useSelector((state) => state.recoltes);

    const initialParcelle = searchParams.get("parcelleId") || "";
    const today = new Date().toISOString().split("T")[0];

    const [userParcelleId, setUserParcelleId] = useState(initialParcelle);
    const [formData, setFormData] = useState({
        date: today,
        quantiteOlives: "",
    });

    const [formError, setFormError] = useState("");

    useEffect(() => {
        dispatch(fetchParcelles());
    }, [dispatch]);

    const activeParcelleId = userParcelleId || parcelles?.[0]?._id || "";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");

        if (!activeParcelleId) {
            setFormError("Veuillez sélectionner une parcelle");
            return;
        }

        const payload = {
            date: formData.date,
            quantiteOlives: Number(formData.quantiteOlives),
        };

        const result = await dispatch(
            createRecolte({ parcelleId: activeParcelleId, data: payload })
        );

        if (createRecolte.fulfilled.match(result)) {
            navigate("/recoltes");
        } else {
            setFormError(result.payload || "Erreur lors de l'enregistrement de la récolte");
        }
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <button
                onClick={() => navigate("/recoltes")}
                className="text-xs font-semibold text-[#059669] hover:text-[#047857] inline-flex items-center gap-1 cursor-pointer"
            >
                ← Annuler et retourner aux récoltes
            </button>

            <Card
                title="Enregistrer une Récolte 🧺"
                subtitle="La quantité d'olives récoltées alimentera automatiquement le stock de la parcelle"
            >
                {(formError || error) && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                        {formError || error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                            Parcelle récoltée *
                        </label>
                        <select
                            value={activeParcelleId}
                            onChange={(e) => setUserParcelleId(e.target.value)}
                            className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm bg-gray-50/50 text-gray-900 outline-none focus:bg-white focus:border-[#059669] cursor-pointer"
                            required
                        >
                            <option value="">-- Choisir une parcelle --</option>
                            {parcelles.map((p) => (
                                <option key={p._id} value={p._id}>
                                    {p.nom} ({p.variete})
                                </option>
                            ))}
                        </select>
                    </div>

                    <Input
                        label="Date de récolte"
                        name="date"
                        type="date"
                        max={today}
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Quantité d'olives récoltées (kg)"
                        name="quantiteOlives"
                        type="number"
                        min="1"
                        step="1"
                        placeholder="ex: 1200"
                        value={formData.quantiteOlives}
                        onChange={handleChange}
                        required
                    />

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button
                            variant="secondary"
                            onClick={() => navigate("/recoltes")}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                        >
                            {loading ? "Enregistrement..." : "Valider la récolte"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default RecolteForm;
