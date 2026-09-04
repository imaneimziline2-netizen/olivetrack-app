import { Router } from "express";
import { create, list, getOne, update, remove, getStock } from "./parcelleController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { checkOwnership } from "../../middlewares/ownershipMiddleware.js";
import Parcelle from "./parcelle.model.js";
import { create as createRecolte, list as listRecoltes  } from "../recoltes/recolteController.js";
import { create as createTrituration, list as listTriturations } from "../triturations/triturationController.js";
import { create as createVendu, list as listVentes } from "../ventes/venduController.js";
import { getRendementParcelle } from "../dashboard/dashboardController.js";


const router = Router();



router.post("/", authMiddleware, create);
router.get("/", authMiddleware, list);
router.get("/:id", authMiddleware, checkOwnership(Parcelle), getOne);
router.put("/:id", authMiddleware, checkOwnership(Parcelle), update);
router.delete("/:id", authMiddleware, checkOwnership(Parcelle), remove);

router.post("/:parcelleId/recoltes", authMiddleware,createRecolte );
router.get("/:parcelleId/recoltes", authMiddleware, listRecoltes);

router.get("/:id/stock", authMiddleware, checkOwnership(Parcelle), getStock);

router.post("/:parcelleId/triturations", authMiddleware, createTrituration);
router.get("/:parcelleId/triturations", authMiddleware, listTriturations);


router.post("/:parcelleId/ventes", authMiddleware, createVendu);
router.get("/:parcelleId/ventes", authMiddleware, listVentes);


router.get("/:id/rendement", authMiddleware, checkOwnership(Parcelle), getRendementParcelle);

export default router;