import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validateBody, validateParams, validateQuery } from '../middlewares/validate.middleware';
import {
  updateUserSchema,
  userIdParamSchema,
  paginationQuerySchema,
} from '../schemas/user.schemas';

const router = Router();
const userController = new UserController();

// All user routes require authentication
router.use(authenticate);

router.get('/', validateQuery(paginationQuerySchema), userController.findAll.bind(userController));

router.get('/:id', validateParams(userIdParamSchema), userController.findOne.bind(userController));

router.patch(
  '/:id',
  validateParams(userIdParamSchema),
  validateBody(updateUserSchema),
  userController.update.bind(userController)
);

router.delete(
  '/:id',
  validateParams(userIdParamSchema),
  userController.remove.bind(userController)
);

export default router;
