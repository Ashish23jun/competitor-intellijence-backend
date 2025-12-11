import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await userService.findAll(page, limit);
    res.status(200).json(result);
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
    res.status(200).json(result);
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
    const result = await userService.update(id, req.body);
    res.status(200).json(result);
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
    res.status(200).json(result);
  }
}
