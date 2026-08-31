import { Router } from "express";
import { myProfile, updateMyProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = Router();

router.get("/me", authMiddleware, myProfile);
router.put("/me", authMiddleware, updateMyProfile);

export default router;