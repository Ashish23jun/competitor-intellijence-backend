import prisma from '../utils/prisma';
import { AppError } from '../middlewares/error-handler.middleware';

export class OrganizationService {
  async create(name: string, userId: string) {
    const organization = await prisma.organization.create({
      data: {
        name,
        ownerId: userId,
        members: {
          create: {
            userId,
            role: 'owner',
          },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
      },
    });

    console.log(`✅ Organization created: ${organization.name} by user ${userId}`);

    return organization;
  }

  async findAll(userId: string) {
    const organizations = await prisma.organization.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        _count: {
          select: {
            members: true,
            competitors: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return organizations;
  }

  async findOne(id: string, userId: string) {
    const organization = await prisma.organization.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            competitors: true,
            events: true,
          },
        },
      },
    });

    if (!organization) {
      throw new AppError(`Organization with ID ${id} not found`, 404);
    }

    // Check if user is a member
    const isMember = organization.members.some(
      (member) => member.userId === userId
    );

    if (!isMember) {
      throw new AppError('You do not have access to this organization', 403);
    }

    return organization;
  }

  async update(id: string, data: { name?: string }, userId: string) {
    const organization = await prisma.organization.findUnique({
      where: { id },
      include: {
        members: true,
      },
    });

    if (!organization) {
      throw new AppError(`Organization with ID ${id} not found`, 404);
    }

    // Check if user is owner or admin
    const member = organization.members.find((m) => m.userId === userId);

    if (!member || !['owner', 'admin'].includes(member.role)) {
      throw new AppError(
        'Only owners and admins can update the organization',
        403
      );
    }

    const updated = await prisma.organization.update({
      where: { id },
      data,
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
      },
    });

    console.log(`✅ Organization updated: ${updated.name}`);

    return updated;
  }

  async remove(id: string, userId: string) {
    const organization = await prisma.organization.findUnique({
      where: { id },
    });

    if (!organization) {
      throw new AppError(`Organization with ID ${id} not found`, 404);
    }

    // Only owner can delete
    if (organization.ownerId !== userId) {
      throw new AppError('Only the owner can delete the organization', 403);
    }

    await prisma.organization.delete({
      where: { id },
    });

    console.log(`✅ Organization deleted: ${organization.name}`);

    return { message: 'Organization successfully deleted' };
  }

  async addMember(organizationId: string, email: string, role: string, currentUserId: string) {
    // Check organization exists
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        members: true,
      },
    });

    if (!organization) {
      throw new AppError(`Organization with ID ${organizationId} not found`, 404);
    }

    // Check if current user is owner or admin
    const currentMember = organization.members.find(
      (m) => m.userId === currentUserId
    );

    if (!currentMember || !['owner', 'admin'].includes(currentMember.role)) {
      throw new AppError('Only owners and admins can add members', 403);
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError(`User with email ${email} not found`, 404);
    }

    // Check if already a member
    const existingMember = organization.members.find(
      (m) => m.userId === user.id
    );

    if (existingMember) {
      throw new AppError('User is already a member of this organization', 409);
    }

    // Add member
    const member = await prisma.organizationMember.create({
      data: {
        orgId: organizationId,
        userId: user.id,
        role,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    console.log(`✅ Member added: ${user.email} to ${organization.name}`);

    return member;
  }

  async removeMember(organizationId: string, memberId: string, currentUserId: string) {
    // Check organization exists
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        members: true,
      },
    });

    if (!organization) {
      throw new AppError(`Organization with ID ${organizationId} not found`, 404);
    }

    // Check if current user is owner or admin
    const currentMember = organization.members.find(
      (m) => m.userId === currentUserId
    );

    if (!currentMember || !['owner', 'admin'].includes(currentMember.role)) {
      throw new AppError('Only owners and admins can remove members', 403);
    }

    // Cannot remove owner
    if (organization.ownerId === memberId) {
      throw new AppError('Cannot remove the organization owner', 403);
    }

    // Check if member exists
    const memberToRemove = organization.members.find(
      (m) => m.userId === memberId
    );

    if (!memberToRemove) {
      throw new AppError('Member not found in this organization', 404);
    }

    await prisma.organizationMember.delete({
      where: {
        orgId_userId: {
          orgId: organizationId,
          userId: memberId,
        },
      },
    });

    console.log(`✅ Member removed from ${organization.name}`);

    return { message: 'Member successfully removed' };
  }
}
