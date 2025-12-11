import { body, param } from 'express-validator';

export const createOrganizationValidation = [
  body('name')
    .isLength({ min: 2, max: 100 })
    .withMessage('Organization name must be between 2 and 100 characters')
    .trim(),
];

export const updateOrganizationValidation = [
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Organization name must be between 2 and 100 characters')
    .trim(),
];

export const addMemberValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('role')
    .isIn(['owner', 'admin', 'analyst', 'viewer'])
    .withMessage('Role must be one of: owner, admin, analyst, viewer'),
];

export const organizationIdValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid organization ID format'),
];

export const memberIdValidation = [
  param('memberId')
    .isUUID()
    .withMessage('Invalid member ID format'),
];
