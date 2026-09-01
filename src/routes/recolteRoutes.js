import { Router } from "express";
import { getOne, update, remove } from "../controllers/recolteController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/:id", authMiddleware, getOne);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);

export default router;
