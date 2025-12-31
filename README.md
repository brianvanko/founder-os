# CEO Personal OS - SaaS Application

A multi-tenant SaaS web application for CEOs to maintain clarity through daily check-ins, weekly reviews, and strategic reflection.

## Project Status

**Phase 1 MVP:** ✅ Complete
- ✅ Next.js 15 + React 19 + TypeScript
- ✅ Tailwind CSS + shadcn/ui component system
- ✅ Prisma ORM + PostgreSQL schema (Supabase)
- ✅ Authentication (NextAuth with signup/login)
- ✅ Core documents (Principles, North Star, Memory) with markdown editor
- ✅ Daily reviews (<60s completion time)
- ✅ 1-year goals with progress tracking
- ✅ Dashboard with statistics and insights
- ✅ Streak tracking for consistency
- ✅ Edit/Delete functionality with confirmations
- ✅ Toast notifications for better UX
- ✅ Mobile-responsive design with hamburger menu

**Ready for deployment to Vercel!**

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Auth:** NextAuth.js v5
- **Storage:** Supabase Storage
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
- **Upload** - File metadata for past documents

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
DATABASE_URL=                    # Supabase PostgreSQL connection string
NEXTAUTH_URL=                    # http://localhost:3000 (dev) or your domain (prod)
NEXTAUTH_SECRET=                 # Generate with: openssl rand -base64 32
NEXT_PUBLIC_SUPABASE_URL=        # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Your Supabase anon key
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
- [ ] Deploy to Vercel (next step!)

### Phase 2: Review System - Weeks 4-5
- [ ] Weekly reviews
- [ ] Quarterly reviews
- [ ] Annual reviews

### Phase 3: Intelligence - Weeks 6-8
- [ ] Interviews (3 types)
- [ ] File uploads
- [ ] Search functionality
- [ ] Pattern recognition
- [ ] Export (markdown, PDF)

### Phase 4: Growth - Ongoing
- [ ] Frameworks
- [ ] Reminders/notifications
- [ ] AI-powered insights
- [ ] Payment integration (Stripe)

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
