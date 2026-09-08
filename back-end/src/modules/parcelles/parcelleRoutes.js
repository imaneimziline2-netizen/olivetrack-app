import { Router } from "express";
import {
    create,
    list,
    getOne,
    update,
    remove,
    getStock,
} from "./parcelleController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { checkOwnership } from "../../middlewares/ownershipMiddleware.js";
import { checkParcelleAccess } from "./parcelleAccessMiddleware.js";
import Parcelle from "./parcelle.model.js";
import {
    create as createRecolte,
    list as listRecoltes,
} from "../recoltes/recolteController.js";
import {
    create as createTrituration,
    list as listTriturations,
} from "../triturations/triturationController.js";
import {
    create as createVendu,
    list as listVentes,
} from "../ventes/venduController.js";
import { getRendementParcelle } from "../dashboard/dashboardController.js";
import { paramIdCheck } from "../../middlewares/paramIdCheck.js";

const router = Router();

router.use(authMiddleware);

router.post("/", create);
router.get("/", list);
router.get("/:id", paramIdCheck("id"), checkOwnership(Parcelle), getOne);
router.put("/:id", paramIdCheck("id"), checkOwnership(Parcelle), update);
router.delete("/:id", paramIdCheck("id"), checkOwnership(Parcelle), remove);

router.post(
    "/:parcelleId/recoltes",
    paramIdCheck("parcelleId"),
    checkParcelleAccess("parcelleId"),
    createRecolte,
);
router.get(
    "/:parcelleId/recoltes",
    paramIdCheck("parcelleId"),
    checkParcelleAccess("parcelleId"),
    listRecoltes,
);

router.get(
    "/:id/stock",
    paramIdCheck("id"),
    checkOwnership(Parcelle),
    getStock,
);

router.post(
    "/:parcelleId/triturations",
    paramIdCheck("parcelleId"),
    checkParcelleAccess("parcelleId"),
    createTrituration,
);
router.get(
    "/:parcelleId/triturations",
    paramIdCheck("parcelleId"),
    checkParcelleAccess("parcelleId"),
    listTriturations,
);

router.post(
    "/:parcelleId/ventes",
    paramIdCheck("parcelleId"),
    checkParcelleAccess("parcelleId"),
    createVendu,
);
router.get(
    "/:parcelleId/ventes",
    paramIdCheck("parcelleId"),
    checkParcelleAccess("parcelleId"),
    listVentes,
);

router.get(
    "/:id/rendement",
    paramIdCheck("id"),
    checkOwnership(Parcelle),
    getRendementParcelle,
);

export default router;
