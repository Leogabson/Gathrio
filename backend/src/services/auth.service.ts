import prisma from "../config/database.config";
import { hashPassword, comparePassword } from "../utils/password.util";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util";
import { generateResetToken, hashResetToken } from "../utils/token.util";

interface RegisterInput {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const registerUser = async (input: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      password_hash: hashedPassword,
      first_name: input.first_name,
      last_name: input.last_name,
      phone: input.phone,
      role: input.role || "attendee",
    },
  });

  const { password_hash, ...userWithoutPassword } = user;

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

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

export const loginUser = async (input: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(
    input.password,
    user.password_hash
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const { password_hash, ...userWithoutPassword } = user;

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

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

export const forgotPassword = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("No user found with this email address");
  }

  const resetToken = generateResetToken();
  const hashedToken = hashResetToken(resetToken);
  const tokenExpiry = new Date(Date.now() + 3600000);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      reset_token: hashedToken,
      reset_token_expiry: tokenExpiry,
    },
  });

  return {
    message: "Password reset link sent to your email",
    resetToken,
  };
};

export const resetPassword = async (token: string, newPassword: string) => {
  const hashedToken = hashResetToken(token);

  const user = await prisma.user.findFirst({
    where: {
      reset_token: hashedToken,
      reset_token_expiry: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new Error("Invalid or expired reset token");
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password_hash: hashedPassword,
      reset_token: null,
      reset_token_expiry: null,
    },
  });

  return {
    message: "Password reset successfully",
  };
};
