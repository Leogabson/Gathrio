import { Router } from "express";
import {
  register,
  login,
  logout,
  forgotPasswordHandler,
  resetPasswordHandler,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPasswordHandler);
router.post("/reset-password", resetPasswordHandler);

export default router;
