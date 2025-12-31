# Deployment Guide

## Pre-Deployment Checklist

### 1. Database Setup
- ✅ Supabase project created
- ✅ Database schema deployed (`npm run db:push`)
- ✅ DATABASE_URL configured in `.env`

### 2. Environment Variables
Ensure you have these variables ready:
- `DATABASE_URL` - Your Supabase PostgreSQL connection string
- `NEXTAUTH_URL` - Your production URL (e.g., `https://your-app.vercel.app`)
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`

---

## Deploy to Vercel

### Step 1: Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - CEO Personal OS MVP"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/ceo-os-app.git
git branch -M main
git push -u origin main
```

### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)

### Step 3: Add Environment Variables
In Vercel project settings → Environment Variables, add:

```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-generated-secret-here
```

**Note**: Vercel will give you a deployment URL. Update `NEXTAUTH_URL` with that URL.

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Visit your deployment URL
4. Test signup and login

---

## Post-Deployment

### Update NEXTAUTH_URL
After first deployment:
1. Copy your Vercel deployment URL (e.g., `https://ceo-os-app.vercel.app`)
2. Update `NEXTAUTH_URL` environment variable in Vercel
3. Redeploy (Vercel → Deployments → Redeploy)

### Custom Domain (Optional)
1. Vercel → Settings → Domains
2. Add your custom domain
3. Update `NEXTAUTH_URL` to match custom domain
4. Redeploy

---

## Testing After Deployment

1. **Signup**: Create a new account
2. **Login**: Verify authentication works
3. **Daily Review**: Create a daily check-in
4. **Goals**: Create a 1-year goal
5. **Documents**: Edit Principles, North Star, Memory
6. **Mobile**: Test on mobile device

---

## Troubleshooting

### Build Errors
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript types compile locally: `npm run build`

### Authentication Issues
- Verify `NEXTAUTH_URL` matches deployment URL exactly
- Check `NEXTAUTH_SECRET` is set
- Ensure database is accessible from Vercel IPs

### Database Connection Errors
- Verify `DATABASE_URL` is correct
- Check Supabase connection pooling is enabled
- Ensure Supabase project is not paused

---

## Continuous Deployment

Once set up, every push to `main` branch automatically deploys to Vercel.

To deploy:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel will automatically build and deploy within 2-3 minutes.

---

## Environment Variables Reference

| Variable | Example | Purpose |
|----------|---------|---------|
| `DATABASE_URL` | `postgresql://postgres:...` | Supabase database connection |
| `NEXTAUTH_URL` | `https://app.vercel.app` | Your production URL |
| `NEXTAUTH_SECRET` | `random-32-byte-string` | JWT signing secret |

---

## Next Steps After Deployment

1. Invite beta testers
2. Monitor Vercel Analytics
3. Check Supabase database usage
4. Gather user feedback
5. Iterate based on feedback

**You're ready to launch!**
