import { Router } from "express";
import { getOne, update, remove } from "./recolteController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { paramIdCheck } from "../../middlewares/paramIdCheck.js";

const router = Router();

router.get("/:id", authMiddleware, paramIdCheck("id"), getOne);
router.put("/:id", authMiddleware, paramIdCheck("id"), update);
router.delete("/:id", authMiddleware, paramIdCheck("id"), remove);

export default router;