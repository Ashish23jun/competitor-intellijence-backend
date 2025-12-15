# Competitor Marketing Intelligence Tool - Backend API

A comprehensive **Express + TypeScript** backend API for monitoring competitor marketing activities including ads, websites, social media, SEO, pricing, and reviews.

## 🚀 Tech Stack

- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL (Neon) with Prisma ORM
- **Authentication**: JWT (Access + Refresh tokens)
- **Validation**: express-validator
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate Limiting
- **Cache/Queue**: Redis + Bull (for job processing)
- **Storage**: AWS S3
- **AI**: OpenAI GPT-4 & Embeddings
- **Scraping**: Playwright

## ✨ Features

- **User & Organization Management** - Multi-tenant architecture with role-based access
- **JWT Authentication** - Secure access & refresh tokens
- **Competitor Tracking** - Add and monitor competitors (coming soon)
- **Website Monitoring** - Track changes with screenshots (coming soon)
- **Ads Intelligence** - Monitor ads across platforms (coming soon)
- **Social Media Tracking** - Track social posts & engagement (coming soon)
- **SEO Intelligence** - Monitor keywords & rankings (coming soon)
- **Review Monitoring** - Track reviews & sentiment (coming soon)
- **AI-Powered Insights** - OpenAI recommendations (coming soon)
- **Real-time Alerts** - Email, Slack, WhatsApp (coming soon)

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (Neon - already configured)
- **Redis** (for queue management)
- **AWS Account** (for S3 storage - optional for now)
- **OpenAI API Key** (for AI features - optional for now)

## 🔧 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory based on `.env.example`:

```env
DATABASE_URL=postgresql://username:password@your-host.neon.tech/your-database?sslmode=require

JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this

PORT=3000
NODE_ENV=development
```

**IMPORTANT**: Replace the placeholder values with your actual credentials. Never commit real credentials to version control.

### 3. Database Setup

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) View database in Prisma Studio
npm run prisma:studio
```

### 4. Start Redis

```bash
# macOS (Homebrew)
brew services start redis

# Linux
sudo systemctl start redis

# Docker
docker run -d -p 6379:6379 --name redis redis:alpine
```

### 5. Start Development Server

```bash
npm run start:dev
```

The API will be available at:
- **Server**: http://localhost:3000
- **API Docs**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/health

## 📚 API Documentation

Interactive Swagger documentation is available at:

```
http://localhost:3000/api/docs
```

Test all endpoints directly in your browser!

## 🏗️ Project Structure

```
src/
├── server.ts                    # Express app entry point
├── config/
│   └── swagger.ts               # API documentation config
├── middlewares/
│   ├── auth.middleware.ts       # JWT authentication
│   ├── error-handler.middleware.ts
│   ├── not-found.middleware.ts
│   └── validate.middleware.ts   # Input validation
├── routes/
│   ├── auth.routes.ts           # Authentication endpoints
│   ├── user.routes.ts           # User management
│   └── organization.routes.ts   # Organization management
├── controllers/
│   ├── auth.controller.ts       # Auth logic
│   ├── user.controller.ts       # User logic
│   └── organization.controller.ts
├── services/
│   ├── auth.service.ts          # Business logic
│   ├── user.service.ts
│   └── organization.service.ts
├── validators/
│   ├── auth.validators.ts       # Validation rules
│   ├── user.validators.ts
│   └── organization.validators.ts
└── utils/
    └── prisma.ts                # Prisma client instance
```

## 🔐 Security Features

- ✅ **Helmet** - HTTP security headers
- ✅ **CORS** - Configured with origin whitelist
- ✅ **Rate Limiting** - 100 requests/minute per user/IP
- ✅ **Input Validation** - express-validator on all inputs
- ✅ **JWT Authentication** - Secure access & refresh tokens
- ✅ **Password Hashing** - Bcrypt with 10 salt rounds
- ✅ **Request Timeout** - Automatic timeout for long requests
- ✅ **Error Handling** - Global error handler with proper status codes

## 📊 Database Schema

14 tables created:
- `users` - User accounts
- `organizations` - Multi-tenant workspaces
- `organization_members` - Team membership with roles
- `subscriptions` - Billing & plans
- `competitors` - Tracked competitors
- `monitors` - Monitoring configuration
- `events` - Normalized change events
- `raw_snapshots` - Website snapshots
- `ads` - Competitor ads
- `social_posts` - Social media posts
- `reviews` - Customer reviews
- `search_index` - Full-text search
- `audit_logs` - Activity audit trail
- `usage_counters` - Usage tracking

## 🧪 Testing

### Quick API Test

**Register a user:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234",
    "name": "Test User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234"
  }'
```

Save the `accessToken` from the response.

**Create organization:**
```bash
curl -X POST http://localhost:3000/api/v1/organizations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "My Company"
  }'
```

### Run Tests

```bash
# Unit tests
npm run test

# With coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## 🎯 Development Roadmap

### ✅ Completed (Phase 1)
- [x] Express server with TypeScript
- [x] Security middleware (Helmet, CORS, Rate Limiting)
- [x] JWT Authentication (register, login, refresh)
- [x] Users Module (CRUD)
- [x] Organizations Module (CRUD + team management)
- [x] Swagger API documentation
- [x] Database schema with Prisma
- [x] Input validation
- [x] Error handling

### 🚧 In Progress (Phase 2)
- [ ] Competitors Module
- [ ] Monitors Module
- [ ] Events Module
- [ ] AWS S3 Integration

### 📋 Upcoming (Phase 3+)
- [ ] Playwright Scraper Service
- [ ] Website Monitoring
- [ ] Ads Intelligence
- [ ] Social Media Tracking
- [ ] SEO Monitoring
- [ ] Review Tracking
- [ ] AI Integration (OpenAI)
- [ ] Notification System

See `PROGRESS.md` for detailed roadmap.

## 📝 Scripts

```bash
npm run start          # Start production server
npm run start:dev      # Start development with hot-reload
npm run build          # Build for production
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run database migrations
npm run prisma:studio      # Open Prisma Studio GUI
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start:prod
```

### Environment Variables (Production)

Make sure to set secure values for:
- `JWT_SECRET` and `JWT_REFRESH_SECRET`
- `DATABASE_URL` (production database)
- All API keys (OpenAI, SendGrid, Twilio, Stripe)
- `NODE_ENV=production`

## 🐛 Troubleshooting

### Database Connection Error
- Verify the Neon database URL in `.env`
- Check network connectivity

### Redis Connection Error
- Ensure Redis is running: `redis-cli ping` (should return "PONG")

### Port 3000 Already in Use
- Change `PORT` in `.env` to another value
- Or kill the process using port 3000

## 📖 Additional Documentation

- **MIGRATION_COMPLETE.md** - Express migration details
- **PROGRESS.md** - Development progress & roadmap
- **QUICKSTART.md** - 5-minute getting started guide
- **API Docs** - http://localhost:3000/api/docs (when running)

## 🤝 Contributing

This is a private project. For questions, contact the development team.

## 📄 License

MIT License

---

**Built with Express + TypeScript + Prisma + PostgreSQL** 🚀

*Last updated: December 11, 2025*
