import { z } from 'zod';

/**
 * Organization Validation Schemas using Zod
 */

export const createOrganizationSchema = z.object({
  name: z
    .string({
      required_error: 'Organization name is required',
    })
    .min(2, 'Organization name must be at least 2 characters')
    .max(100, 'Organization name must not exceed 100 characters')
    .trim(),
});

export const updateOrganizationSchema = z.object({
  name: z
    .string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(100, 'Organization name must not exceed 100 characters')
    .trim()
    .optional(),
});

export const addMemberSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Please provide a valid email address')
    .toLowerCase()
    .trim(),

  role: z.enum(['owner', 'admin', 'analyst', 'viewer'], {
    errorMap: () => ({
      message: 'Role must be one of: owner, admin, analyst, viewer',
    }),
  }),
});

export const organizationIdParamSchema = z.object({
  id: z.string().uuid('Invalid organization ID format'),
});

export const memberIdParamSchema = z.object({
  memberId: z.string().uuid('Invalid member ID format'),
});

export const removeMemberParamSchema = z.object({
  id: z.string().uuid('Invalid organization ID format'),
  memberId: z.string().uuid('Invalid member ID format'),
});

// Export inferred types
export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>;
export type AddMemberInput = z.infer<typeof addMemberSchema>;
export type OrganizationIdParam = z.infer<typeof organizationIdParamSchema>;
export type MemberIdParam = z.infer<typeof memberIdParamSchema>;
export type RemoveMemberParam = z.infer<typeof removeMemberParamSchema>;
