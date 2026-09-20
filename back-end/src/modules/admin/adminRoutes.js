import { Router } from "express";
import { list, getOne, stats } from "./adminController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { requireRole } from "../../middlewares/roleMiddleware.js";

const router = Router();

router.use(authMiddleware, requireRole("admin")); 

router.get("/users", list);
router.get("/users/:id", getOne);
router.get("/stats", stats);

export default router;