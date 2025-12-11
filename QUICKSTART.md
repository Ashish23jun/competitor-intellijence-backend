# 🚀 Quick Start Guide

Get your Competitor Intelligence API (Express + TypeScript) running in 5 minutes!

## Step 1: Install Dependencies

```bash
cd competitor-intelligence-backend
npm install
```

This will install Express, Prisma, JWT, and all other dependencies.

## Step 2: Setup Database

Your `.env` file is already configured with the Neon PostgreSQL database.

```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations (creates all tables)
npm run prisma:migrate
```

## Step 3: Start Redis (Required for Job Queue)

### macOS (Homebrew):
```bash
brew services start redis
```

### Linux:
```bash
sudo systemctl start redis
```

### Docker:
```bash
docker run -d -p 6379:6379 --name redis redis:alpine
```

## Step 4: Start the Development Server

```bash
npm run start:dev
```

You should see:
```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 Competitor Intelligence API (Express)           ║
║                                                       ║
║   🌐 Server:      http://localhost:3000              ║
║   📚 Docs:        http://localhost:3000/api/docs    ║
║   🔧 Environment: development                         ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

## Step 5: Test the API

### Option A: Using Swagger UI (Recommended)
1. Open http://localhost:3000/api/docs
2. Click "Authorize" button
3. Test endpoints directly in the browser

### Option B: Using cURL

**Register a new user:**
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

**Create an organization:**
```bash
curl -X POST http://localhost:3000/api/v1/organizations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "My Company"
  }'
```

## ✅ What Works Right Now

- ✅ User Registration & Authentication
- ✅ JWT Token Management (Access + Refresh)
- ✅ User Profile Management
- ✅ Organization Creation & Management
- ✅ Team Member Management
- ✅ Role-Based Access Control
- ✅ Comprehensive API Documentation
- ✅ Input Validation
- ✅ Error Handling

## 🚧 What's Next

See `PROGRESS.md` for the full roadmap. The next modules to implement are:
1. **Competitors** - Add and track competitors
2. **Monitors** - Configure what to track
3. **Scrapers** - Playwright-based scraping
4. **Events** - Activity tracking

## 🐛 Troubleshooting

### Database Connection Error
- Check that the Neon database is accessible
- Verify `DATABASE_URL` in `.env`

### Redis Connection Error
- Make sure Redis is running: `redis-cli ping` (should return "PONG")
- Check `REDIS_HOST` and `REDIS_PORT` in `.env`

### Port 3000 Already in Use
- Change `PORT` in `.env` to another value (e.g., 3001)
- Or kill the process using port 3000

### Prisma Migration Error
- Run `npx prisma migrate reset` (WARNING: deletes all data)
- Then run `npm run prisma:migrate` again

## 📚 Additional Resources

- **API Documentation:** http://localhost:3000/api/docs
- **Prisma Studio:** Run `npm run prisma:studio` to view database
- **Progress Tracking:** See `PROGRESS.md`
- **Full README:** See `README.md`
- **Migration Details:** See `MIGRATION_COMPLETE.md`

## 🆘 Need Help?

Check the logs in your terminal - Express provides detailed error messages with stack traces.

---

Happy coding! 🎉

**Built with Express + TypeScript + Prisma + PostgreSQL**
