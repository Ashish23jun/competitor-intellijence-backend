import { Response } from 'express';
import { OrganizationService } from '../services/organization.service';
import { AuthRequest } from '../middlewares/auth.middleware';

const organizationService = new OrganizationService();

export class OrganizationController {
  /**
   * @swagger
   * /organizations:
   *   post:
   *     summary: Create a new organization
   *     tags: [Organizations]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *             properties:
   *               name:
   *                 type: string
   *     responses:
   *       201:
   *         description: Organization created
   */
  async create(req: AuthRequest, res: Response) {
    const { name } = req.body;
    const result = await organizationService.create(name, req.user!.id);
    res.status(201).json(result);
  }

  /**
   * @swagger
   * /organizations:
   *   get:
   *     summary: Get all organizations for current user
   *     tags: [Organizations]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of organizations
   */
  async findAll(req: AuthRequest, res: Response) {
    const result = await organizationService.findAll(req.user!.id);
    res.status(200).json(result);
  }

  /**
   * @swagger
   * /organizations/{id}:
   *   get:
   *     summary: Get organization by ID
   *     tags: [Organizations]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Organization details
   *       404:
   *         description: Organization not found
   *       403:
   *         description: Forbidden
   */
  async findOne(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const result = await organizationService.findOne(id, req.user!.id);
    res.status(200).json(result);
  }

  /**
   * @swagger
   * /organizations/{id}:
   *   patch:
   *     summary: Update organization
   *     tags: [Organizations]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *     responses:
   *       200:
   *         description: Organization updated
   */
  async update(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const result = await organizationService.update(id, req.body, req.user!.id);
    res.status(200).json(result);
  }

  /**
   * @swagger
   * /organizations/{id}:
   *   delete:
   *     summary: Delete organization
   *     tags: [Organizations]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Organization deleted
   */
  async remove(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const result = await organizationService.remove(id, req.user!.id);
    res.status(200).json(result);
  }

  /**
   * @swagger
   * /organizations/{id}/members:
   *   post:
   *     summary: Add member to organization
   *     tags: [Organizations]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - role
   *             properties:
   *               email:
   *                 type: string
   *               role:
   *                 type: string
   *                 enum: [owner, admin, analyst, viewer]
   *     responses:
   *       201:
   *         description: Member added
   */
  async addMember(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { email, role } = req.body;
    const result = await organizationService.addMember(id, email, role, req.user!.id);
    res.status(201).json(result);
  }

  /**
   * @swagger
   * /organizations/{id}/members/{memberId}:
   *   delete:
   *     summary: Remove member from organization
   *     tags: [Organizations]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *       - in: path
   *         name: memberId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Member removed
   */
  async removeMember(req: AuthRequest, res: Response) {
    const { id, memberId } = req.params;
    const result = await organizationService.removeMember(id, memberId, req.user!.id);
    res.status(200).json(result);
  }
}
