# 🔧 Backend Troubleshooting Guide

## Current Issues
1. ❌ Frontend connecting to localhost instead of Render
2. ❌ Render backend not responding to health checks
3. ❌ Login functionality failing

## Immediate Solutions

### 1. Fix Frontend Connection (CRITICAL)
**Go to Vercel Dashboard NOW:**
- URL: https://vercel.com/dashboard
- Project: `octad-engineering-website`
- Settings → Environment Variables → Add:
  - Name: `NEXT_PUBLIC_API_URL`
  - Value: `https://octad-engineering-website-2.onrender.com/api`
  - Environments: All (Production, Preview, Development)
- Then: Deployments → Redeploy

### 2. Wake Up Render Backend
Render free tier apps sleep after 15 minutes of inactivity. Try:
- Visit: https://octad-engineering-website-2.onrender.com/health
- Wait 30-60 seconds for it to wake up
- Try again: https://octad-engineering-website-2.onrender.com/api

### 3. Check Render Logs
1. Go to https://dashboard.render.com
2. Find your backend service
3. Click "Logs" to see what's happening
4. Look for database connection errors or missing environment variables

### 4. Verify Environment Variables in Render
Required environment variables in Render:
- `NODE_ENV=production`
- `PORT=10000`
- `MONGODB_URI=mongodb+srv://biosejohn_db_user:CcysloGwhCaAaCUB@cluster123.q8f3jcf.mongodb.net/construction-website?retryWrites=true&w=majority`
- `JWT_SECRET=your-super-secret-jwt-key-here-change-in-production-xyz123`
- `GMAIL_USER=your-actual-gmail@gmail.com`
- `GMAIL_APP_PASSWORD=your-16-char-app-password`
- `ADMIN_EMAIL=your-admin@gmail.com`
- `COMPANY_EMAIL=info@octadengineering.com`
- `FRONTEND_URL=https://octad-engineering-website-duaz-dxvctv8nu-allian-johns-projects.vercel.app`

## Expected Results After Fix

✅ Frontend will connect to: `https://octad-engineering-website-2.onrender.com/api/auth/login`
✅ No more CORS errors
✅ No more localhost connection errors
✅ Login page will work (once admin credentials are created)

## Create Admin User
Once backend is working, create admin credentials by visiting:
`https://octad-engineering-website-2.onrender.com/api/auth/setup` (if setup endpoint exists)

Or create manually through MongoDB Atlas dashboard.

---
**Priority: Fix Vercel environment variables FIRST!**