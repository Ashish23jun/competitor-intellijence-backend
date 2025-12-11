import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { registerSchema, loginSchema, refreshTokenSchema } from '../schemas/auth.schemas';

const router = Router();
const authController = new AuthController();

// Public routes
router.post(
  '/register',
  validateBody(registerSchema),
  authController.register.bind(authController)
);

router.post('/login', validateBody(loginSchema), authController.login.bind(authController));

router.post(
  '/refresh',
  validateBody(refreshTokenSchema),
  authController.refresh.bind(authController)
);

// Protected routes
router.get('/me', authenticate, authController.getProfile.bind(authController));

export default router;
