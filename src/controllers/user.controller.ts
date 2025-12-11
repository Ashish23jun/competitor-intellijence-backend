import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ResponseHandler } from '../utils/response/response.handler';
import { UpdateUserInput, PaginationQuery } from '../schemas/user.schemas';

const userService = new UserService();

export class UserController {
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all users (paginated)
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *     responses:
   *       200:
   *         description: List of users
   */
  async findAll(req: Request, res: Response) {
    const { page, limit } = req.query as unknown as PaginationQuery;
    const result = await userService.findAll(page, limit);
    return ResponseHandler.paginated(res, result, 'Users retrieved successfully');
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Get user by ID
   *     tags: [Users]
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
   *         description: User details
   *       404:
   *         description: User not found
   */
  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const result = await userService.findOne(id);
    return ResponseHandler.success(res, result, 'User retrieved successfully');
  }

  /**
   * @swagger
   * /users/{id}:
   *   patch:
   *     summary: Update user
   *     tags: [Users]
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
   *         description: User updated
   *       404:
   *         description: User not found
   */
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body as UpdateUserInput;
    const result = await userService.update(id, data);
    return ResponseHandler.success(res, result, 'User updated successfully');
  }

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Delete user
   *     tags: [Users]
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
   *         description: User deleted
   *       404:
   *         description: User not found
   */
  async remove(req: Request, res: Response) {
    const { id } = req.params;
    const result = await userService.remove(id);
    return ResponseHandler.successMessage(res, result.message);
  }
}
