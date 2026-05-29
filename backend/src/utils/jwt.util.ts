import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET as string
  ) as TokenPayload;
};

// Email verification token (short-lived, separate secret optional)
interface EmailTokenPayload {
  userId: string;
}

export const generateEmailToken = (payload: EmailTokenPayload): string => {
  const secret = process.env.JWT_EMAIL_SECRET || process.env.JWT_SECRET;
  return jwt.sign(payload, secret as string, { expiresIn: "1d" });
};

export const verifyEmailToken = (token: string): EmailTokenPayload => {
  const secret = process.env.JWT_EMAIL_SECRET || process.env.JWT_SECRET;
  return jwt.verify(token, secret as string) as EmailTokenPayload;
};
