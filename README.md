# Gathrio

<div align="center">
  <img src="public/gathrio-logo.svg" alt="Gathrio Logo" width="120" />
  
  <h3>Where Events Come Together</h3>
  
  <p>A hybrid event platform that seamlessly connects in-person and virtual attendees through live streaming, real-time engagement tools, and powerful networking features.</p>

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## 🎯 About

Gathrio eliminates geographic barriers to create inclusive event experiences where every attendee—whether physical or virtual—feels equally present, engaged, and connected.

### Why Gathrio?

- **🌍 Global Reach:** Break down geographic barriers and reach audiences worldwide
- **🎥 Professional Streaming:** Low-latency, high-quality video with adaptive bitrate
- **💬 Real-Time Engagement:** Live Q&A, polls, reactions, and chat that bridge both audiences
- **🤝 Virtual Networking:** Video lounges and matchmaking that recreate hallway conversations
- **🎫 Flexible Ticketing:** Dual pricing for in-person and virtual attendance
- **📊 Unified Analytics:** Real-time insights across both audiences

---

## ✨ Features

### Core Features (MVP)

- ✅ User authentication (email/password + social login)
- ✅ Role-based access (Attendee, Organizer, Admin)
- ✅ Event creation and management
- ✅ Dual ticketing system (in-person + virtual)
- ✅ Live streaming with adaptive bitrate
- ✅ Real-time chat with attendee type badges
- ✅ Q&A system with upvoting
- ✅ Live polls with results visualization
- ✅ Event discovery and search
- ✅ Payment processing (Stripe)
- ✅ Email notifications

### Coming Soon

- 🔄 Virtual networking lounges (video chat)
- 🔄 AI-powered attendee matchmaking
- 🔄 Recording and replay functionality
- 🔄 Multi-language support
- 🔄 White-label solutions
- 🔄 Advanced analytics dashboard
- 🔄 Mobile apps (iOS/Android)

---

## 🛠 Tech Stack

### Frontend

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/)

### Backend

