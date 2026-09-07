import { Router } from "express";
import { list, getOne } from "./adminController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { requireRole } from "../../middlewares/roleMiddleware.js";

const router = Router();

router.use(authMiddleware, requireRole("admin")); 

router.get("/users", list);
router.get("/users/:id", getOne);

export default router;