import { Router } from "express";
import {
  register,
  login,
  logout,
  forgotPasswordHandler,
  resetPasswordHandler,
  me,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPasswordHandler);
router.post("/reset-password", resetPasswordHandler);
router.get("/me", authenticate, me);

export default router;
