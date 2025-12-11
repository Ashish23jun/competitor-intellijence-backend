import { Response } from 'express';
import { OrganizationService } from '../services/organization.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ResponseHandler } from '../utils/response/response.handler';
import {
  CreateOrganizationInput,
  UpdateOrganizationInput,
  AddMemberInput,
} from '../schemas/organization.schemas';

const organizationService = new OrganizationService();

export class OrganizationController {
  async create(req: AuthRequest, res: Response) {
    const { name } = req.body as CreateOrganizationInput;
    const result = await organizationService.create(name, req.user!.id);
    return ResponseHandler.created(res, result, 'Organization created successfully');
  }

  async findAll(req: AuthRequest, res: Response) {
    const result = await organizationService.findAll(req.user!.id);
    return ResponseHandler.success(res, result, 'Organizations retrieved successfully');
  }

  async findOne(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const result = await organizationService.findOne(id, req.user!.id);
    return ResponseHandler.success(res, result, 'Organization retrieved successfully');
  }

  async update(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const data = req.body as UpdateOrganizationInput;
    const result = await organizationService.update(id, data, req.user!.id);
    return ResponseHandler.success(res, result, 'Organization updated successfully');
  }

  async remove(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const result = await organizationService.remove(id, req.user!.id);
    return ResponseHandler.successMessage(res, result.message);
  }

  async addMember(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { email, role } = req.body as AddMemberInput;
    const result = await organizationService.addMember(id, email, role, req.user!.id);
    return ResponseHandler.created(res, result, 'Member added successfully');
  }

  async removeMember(req: AuthRequest, res: Response) {
    const { id, memberId } = req.params;
    const result = await organizationService.removeMember(id, memberId, req.user!.id);
    return ResponseHandler.successMessage(res, result.message);
  }
}
