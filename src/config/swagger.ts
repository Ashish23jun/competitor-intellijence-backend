import { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Competitor Intelligence API',
      version: '1.0.0',
      description:
        'API for monitoring competitor marketing activities including ads, websites, social media, and more',
      contact: {
        name: 'API Support',
        email: 'support@competitorintel.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}/${process.env.API_PREFIX || 'api/v1'}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Users', description: 'User management' },
      { name: 'Organizations', description: 'Organization management' },
      { name: 'Competitors', description: 'Competitor tracking' },
      { name: 'Monitors', description: 'Monitor configuration' },
      { name: 'Events', description: 'Event tracking' },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Competitor Intelligence API Docs',
    })
  );

  console.log('📚 Swagger documentation available at /api/docs');
};
