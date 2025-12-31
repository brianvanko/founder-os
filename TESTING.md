# Testing Guide

This guide explains how to test all features of the Founder Personal OS without requiring payment or external API keys.

## Development Mode (No Payment Required)

The app is designed to work fully in development mode without Stripe or OpenAI API keys. All features are available for free during development.

## Required Setup

### Minimum Required Environment Variables

```env
# Database (Required)
DATABASE_URL="postgresql://..."

# NextAuth (Required)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Supabase (Required for file uploads)
NEXT_PUBLIC_SUPABASE_URL="https://[your-project].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### Optional (Can Test Without)

```env
# OpenAI (Optional - shows dev mode message)
OPENAI_API_KEY="sk-..."

# Stripe (Optional - shows dev mode message)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_ID="price_..."
```

## Testing Features Without External APIs

### 1. Core Features (Always Available)
✅ **Authentication** - Email/password signup and login
✅ **Daily Reviews** - Quick 5-question check-ins
✅ **Weekly Reviews** - Progress and energy tracking
✅ **Quarterly Reviews** - Life Map ratings
✅ **Annual Reviews** - Full reflection framework
✅ **Goals** - 1/3/10-year goal tracking
✅ **Interviews** - Three guided interview types
✅ **Documents** - Principles, North Star, Memory
✅ **Framework Templates** - 7 framework types
✅ **Search** - Full-text search across all content
✅ **Timeline** - Chronological view of all content
✅ **Export** - Download all data as markdown

### 2. File Uploads (Requires Supabase)
- Set up a free Supabase project
- Configure storage bucket named "uploads"
- Add environment variables
- Test uploading PDF, DOCX, TXT, MD files (max 10MB)

**Without Supabase:** File upload page will error. All other features work.

### 3. AI Insights (Optional)
**With OpenAI API Key:**
- Get API key from platform.openai.com
- Add to .env file
- Test generating insights from reviews

**Without OpenAI API Key:**
- Insights page shows friendly error message
- Explains how to enable the feature
- All other features work normally

**Cost:** ~$0.01-0.05 per insight generation with GPT-4o-mini

### 4. Billing/Payments (Optional)
**With Stripe:**
- Set up Stripe test mode account
- Create a product and price
- Add webhook endpoint
- Test subscription flow with test cards

**Without Stripe:**
- Billing page shows "Development Mode" message
- All features available for free
- No payment required

**Stripe Test Cards:**
- Success: 4242 4242 4242 4242
- Requires Auth: 4000 0025 0000 3155
- Declined: 4000 0000 0000 9995

## Quick Start Testing

1. **Minimal Setup** (Database + Auth only)
   ```bash
   npm install
   npm run db:push
   npm run dev
   ```

2. **Create Account**
   - Navigate to http://localhost:3000
   - Click "Get Started"
   - Sign up with email/password

3. **Test Core Features** (No API keys needed)
   - Daily review: Create and complete a daily check-in
   - Goals: Add a 1-year goal
   - Documents: Edit your Principles document
   - Search: Search for content you created
   - Timeline: View chronological timeline
   - Export: Download your data

4. **Test Optional Features** (Add API keys as needed)
   - File uploads: Requires Supabase Storage
   - AI insights: Requires OpenAI API key
   - Billing: Requires Stripe test mode

## Feature Testing Checklist

### Reviews System
- [ ] Create daily review (<60s)
- [ ] Edit existing daily review
- [ ] Delete daily review
- [ ] Create weekly review
- [ ] Create quarterly review with Life Map ratings
- [ ] Create annual review with full framework
- [ ] View review history for each type

### Goals
- [ ] Create 1-year goal
- [ ] Create 3-year goal
- [ ] Create 10-year goal
- [ ] Update goal progress (1-10 rating)
- [ ] Change goal status (on_track, off_track, completed)
- [ ] Edit goal details
- [ ] Delete goal

### Interviews
- [ ] Complete Past Year Reflection interview
- [ ] Complete Identity & Values interview
- [ ] Complete Future Self interview
- [ ] View completed interviews

### Documents & Frameworks
- [ ] Edit Principles document
- [ ] Edit North Star document
- [ ] Edit Memory document
- [ ] Use Annual Review framework template
- [ ] Use Vivid Vision framework template
- [ ] Use Ideal Life Costing framework
- [ ] Use Life Map framework

### Search & Navigation
- [ ] Search for specific content
- [ ] View timeline of all content
- [ ] Navigate between different sections
- [ ] Mobile menu works correctly

### Data Management
- [ ] Export all data to markdown
- [ ] Upload file (if Supabase configured)
- [ ] Download uploaded file
- [ ] Delete uploaded file

### AI Features (If OpenAI configured)
- [ ] Generate insights from recent reviews
- [ ] Generate insights from goals
- [ ] Generate comprehensive analysis
- [ ] Copy insights to clipboard

### Billing (If Stripe configured)
- [ ] View billing page
- [ ] Start subscription checkout
- [ ] Manage billing in customer portal
- [ ] Cancel subscription

## Development Tips

### Reset Database
```bash
npx prisma db push --force-reset
```

### View Database
```bash
npm run db:studio
```

### Check Build
```bash
npm run build
```

### Run Tests
```bash
npm run dev
# Open http://localhost:3000 and test features
```

## Common Issues

### "Unauthorized" errors
- Make sure you're logged in
- Clear browser cookies and log in again

### File upload fails
- Check Supabase Storage is configured
- Verify bucket "uploads" exists
- Check file size (<10MB)

### AI insights not working
- Verify OPENAI_API_KEY is set
- Check OpenAI account has credits
- Review API usage at platform.openai.com

### Payment not working
- Use Stripe test mode keys
- Use test card numbers
- Check webhook is configured

## Production Deployment

When deploying to production:
1. Set all environment variables in Vercel
2. Configure Stripe webhook URL
3. Enable Supabase RLS policies
4. Test with real accounts (not admin)

## Support

If you encounter issues:
1. Check console for errors
2. Verify environment variables are set
3. Review this testing guide
4. Check the main README.md

---

**All features work without payment in development mode!**
