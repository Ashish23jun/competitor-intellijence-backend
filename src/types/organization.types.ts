/**
 * Organization Types
 */

export type OrganizationRole = 'owner' | 'admin' | 'analyst' | 'viewer';

export interface Organization {
  id: string;
  name: string;
  ownerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrganizationInput {
  name: string;
}

export interface UpdateOrganizationInput {
  name?: string;
}

export interface AddMemberInput {
  email: string;
  role: OrganizationRole;
}

export interface OrganizationMember {
  userId: string;
  orgId: string;
  role: OrganizationRole;
  createdAt: Date;
  user: {
    id: string;
    email: string;
    name: string | null;
  };
}

export interface OrganizationWithMembers extends Organization {
  owner: {
    id: string;
    email: string;
    name: string | null;
  } | null;
  members: OrganizationMember[];
}

export interface OrganizationWithCounts extends Organization {
  owner: {
    id: string;
    email: string;
    name: string | null;
  } | null;
  _count: {
    members: number;
    competitors: number;
  };
}
