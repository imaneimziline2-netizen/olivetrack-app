import { Router } from "express";
import { register, login } from "../auth/authController.js";
import { checkSingleAdmin } from "../admin/checkSingleAdmin.js";

const router = Router();



router.post("/register", checkSingleAdmin, register);

/**
 * @swagger
 * /api/users/auth/login:
 *   post:
 *     summary: Log in and receive a JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 token: { type: string }
 *                 user: { $ref: '#/components/schemas/User' }
 *       400: { description: Validation error }
 *       401: { description: Invalid email or password }
 */

router.post("/login", login);

export default router;
