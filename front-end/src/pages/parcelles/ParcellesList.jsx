import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchParcelles, deleteParcelle } from "../../../store/slices/parcelleSlice.js";
import Card from "../../components/UI/Card.jsx";
import Button from "../../components/UI/Button.jsx";
import Modal from "../../components/UI/Modal.jsx";

function ParcellesList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { parcelles, loading, error } = useSelector((state) => state.parcelles);
    const [selectedParcelleToDelete, setSelectedParcelleToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchParcelles());
    }, [dispatch]);

    const handleDelete = async () => {
        if (!selectedParcelleToDelete) return;
        await dispatch(deleteParcelle(selectedParcelleToDelete._id));
        setSelectedParcelleToDelete(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Mes Parcelles Oléicoles 🌿
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Gérez vos parcelles, superficies, variétés et modes de culture
                    </p>
                </div>
                <Button
                    variant="primary"
                    onClick={() => navigate("/parcelles/new")}
                >
                    + Ajouter une Parcelle
                </Button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="py-16 text-center text-gray-400">
                    Chargement des parcelles...
                </div>
            ) : parcelles && parcelles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {parcelles.map((parcelle) => (
                        <Card
                            key={parcelle._id}
                            className="flex flex-col justify-between hover:shadow-md transition-shadow border-gray-100"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {parcelle.nom}
                                        </h3>
                                        <p className="text-xs text-[#059669] font-medium mt-0.5">
                                            📍 {parcelle.localisation}
                                        </p>
                                    </div>
                                    <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-[#059669] rounded-full">
                                        {parcelle.superficie} Ha
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-gray-100 my-2">
                                    <div>
                                        <span className="text-gray-400 block">Variété</span>
                                        <span className="font-semibold text-gray-700">
                                            {parcelle.variete}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block">Irrigation</span>
                                        <span className="font-semibold text-gray-700">
                                            {parcelle.typeIrrigation}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block">Mode de culture</span>
                                        <span className="font-semibold text-gray-700">
                                            {parcelle.modeCulture}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block">Nombre d'arbres</span>
                                        <span className="font-semibold text-gray-700">
                                            {parcelle.nombreArbres} oliviers
                                        </span>
                                    </div>
                                </div>

                                {parcelle.anneePlantation && (
                                    <p className="text-[11px] text-gray-400 mt-1">
                                        Plantée en {parcelle.anneePlantation}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-gray-100">
                                <Button
                                    variant="outline"
                                    onClick={() => navigate(`/parcelles/${parcelle._id}`)}
                                    className="flex-1 text-xs py-2"
                                >
                                    Stock & Détails
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => navigate(`/parcelles/${parcelle._id}/edit`)}
                                    className="text-xs py-2 px-3"
                                    title="Modifier"
                                >
                                    ✏️
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => setSelectedParcelleToDelete(parcelle)}
                                    className="text-xs py-2 px-3"
                                    title="Supprimer"
                                >
                                    🗑️
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 p-8">
                    <span className="text-4xl">🌱</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-3">
                        Aucune parcelle pour le moment
                    </h3>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
                        Commencez par ajouter votre première parcelle pour enregistrer des récoltes et calculer vos rendements.
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => navigate("/parcelles/new")}
                        className="mt-4 text-xs"
                    >
                        + Créer ma première parcelle
                    </Button>
                </div>
            )}

            {/* Confirm Delete Modal */}
            <Modal
                isOpen={!!selectedParcelleToDelete}
                onClose={() => setSelectedParcelleToDelete(null)}
                title="Confirmer la suppression"
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Êtes-vous sûr de vouloir supprimer la parcelle{" "}
                        <strong className="text-gray-900">
                            {selectedParcelleToDelete?.nom}
                        </strong>{" "}
                        ? Cette action est irréversible et supprimera également son stock associé.
                    </p>
                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            variant="secondary"
                            onClick={() => setSelectedParcelleToDelete(null)}
                            className="text-xs"
                        >
                            Annuler
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            className="text-xs"
                        >
                            Supprimer
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ParcellesList;
