import { Router } from "express";
import { register, login } from "../auth/authController.js";
import { checkSingleAdmin } from "../admin/checkSingleAdmin.js";

const router = Router();

router.post("/register", checkSingleAdmin, register);
router.post("/login", login);
// router.post("/logout", logout);

export default router;
