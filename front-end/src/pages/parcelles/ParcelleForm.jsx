import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    createParcelle,
    updateParcelle,
    fetchParcelleById,
    clearCurrentParcelle,
} from "../../../store/slices/parcelleSlice.js";
import ParcelleFormFields from "../../components/UI/ParcelleFormFields.jsx";

function ParcelleForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentParcelle, loading, error } = useSelector((state) => state.parcelles);

    useEffect(() => {
        if (isEdit) {
            dispatch(fetchParcelleById(id));
        }
        return () => {
            dispatch(clearCurrentParcelle());
        };
    }, [dispatch, id, isEdit]);

    const handleSubmit = async (formData) => {
        const payload = {
            ...formData,
            superficie: Number(formData.superficie),
            nombreArbres: Number(formData.nombreArbres),
            anneePlantation: Number(formData.anneePlantation),
        };

        const result = isEdit
            ? await dispatch(updateParcelle({ id, data: payload }))
            : await dispatch(createParcelle(payload));

        const actionCreator = isEdit ? updateParcelle : createParcelle;

        if (actionCreator.fulfilled.match(result)) {
            navigate(isEdit ? `/parcelles/${id}` : "/parcelles");
        }
    };

    if (isEdit && !currentParcelle) {
        return (
            <div className="p-6 max-w-2xl mx-auto">
                <p className="text-gray-400">Chargement...</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <button onClick={() => navigate("/parcelles")} className="text-sm text-green-700 mb-4">
                ← Retour
            </button>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h1 className="text-xl font-bold mb-4">
                    {isEdit ? "Modifier la parcelle" : "Nouvelle parcelle"}
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <ParcelleFormFields
                    key={isEdit ? currentParcelle?._id : "new"}
                    initialData={isEdit ? currentParcelle : null}
                    onSubmit={handleSubmit}
                    loading={loading}
                    isEdit={isEdit}
                />
            </div>
        </div>
    );
}

export default ParcelleForm;