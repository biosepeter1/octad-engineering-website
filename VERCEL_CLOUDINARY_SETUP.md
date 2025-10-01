# Setting up Cloudinary on Vercel Production

## Issue
The production deployment on Vercel (`octad-engineering-website-duaz.vercel.app`) is showing 500 errors when uploading images because the Cloudinary environment variables are not configured in the production environment.

## Solution: Add Environment Variables to Vercel

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Find your project: `octad-engineering-website`

2. **Navigate to Project Settings**
   - Click on your project
   - Go to "Settings" tab
   - Click on "Environment Variables" in the sidebar

3. **Add Cloudinary Environment Variables**
   
   Add these three environment variables:
   
   | Name | Value | Environment |
   |------|-------|-------------|
   | `CLOUDINARY_CLOUD_NAME` | `dz67jupld` | Production |
   | `CLOUDINARY_API_KEY` | `374386584158663` | Production |
   | `CLOUDINARY_API_SECRET` | `a0GjzaKDJTyqSesQnLGCsLzPx_k` | Production |

4. **Redeploy**
   - After adding the environment variables
   - Go to "Deployments" tab
   - Click "Redeploy" on the latest deployment
   - Or push a new commit to trigger automatic deployment

### Method 2: Via Vercel CLI

If you have Vercel CLI installed:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Add environment variables
vercel env add CLOUDINARY_CLOUD_NAME production
# Enter value: dz67jupld

vercel env add CLOUDINARY_API_KEY production  
# Enter value: 374386584158663

vercel env add CLOUDINARY_API_SECRET production
# Enter value: a0GjzaKDJTyqSesQnLGCsLzPx_k

# Deploy with new environment variables
vercel --prod
```

## Testing After Setup

### Test Local Development (Working Now)
- Frontend: `http://localhost:3000/admin/login`
- Backend: `http://localhost:5000`
- Status: ✅ **Already working with Cloudinary**

### Test Production (After Vercel Setup)
- Frontend: `https://octad-engineering-website-duaz.vercel.app/admin/login`
- Backend: Your production backend URL
- Status: ⏳ **Will work after environment variables are added**

## Security Notes

1. **Environment Variables are Secure**
   - Vercel encrypts environment variables
   - They're only accessible to your deployment
   - Not visible in client-side code

2. **Backend Only**
   - Cloudinary credentials are used server-side only
   - Frontend receives image URLs, not credentials

## Verification

After adding environment variables to Vercel:

1. Check deployment logs for Cloudinary status
2. Test image upload in production admin panel
3. Verify images appear in your Cloudinary dashboard under `construction-website/` folder

## Current Status

- ✅ **Local Development**: Cloudinary fully working
- ⏳ **Production**: Needs environment variables in Vercel
- ✅ **Code**: All changes committed and pushed to GitHub
- ✅ **Integration**: Tested and verified locally

## Recommendation

**For immediate testing**: Use local development at `http://localhost:3000`
**For production**: Add environment variables to Vercel using Method 1 above