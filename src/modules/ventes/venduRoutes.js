import { Router } from "express";
import { getOne, remove } from "./venduController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/:id", authMiddleware, getOne);
router.delete("/:id", authMiddleware, remove);

export default router;