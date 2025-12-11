import { Router } from 'express';
import { OrganizationController } from '../controllers/organization.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  createOrganizationValidation,
  updateOrganizationValidation,
  addMemberValidation,
  organizationIdValidation,
  memberIdValidation,
} from '../validators/organization.validators';

const router = Router();
const organizationController = new OrganizationController();

// All organization routes require authentication
router.use(authenticate);

router.post(
  '/',
  validate(createOrganizationValidation),
  organizationController.create.bind(organizationController)
);

router.get(
  '/',
  organizationController.findAll.bind(organizationController)
);

router.get(
  '/:id',
  validate(organizationIdValidation),
  organizationController.findOne.bind(organizationController)
);

router.patch(
  '/:id',
  validate([...organizationIdValidation, ...updateOrganizationValidation]),
  organizationController.update.bind(organizationController)
);

router.delete(
  '/:id',
  validate(organizationIdValidation),
  organizationController.remove.bind(organizationController)
);

router.post(
  '/:id/members',
  validate([...organizationIdValidation, ...addMemberValidation]),
  organizationController.addMember.bind(organizationController)
);

router.delete(
  '/:id/members/:memberId',
  validate([...organizationIdValidation, ...memberIdValidation]),
  organizationController.removeMember.bind(organizationController)
);

export default router;
