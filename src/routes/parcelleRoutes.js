import { Router } from "express";
import { create, list, getOne, update, remove } from "../controllers/parcelleController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkOwnership } from "../middlewares/ownershipMiddleware.js";
import Parcelle from "../models/parcelle.model.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", authMiddleware, list);
router.get("/:id", authMiddleware, checkOwnership(Parcelle), getOne);
router.put("/:id", authMiddleware, checkOwnership(Parcelle), update);
router.delete("/:id", authMiddleware, checkOwnership(Parcelle), remove);

export default router;