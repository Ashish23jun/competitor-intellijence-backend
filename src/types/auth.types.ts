/**
 * Authentication Types
 */

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RefreshTokenInput {
  refreshToken: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface UserPayload {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
}

export interface AuthResponse extends AuthTokens {
  user: UserPayload;
}

export interface JWTPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}
