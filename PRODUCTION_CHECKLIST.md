# Production Deployment Checklist

## Pre-Deployment

### 1. Environment Variables
- [ ] Copy all variables from `.env.local` to Vercel
- [ ] Verify Supabase URLs and keys
- [ ] Verify OpenAI API key
- [ ] Set NextAuth secret (production)
- [ ] Configure OAuth callbacks for production domain

### 2. Database
- [ ] Run all migrations on production Supabase
- [ ] Enable pgvector extension
- [ ] Verify RLS policies are active
- [ ] Create database backups
- [ ] Test database connections

### 3. Domain Setup
```bash
# Add domain in Vercel dashboard
# Update DNS records:
# A Record: @ -> 76.76.21.21
# CNAME: www -> cname.vercel-dns.com
```

### 4. SSL/TLS
- [ ] SSL certificate auto-provisioned by Vercel
- [ ] Verify HTTPS redirect enabled
- [ ] Test certificate on all subdomains

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Production ready"
git push origin main
```

### 2. Deploy to Vercel
```bash
vercel --prod
```

Or via dashboard:
1. Go to vercel.com
2. Import GitHub repository
3. Configure build settings
4. Deploy

### 3. Post-Deployment Verification

#### Test Critical Flows:
```bash
# Run Lighthouse
lighthouse https://pixella.dev --view

# Check targets:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 95+
# SEO: 100
```

- [ ] Sign up flow works
- [ ] Login flow works
- [ ] Resume upload works
- [ ] Job browsing works
- [ ] Job application works
- [ ] Interview prep works
- [ ] All API endpoints respond

## Monitoring Setup

### 1. Vercel Analytics
```bash
# Already enabled automatically
# View at: vercel.com/project/analytics
```

### 2. Error Monitoring
```javascript
// Sentry integration (optional)
// Already configured in lib/monitoring/sentry.ts
```

### 3. Performance Monitoring
- [ ] Enable Vercel Speed Insights
- [ ] Monitor Core Web Vitals
- [ ] Set up alerts for slow pages

## CDN & Caching

### 1. Vercel Edge Network
- Automatically enabled
- Assets cached at 100+ locations worldwide
- GZIP/Brotli compression enabled

### 2. Custom Caching Headers
```typescript
// Already configured in next.config.ts
export const config = {
  headers: {
    'Cache-Control': 'public, max-age=31536000, immutable'
  }
}
```

## Backup Strategy

### 1. Database Backups
```bash
# Supabase Pro: Daily automatic backups
# Manual backup:
supabase db dump > backup-$(date +%Y%m%d).sql
```

### 2. Code Backups
- GitHub repository (primary)
- Vercel deployment history (30 days)

### 3. User Data Backups
```bash
# Weekly automated backups to S3/Cloud Storage
# Retention: 30 days
```

## Monitoring & Alerts

### 1. Uptime Monitoring
- Use UptimeRobot or Vercel monitoring
- Check endpoints every 5 minutes
- Alert via email/Slack

### 2. Error Rate Monitoring
- Set threshold: > 1% error rate
- Alert immediately
- Review logs daily

### 3. Performance Monitoring
- Monitor P95 response times
- Alert if > 2s
- Weekly performance reviews

## Rollback Plan

### If Deployment Fails:
```bash
# Option 1: Rollback in Vercel dashboard
# Deployments → Previous deployment → Promote to Production

# Option 2: Revert git commit
git revert HEAD
git push origin main
```

## Success Criteria

- [ ] All pages load in < 2s
- [ ] No console errors
- [ ] All forms work
- [ ] Payment flow works
- [ ] Mobile responsive
- [ ] SEO meta tags present
- [ ] Analytics tracking
- [ ] Error monitoring active
- [ ] Backups configured
- [ ] Monitoring alerts set up

## Post-Launch

### Week 1:
- Monitor error rates daily
- Fix critical bugs immediately
- Collect user feedback

### Month 1:
- Review analytics
- Optimize slow pages
- Add requested features

---

## Emergency Contacts

- Vercel Support: support@vercel.com
- Supabase Support: support@supabase.com
- Domain Registrar: [Your registrar]

---

**Deployment Date:** _____________
**Deployed By:** _____________
**Status:** ✅ Production Live
