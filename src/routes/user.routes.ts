import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  updateUserValidation,
  userIdValidation,
  paginationValidation,
} from '../validators/user.validators';

const router = Router();
const userController = new UserController();

// All user routes require authentication
router.use(authenticate);

router.get(
  '/',
  validate(paginationValidation),
  userController.findAll.bind(userController)
);

router.get(
  '/:id',
  validate(userIdValidation),
  userController.findOne.bind(userController)
);

router.patch(
  '/:id',
  validate([...userIdValidation, ...updateUserValidation]),
  userController.update.bind(userController)
);

router.delete(
  '/:id',
  validate(userIdValidation),
  userController.remove.bind(userController)
);

export default router;
