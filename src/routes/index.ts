import { Application } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import organizationRoutes from './organization.routes';

/**
 * Register all API routes
 * @param app - Express application instance
 * @param apiPrefix - API version prefix (e.g., 'api/v1')
 */
export const registerRoutes = (app: Application, apiPrefix: string = 'api/v1') => {
  // Authentication routes
  app.use(`/${apiPrefix}/auth`, authRoutes);

  // User routes
  app.use(`/${apiPrefix}/users`, userRoutes);

  // Organization routes
  app.use(`/${apiPrefix}/organizations`, organizationRoutes);
};

// Named exports for individual routes (if needed elsewhere)
export { authRoutes, userRoutes, organizationRoutes };
