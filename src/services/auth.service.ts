import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";
import { AppError } from "../middlewares/error-handler.middleware";

export class AuthService {
  async register(email: string, password: string, name?: string) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError("User with this email already exists", 409);
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: name || email.split("@")[0],
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    // Generate tokens
    const tokens = this.generateTokens(user.id, user.email);

    console.log(`✅ New user registered: ${email}`);

    return {
      user,
      ...tokens,
    };
  }

  async login(email: string, password: string) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash!);

    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    // Generate tokens
    const tokens = this.generateTokens(user.id, user.email);

    console.log(`✅ User logged in: ${email}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as { sub: string; email: string };

      // Generate new tokens
      const tokens = this.generateTokens(decoded.sub, decoded.email);

      return tokens;
    } catch (error) {
      throw new AppError("Invalid refresh token", 401);
    }
  }

  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  private generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    };
  }
}
