/**
 * User Types
 */

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserInput {
  name?: string;
}

export interface UserWithOrganizations extends User {
  organizationMembers: Array<{
    role: string;
    organization: {
      id: string;
      name: string;
    };
  }>;
}
