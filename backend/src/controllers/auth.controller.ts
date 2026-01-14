import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../services/auth.service";
import {
  validateRegistrationData,
  validateLoginData,
} from "../utils/validation.util";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, first_name, last_name, phone, role } = req.body;

    const validation = validateRegistrationData({
      email,
      password,
      first_name,
      last_name,
    });

    if (!validation.valid) {
      res.status(400).json({
        success: false,
        errors: validation.errors,
      });
      return;
    }

    const result = await registerUser({
      email,
      password,
      first_name,
      last_name,
      phone,
      role,
    });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Registration failed";
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const validation = validateLoginData({ email, password });

    if (!validation.valid) {
      res.status(400).json({
        success: false,
        errors: validation.errors,
      });
      return;
    }

    const result = await loginUser({ email, password });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Login failed";
    res.status(401).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("refreshToken");
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

export const forgotPasswordHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    const result = await forgotPassword(email);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to process request";
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const resetPasswordHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      res.status(400).json({
        success: false,
        message: "Token and password are required",
      });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
      return;
    }

    const result = await resetPassword(token, password);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to reset password";
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};
