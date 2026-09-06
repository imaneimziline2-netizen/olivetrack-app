import { Router } from "express";
import { getOne, remove } from "./triturationController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { checkTriturationAccess } from "./triturationAccessMiddleware.js";
import { paramIdCheck } from "../../middlewares/paramIdCheck.js";

const router = Router();

router.get("/:id", authMiddleware, paramIdCheck("id"), checkTriturationAccess("id"), getOne);
router.delete("/:id", authMiddleware, paramIdCheck("id"), checkTriturationAccess("id"), remove);

export default router;