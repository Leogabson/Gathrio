import prisma from "../config/database.config";
import { hashPassword, comparePassword } from "../utils/password.util";
import { generateAccessToken, generateRefreshToken, generateEmailToken, verifyEmailToken } from "../utils/jwt.util";
import { generateResetToken, hashResetToken } from "../utils/token.util";
import { emailService } from "../utils/email.util";

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
  const userRole = input.role === "organizer" ? "organizer" : "attendee";

  const user = await prisma.user.create({
    data: {
      email: input.email,
      password_hash: hashedPassword,
      first_name: input.first_name,
      last_name: input.last_name,
      phone: input.phone,
      role: userRole,
    },
  });

  const { password_hash, ...userWithoutPassword } = user;

  // Generate email verification token and send verification email
  try {
    const emailToken = generateEmailToken({ userId: user.id });
    await emailService.sendVerificationEmail(user.email, user.first_name || null, emailToken);
  } catch (err) {
    console.error("Failed to send verification email:", err);
  }

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

export const verifyEmail = async (token: string) => {
  try {
    const decoded = verifyEmailToken(token);
    const userId = decoded.userId;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("Invalid verification token");

    if (user.is_verified) {
      return { message: "Email already verified" };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { is_verified: true },
    });

    return { message: "Email verified successfully" };
  } catch (err) {
    throw new Error("Invalid or expired verification token");
  }
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

  // 📧 PRODUCTION: Send email with reset link
  // TODO: Implement email sending
  // const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  // await sendEmail({
  //   to: user.email,
  //   subject: 'Reset Your Gathrio Password',
  //   template: 'password-reset',
  //   data: { firstName: user.first_name, resetUrl }
  // });

  return {
    message: "Password reset link sent to your email",
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

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      first_name: true,
      last_name: true,
      phone: true,
      profile_photo_url: true,
      bio: true,
      role: true,
      is_verified: true,
      created_at: true,
      updated_at: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const findOrCreateOAuthUser = async ({
  provider,
  profile,
}: {
  provider: string;
  profile: any;
}) => {
  const email = profile?.emails?.[0]?.value;

  if (!email) {
    throw new Error("No email found from OAuth provider");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const { password_hash, ...userWithoutPassword } = existingUser;
    return userWithoutPassword;
  }

  const first_name =
    profile?.name?.givenName || profile?.displayName?.split(" ")?.[0] || null;
  const last_name =
    profile?.name?.familyName || profile?.displayName?.split(" ")?.slice(1).join(" ") || null;
  const profile_photo_url = profile?.photos?.[0]?.value || null;

  const user = await prisma.user.create({
    data: {
      email,
      password_hash: "", // OAuth users have no password
      first_name,
      last_name,
      profile_photo_url,
      role: "attendee",
    },
  });

  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
