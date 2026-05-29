import { Router } from "express";
const passport: any = require("passport");
import {
  register,
  login,
  logout,
  forgotPasswordHandler,
  resetPasswordHandler,
  me,
  verifyEmailHandler,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPasswordHandler);
router.post("/reset-password", resetPasswordHandler);
router.get("/me", authenticate, me);

// Email verification
router.get("/verify-email", verifyEmailHandler);

// OAuth: Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:3000"}/signin`,
  }),
  (req, res) => {
    const user = (req as any).user as any;
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const redirectUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/signin?accessToken=${accessToken}`;
    res.redirect(redirectUrl);
  }
);

// OAuth: LinkedIn
router.get(
  "/linkedin",
  passport.authenticate("linkedin", { scope: ["r_liteprofile", "r_emailaddress"] })
);

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:3000"}/signin`,
  }),
  (req, res) => {
    const user = (req as any).user as any;
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const redirectUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/signin?accessToken=${accessToken}`;
    res.redirect(redirectUrl);
  }
);

export default router;
