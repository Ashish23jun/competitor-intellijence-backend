import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ResponseHandler } from '../utils/response/response.handler';
import { RegisterInput, LoginInput, RefreshTokenInput } from '../schemas/auth.schemas';

const authService = new AuthService();

export class AuthController {
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 format: password
   *               name:
   *                 type: string
   *     responses:
   *       201:
   *         description: User successfully registered
   *       409:
   *         description: User already exists
   */
  async register(req: Request, res: Response) {
    const { email, password, name } = req.body as RegisterInput;
    const result = await authService.register(email, password, name);
    return ResponseHandler.created(res, result, 'User registered successfully');
  }

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Login with email and password
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 format: password
   *     responses:
   *       200:
   *         description: User successfully logged in
   *       401:
   *         description: Invalid credentials
   */
  async login(req: Request, res: Response) {
    const { email, password } = req.body as LoginInput;
    const result = await authService.login(email, password);
    return ResponseHandler.success(res, result, 'Login successful');
  }

  /**
   * @swagger
   * /auth/refresh:
   *   post:
   *     summary: Refresh access token
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - refreshToken
   *             properties:
   *               refreshToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: Token successfully refreshed
   *       401:
   *         description: Invalid refresh token
   */
  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body as RefreshTokenInput;
    const result = await authService.refreshToken(refreshToken);
    return ResponseHandler.success(res, result, 'Token refreshed successfully');
  }

  /**
   * @swagger
   * /auth/me:
   *   get:
   *     summary: Get current user profile
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Current user profile
   *       401:
   *         description: Unauthorized
   */
  async getProfile(req: AuthRequest, res: Response) {
    const result = await authService.getUserById(req.user!.id);
    return ResponseHandler.success(res, result, 'Profile retrieved successfully');
  }
}
