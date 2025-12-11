import { Router } from 'express';
import { OrganizationController } from '../controllers/organization.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validateBody, validateParams } from '../middlewares/validate.middleware';
import {
  createOrganizationSchema,
  updateOrganizationSchema,
  addMemberSchema,
  organizationIdParamSchema,
  removeMemberParamSchema,
} from '../schemas/organization.schemas';

const router = Router();
const organizationController = new OrganizationController();

// All organization routes require authentication
router.use(authenticate);

router.post(
  '/',
  validateBody(createOrganizationSchema),
  organizationController.create.bind(organizationController)
);

router.get('/', organizationController.findAll.bind(organizationController));

router.get(
  '/:id',
  validateParams(organizationIdParamSchema),
  organizationController.findOne.bind(organizationController)
);

router.patch(
  '/:id',
  validateParams(organizationIdParamSchema),
  validateBody(updateOrganizationSchema),
  organizationController.update.bind(organizationController)
);

router.delete(
  '/:id',
  validateParams(organizationIdParamSchema),
  organizationController.remove.bind(organizationController)
);

router.post(
  '/:id/members',
  validateParams(organizationIdParamSchema),
  validateBody(addMemberSchema),
  organizationController.addMember.bind(organizationController)
);

router.delete(
  '/:id/members/:memberId',
  validateParams(removeMemberParamSchema),
  organizationController.removeMember.bind(organizationController)
);

export default router;
