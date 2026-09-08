import { Router } from "express";
import { getOne, remove } from "./venduController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { checkVenduAccess } from "./venduAccessMiddleware.js";
import { paramIdCheck } from "../../middlewares/paramIdCheck.js";

const router = Router();

router.get("/:id", authMiddleware, paramIdCheck("id"), checkVenduAccess("id"), getOne);
router.delete("/:id", authMiddleware, paramIdCheck("id"), checkVenduAccess("id"), remove);

export default router;