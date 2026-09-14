import { Router } from "express";
import { getDashboard, getMonthlyYield } from "./dashboardController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getDashboard);
router.get("/monthly", authMiddleware, getMonthlyYield);


export default router;