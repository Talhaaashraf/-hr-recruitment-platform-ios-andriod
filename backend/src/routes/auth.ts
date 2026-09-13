// src/routes/auth.ts
import { Router } from "express";
import { signup, login, getMe } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected route
router.get("/me", protect, getMe);

export default router;
