# Pixella Deployment Guide

## Vercel Deployment (Recommended)

### 1. Prerequisites
- GitHub account
- Vercel account (free)
- Domain name (optional: pixella.dev)

### 2. Prepare for Deployment

#### A. Ensure all environment variables are set
Create `.env.production` with:
```env
# Supabase (Production)
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# NextAuth
NEXTAUTH_URL=https://pixella.dev
NEXTAUTH_SECRET=your_production_secret

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Stripe (if using)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
```

#### B. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Pixella MVP"
git branch -M main
git remote add origin your-github-repo-url
git push -u origin main
```

### 3. Deploy to Vercel

#### Via Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
5. Add Environment Variables (copy from `.env.production`)
6. Click "Deploy"

#### Via Vercel CLI:
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### 4. Configure Custom Domain

1. In Vercel Dashboard → Settings → Domains
2. Add custom domain: `pixella.dev`
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-10 minutes)
5. SSL certificate auto-configured ✅

### 5. Environment Variables in Vercel

Go to Project Settings → Environment Variables and add all from `.env.production`

**Important:** 
- Mark sensitive keys as "Encrypted"
- Separate values for Production/Preview/Development if needed

### 6. Performance Optimization

#### Enable Vercel Features:
- ✅ Edge Functions
- ✅ Image Optimization  
- ✅ Analytics
- ✅ Speed Insights

#### Check Build Output:
```bash
npm run build
```
Look for:
- ✅ All routes successfully built
- ✅ No build errors
- ✅ Bundle size < 500KB

### 7. Post-Deployment Checks

#### A. Run Lighthouse Audit
```bash
npm install -g lighthouse
lighthouse https://pixella.dev --view
```

**Targets:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

#### B. Test Critical Flows
- [ ] Sign up flow
- [ ] Login flow
- [ ] Resume upload
- [ ] Job browsing
- [ ] Job application
- [ ] Interview prep

#### C. Monitor Logs
- Check Vercel Dashboard → Deployments → View Logs
- Look for any errors
- Monitor OpenAI API usage

### 8. Set Up Monitoring

#### Vercel Analytics (Built-in)
- Automatically enabled
- Track Web Vitals
- Monitor performance

#### Error Tracking (Optional: Sentry)
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### 9. Database Migration

Ensure Supabase production database is set up:
1. Create production Supabase project
2. Run migrations:
   - `001_initial_schema.sql`
   - `002_rls_policies.sql`
3. Enable pgvector extension
4. Verify RLS policies active

### 10. CI/CD Pipeline

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
```

### 11. Backup Strategy

#### Database Backups:
- Supabase Pro: Daily automatic backups
- Manual: Use Supabase CLI
```bash
supabase db dump > backup.sql
```

#### Code Backups:
- GitHub repository
- Vercel deployment history (rollback ready)

### 12. Scaling Considerations

#### When you reach 1000+ users:
- [ ] Upgrade Supabase to Pro ($25/month)
- [ ] Enable Vercel Pro ($20/month)
- [ ] Add Redis caching layer
- [ ] Implement rate limiting
- [ ] Set up CDN for static assets

#### When you reach 10,000+ users:
- [ ] Consider dedicated database
- [ ] Implement queue system
- [ ] Add load balancing
- [ ] Optimize database indexes
- [ ] Consider microservices architecture

---

## Alternative: Self-Hosted Deployment

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t pixella .
docker run -p 3000:3000 --env-file .env.production pixella
```

### AWS/GCP/Azure
- Use container services (ECS, Cloud Run, App Service)
- Configure environment variables
- Set up load balancer
- Enable auto-scaling

---

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working
- Check Vercel Dashboard → Settings → Environment Variables
- Redeploy after adding new variables
- Verify variable names match exactly

### Database Connection Issues
- Verify Supabase URL and keys
- Check Supabase service status
- Verify RLS policies allow access

### High Response Times
- Enable Vercel Edge Functions
- Add Redis caching
- Optimize database queries
- Use Vercel Image Optimization

---

## Launch Checklist

- [ ] All environment variables configured
- [ ] Database migrated and tested
- [ ] Custom domain connected
- [ ] SSL certificate active
- [ ] Analytics tracking verified
- [ ] Error monitoring set up
- [ ] Performance tests passed
- [ ] Security audit completed
- [ ] Backup strategy in place
- [ ] Monitoring alerts configured
- [ ] Documentation updated
- [ ] Team trained on operations

---

## Success! 🎉

Your Pixella platform is now live!

**Next Steps:**
1. Announce launch on social media
2. Invite beta users
3. Monitor analytics daily
4. Collect user feedback
5. Iterate and improve

**Support:**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