- **Runtime:** [Node.js](https://nodejs.org/) v20+
- **Framework:** [Express.js](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) 15+ (with [Prisma ORM](https://www.prisma.io/))
- **Caching:** [Redis](https://redis.io/)
- **Authentication:** JWT + bcrypt
- **Validation:** [Zod](https://zod.dev/)
- **Testing:** [Jest](https://jestjs.io/) + [Supertest](https://github.com/visionmedia/supertest)

### Infrastructure

- **Frontend Hosting:** [Vercel](https://vercel.com/)
- **Backend Hosting:** [Railway](https://railway.app/) or [Render](https://render.com/)
- **Database:** [Supabase](https://supabase.com/) or [Railway PostgreSQL](https://railway.app/)
- **File Storage:** [AWS S3](https://aws.amazon.com/s3/) or [Cloudflare R2](https://www.cloudflare.com/products/r2/)
- **Video Streaming:** [Agora.io](https://www.agora.io/) or [AWS IVS](https://aws.amazon.com/ivs/)
- **Email:** [SendGrid](https://sendgrid.com/) or [Resend](https://resend.com/)
- **CI/CD:** [GitHub Actions](https://github.com/features/actions)
- **Monitoring:** [Sentry](https://sentry.io/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js v20 or higher
- npm v10 or higher (or yarn/pnpm)
- PostgreSQL 15+ (or Docker)
- Git
- VS Code (recommended) with TypeScript, ESLint, and Prettier extensions

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Leogabson/Gathrio.git
cd gathrio-platform
```

2. **Install dependencies:**

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Set up environment variables:**

**Backend (`backend/.env`):**

```bash
# Copy example env file
cp .env.example .env

# Edit with your values
nano .env
```

```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/gathrio_dev"
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRES_IN=7d
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000
```

**Frontend (`frontend/.env.local`):**

```bash
cp .env.example .env.local
nano .env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Set up database:**

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed database with sample data
npm run seed
```

5. **Start development servers:**

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
# Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
# App running on http://localhost:3000
```

6. **Verify installation:**

Open http://localhost:3000 in your browser. You should see the Gathrio landing page! 🎉

---

## 📁 Project Structure

```
gathrio-platform/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   ├── tests/           # Test files
│   │   ├── app.ts           # Express app setup
│   │   └── server.ts        # Server entry point
│   ├── prisma/              # Prisma schema & migrations
│   ├── .env.example         # Environment variables template
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                # Next.js frontend
│   ├── src/
│   │   ├── app/             # Next.js App Router
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities & configs
│   │   ├── store/           # Zustand stores
│   │   ├── types/           # TypeScript types
│   │   └── styles/          # Global styles
│   ├── public/              # Static assets
│   ├── .env.example
│   ├── next.config.js
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── docs/                    # Documentation
│   ├── API.md               # API documentation
│   ├── ARCHITECTURE.md      # Architecture overview
│   ├── DEPLOYMENT.md        # Deployment guide
│   └── SPRINT_PLANS.md      # Sprint planning docs
│
├── .github/                 # GitHub workflows
│   └── workflows/
│       ├── backend-ci.yml
│       └── frontend-ci.yml
│
├── LICENSE
├── README.md
└── CONTRIBUTING.md
```

---

## 💻 Development

### Available Scripts

**Backend:**

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run prisma:studio # Open Prisma Studio
npm run prisma:migrate # Run database migrations
```

**Frontend:**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking
```

### Code Style

We use ESLint and Prettier to maintain consistent code style:

```bash
# Run linting
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Format all files
npm run format
```

### Git Workflow

We follow the [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) branching model:

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git add .
git commit -m "feat(scope): description of changes"

# Push to remote
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
```

**Commit Message Convention:**
We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

---

## 🧪 Testing

### Running Tests

**Backend:**

```bash
cd backend

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test auth.service.test.ts

# Run in watch mode
npm run test:watch
```

**Frontend:**

```bash
cd frontend

# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

### Writing Tests

**Backend Example:**

```typescript
// src/services/auth.service.test.ts
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  it("should register a new user", async () => {
    const result = await authService.register({
      email: "test@example.com",
      password: "Test123!",
      firstName: "John",
      lastName: "Doe",
      role: "ATTENDEE",
    });

    expect(result.user.email).toBe("test@example.com");
    expect(result.accessToken).toBeDefined();
  });
});
```

---

## 🚢 Deployment

### Staging Environment

**Frontend (Vercel):**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_API_URL
```

**Backend (Railway):**

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up

# Set environment variables
railway variables set DATABASE_URL=postgresql://...
```

### Production Deployment

1. **Merge to main branch** triggers automatic deployment via GitHub Actions
2. **Backend** deploys to Railway/Render
3. **Frontend** deploys to Vercel
4. **Database migrations** run automatically
5. **Health checks** verify deployment success

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Ensure all tests pass
6. Submit a Pull Request

### Code Review Process

1. Submit PR with clear description
2. Automated checks run (tests, linting, build)
3. Request review from team members
4. Address review comments
5. Merge after approval

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

### Documentation

- [API Documentation](docs/API.md)
- [Architecture Overview](docs/ARCHITECTURE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Sprint Plans](docs/SPRINT_PLANS.md)

### Community

- **Website:** [gathrio.live](https://gathrio.live)
- **Email:** hello@gathrio.io
- **GitHub Issues:** [Report a bug](https://github.com/gathrio/gathrio-platform/issues)
- **Discussions:** [Join the conversation](https://github.com/gathrio/gathrio-platform/discussions)

### Team

- **Founder/CEO:** [Gabriel]
- **Tech Lead:** [Gabbriel]

---

## 🗺 Roadmap

### Q1 2026 (January - March) - MVP Launch

- [x] User authentication system
- [x] Event CRUD operations
- [x] Basic ticketing system
- [ ] Live streaming integration
- [ ] Payment processing
- [ ] Email notifications
- [ ] Public beta launch

### Q2 2026 (April - June) - Enhanced Features

- [ ] Virtual networking lounges
- [ ] Advanced search and filters
- [ ] Mobile apps (iOS/Android)
- [ ] Recording and replay
- [ ] Enhanced analytics

### Q3 2026 (July - September) - Scale

- [ ] AI-powered matchmaking
- [ ] Multi-language support
- [ ] White-label solutions
- [ ] API marketplace
- [ ] Series A fundraise

### Q4 2026 (October - December) - Enterprise

- [ ] Enterprise features
- [ ] Advanced integrations
- [ ] International expansion
- [ ] Profitability milestone

See [full roadmap](docs/ROADMAP.md) for detailed milestones.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Vercel](https://vercel.com/) - Platform for frontend deployment
- [Railway](https://railway.app/) - Infrastructure made simple

---

## 📊 Project Status

![Build Status](https://img.shields.io/github/actions/workflow/status/gathrio/gathrio-platform/backend-ci.yml)
![Test Coverage](https://img.shields.io/codecov/c/github/gathrio/gathrio-platform)
![Last Commit](https://img.shields.io/github/last-commit/gathrio/gathrio-platform)
![Contributors](https://img.shields.io/github/contributors/gathrio/gathrio-platform)

**Current Version:** v0.1.0 (MVP Development)  
**Status:** 🚧 In Active Development  
**Next Release:** v0.2.0 (Estimated: March 2026)

---

<div align="center">
  <p>Built by the Gathrio Team</p>
  <p>© 2026 Gathrio. All rights reserved.</p>
  
  <a href="https://gathrio.live">Website</a> •
  <a href="https://twitter.com/gathrio">Twitter</a> •
  <a href="https://linkedin.com/company/gathrio">LinkedIn</a>
</div>
