import { Router } from "express";
import { getDashboard } from "./dashboardController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getDashboard);

export default router;