import { Router } from "express";
import { getDashboard, getMonthlyYield, getRendementDashboardParcelles } from "./dashboardController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getDashboard);
router.get("/monthly", authMiddleware, getMonthlyYield);
router.get("/rendement/:id", authMiddleware, getRendementDashboardParcelles);


export default router;