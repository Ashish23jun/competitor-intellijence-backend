import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import 'express-async-errors';
import dotenv from 'dotenv';

dotenv.config();

import { errorHandler } from './middlewares/error-handler.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';

import { registerRoutes } from './routes';

import { setupSwagger } from './config/swagger';

import prisma from './utils/prisma';

const app: Application = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGINS?.split(',') || [
      'http://localhost:3001',
      'http://localhost:5173',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_TTL || '60', 10) * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cookieParser());

app.use(compression());

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
  });
});

const API_PREFIX = process.env.API_PREFIX || 'api/v1';
registerRoutes(app, API_PREFIX);

if (NODE_ENV !== 'production') {
  setupSwagger(app);
}

app.use(notFoundHandler);

app.use(errorHandler);

process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
const server = app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 Competitor Intelligence API (Express)           ║
║                                                       ║
║   🌐 Server:      http://localhost:${PORT}              ║
║   📚 Docs:        http://localhost:${PORT}/api/docs    ║
║   🔧 Environment: ${NODE_ENV}                          ║
║   📦 API Prefix:  /${API_PREFIX}                     ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
    `);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
});

process.on('unhandledRejection', (err: Error) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  server.close(() => process.exit(1));
});

export default app;
