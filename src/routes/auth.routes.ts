import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import {
  registerValidation,
  loginValidation,
  refreshTokenValidation,
} from '../validators/auth.validators';

const router = Router();
const authController = new AuthController();

// Public routes
router.post(
  '/register',
  validate(registerValidation),
  authController.register.bind(authController)
);

router.post(
  '/login',
  validate(loginValidation),
  authController.login.bind(authController)
);

router.post(
  '/refresh',
  validate(refreshTokenValidation),
  authController.refresh.bind(authController)
);

// Protected routes
router.get(
  '/me',
  authenticate,
  authController.getProfile.bind(authController)
);

export default router;
