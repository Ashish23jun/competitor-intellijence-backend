import { Response } from 'express';
import { ApiResponse, PaginatedResponse } from '../../types/response.types';

/**
 * Global Response Handler
 * Provides consistent API responses across the application
 */

export class ResponseHandler {
  /**
   * Send success response
   */
  static success<T>(res: Response, data: T, message?: string, statusCode: number = 200): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Send success response with message only
   */
  static successMessage(res: Response, message: string, statusCode: number = 200): Response {
    const response: ApiResponse = {
      success: true,
      message,
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Send paginated response
   */
  static paginated<T>(
    res: Response,
    data: PaginatedResponse<T>,
    message?: string,
    statusCode: number = 200
  ): Response {
    const response: ApiResponse<PaginatedResponse<T>> = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Send created response (201)
   */
  static created<T>(
    res: Response,
    data: T,
    message: string = 'Resource created successfully'
  ): Response {
    return this.success(res, data, message, 201);
  }

  /**
   * Send no content response (204)
   */
  static noContent(res: Response): Response {
    return res.status(204).send();
  }
}
