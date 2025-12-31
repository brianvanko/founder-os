# Founder Personal OS - SaaS Application

A multi-tenant SaaS web application for founders to maintain clarity through daily check-ins, weekly reviews, and strategic reflection.

## Project Status

**All Phases Complete:** ✅

### Core Features
- ✅ Next.js 15 + React 19 + TypeScript
- ✅ Tailwind CSS + shadcn/ui component system
- ✅ Prisma ORM + PostgreSQL schema (Supabase)
- ✅ Authentication (NextAuth with signup/login)
- ✅ Core documents (Principles, North Star, Memory) with markdown editor
- ✅ Complete review system (daily, weekly, quarterly, annual)
- ✅ Goals tracking (1-year, 3-year, 10-year)
- ✅ Three interview types (Past Year, Identity & Values, Future Self)
- ✅ Framework templates (7 types)
- ✅ Dashboard with statistics and insights
- ✅ Streak tracking for consistency
- ✅ Mobile-responsive design

### Advanced Features
- ✅ File uploads (Supabase Storage - PDF, DOCX, TXT, MD)
- ✅ Full-text search across all content
- ✅ Timeline view for pattern recognition
- ✅ Export to markdown
- ✅ AI-powered insights (OpenAI GPT-4o-mini)
- ✅ Stripe subscription billing
- ✅ Customer billing portal

**✅ Deployed to Vercel!**

**Live at:** [https://founder-os-nine.vercel.app](https://founder-os-nine.vercel.app)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment details.

## Key Features

### 📝 Review System
- **Daily Reviews** - Quick 5-question check-ins (<60s completion)
- **Weekly Reviews** - Reflect on progress, energy, and goal alignment
- **Quarterly Reviews** - Life Map ratings across 6 pillars + strategic planning
- **Annual Reviews** - Comprehensive framework based on Dr. Anthony Gustin's method

### 🎯 Goal Tracking
- **Multi-timeframe goals** - 1-year, 3-year, and 10-year goals
- **Progress tracking** - 1-10 ratings with status updates
- **Category organization** - Business, Personal, Health, Relationships, etc.
- **Goal-what-why-how framework** - Structured goal planning

### 🧠 Intelligence & Insights
- **AI-powered pattern recognition** - Analyzes reviews, goals, and interviews
- **Comprehensive insights** - Identifies contradictions and recurring themes
- **Memory extraction** - Suggests content for your operating manual
- **Timeline view** - Chronological view of all your content

### 📁 Document Management
- **Core documents** - Principles, North Star, Memory with markdown editing
- **Framework templates** - Annual Review, Vivid Vision, Ideal Life Costing, Life Map
- **File uploads** - Store past reviews and reference materials (10MB limit)
- **Full-text search** - Search across all reviews, goals, documents, and interviews

### 💼 Interviews & Frameworks
- **Past Year Reflection** - Deep dive into lessons learned
- **Identity & Values** - Clarify who you are and what matters
- **Future Self Interview** - 3-year vision and life design

### 💳 Subscription & Billing
- **Stripe integration** - Secure payment processing
- **Customer portal** - Manage subscriptions and payment methods
- **Webhook automation** - Automatic subscription status updates

### 🔒 Security & Privacy
- **Row-Level Security** - Database-level tenant isolation
- **NextAuth authentication** - Secure login with email/password
- **Private data** - All content is private to your account

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Auth:** NextAuth.js v5
- **Storage:** Supabase Storage
- **AI:** OpenAI GPT-4o-mini (for insights)
- **Payments:** Stripe
- **Hosting:** Vercel

## Getting Started

### 1. Clone and Install

```bash
cd ceo-os-app
npm install  # Already done!
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your database URL from Settings → Database
4. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
5. Update `.env` with your Supabase credentials

### 3. Set up Database

```bash
# Push Prisma schema to database
npm run db:push

# Generate Prisma Client
npm run db:generate
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
ceo-os-app/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Landing page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   └── lib/             # Utilities and database client
│       ├── db.ts        # Prisma client
│       └── utils.ts     # Helper functions
├── prisma/
│   └── schema.prisma    # Database schema
└── public/              # Static assets
```

## Database Schema

The schema includes:
- **User** - User accounts and profiles
- **Account/Session** - NextAuth authentication
- **Document** - Core docs (Principles, North Star, Memory, Frameworks)
- **Review** - Daily, weekly, quarterly, annual reviews
- **Interview** - Guided self-interviews
- **Goal** - 1-year, 3-year, 10-year goals
- **Upload** - File metadata for past documents (Supabase Storage)
- **Subscription** - Stripe subscription tracking

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

npm run db:push      # Push schema to database
npm run db:generate  # Generate Prisma Client
npm run db:studio    # Open Prisma Studio (database GUI)
```

## Environment Variables

Required in `.env`:

```env
# Database
DATABASE_URL=                    # Supabase PostgreSQL connection string

# NextAuth
NEXTAUTH_URL=                    # http://localhost:3000 (dev) or your domain (prod)
NEXTAUTH_SECRET=                 # Generate with: openssl rand -base64 32

# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL=        # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Your Supabase anon key
SUPABASE_SERVICE_ROLE_KEY=       # Your Supabase service role key

# OpenAI (for AI insights)
OPENAI_API_KEY=                  # Your OpenAI API key

# Stripe (for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # Your Stripe publishable key
STRIPE_SECRET_KEY=               # Your Stripe secret key
STRIPE_WEBHOOK_SECRET=           # Your Stripe webhook secret
STRIPE_PRICE_ID=                 # Your Stripe price ID
```

## Development Roadmap

### Phase 1: Core MVP ✅ Complete
- [x] Project setup and dependencies
- [x] Database schema
- [x] Authentication (signup, login)
- [x] Core documents (Principles, North Star, Memory)
- [x] Daily review feature (<60s completion time)
- [x] 1-year goals with progress tracking
- [x] Dashboard with statistics
- [x] Streak tracking
- [x] Edit/Delete functionality
- [x] Toast notifications
- [x] Mobile-responsive design
- [x] Deploy to Vercel

### Phase 2: Review System ✅ Complete
- [x] Weekly reviews (questions + goal progress)
- [x] Quarterly reviews (Life Map ratings + alignment check)
- [x] Annual reviews (full framework with Dr. Gustin's method)
- [x] Review list/detail pages for all types
- [x] CRUD operations for all review types

### Phase 3: Intelligence & Features ✅ Complete
- [x] Interviews (Past Year Reflection, Identity & Values, Future Self)
- [x] 3-year and 10-year goal types
- [x] File uploads (Supabase Storage integration)
- [x] Full-text search across all content
- [x] Timeline view for pattern recognition
- [x] Export to markdown
- [x] Framework templates (Annual Review, Vivid Vision, Ideal Life Costing, Life Map)

### Phase 4: Growth & Monetization ✅ Complete
- [x] AI-powered insights (OpenAI GPT-4o-mini)
- [x] Payment integration (Stripe subscriptions)
- [x] Billing management page
- [x] Webhook handling for subscription events

### Future Enhancements
- [ ] Reminders/notifications
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Team/coach sharing features
- [ ] Two-factor authentication

## Design Philosophy

This application preserves the calm, executive-level tone of the original markdown system:
- **Simplicity over complexity** - No productivity theater
- **Clarity over action** - Reflection prevents regret
- **Privacy-first** - Deeply personal data, treated seriously
- **Speed where it matters** - Daily reviews <60 seconds
- **Depth where it counts** - Rich frameworks and interviews

## Contributing

This is currently a solo project for learning and iteration.

## License

MIT
