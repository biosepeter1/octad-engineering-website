# 🚂 Railway Backend Deployment Guide

## Quick Setup Steps

### 1. Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with your GitHub account (recommended for easy repo integration)
3. Verify your account

### 2. Deploy from GitHub Repository
1. **Login to Railway Dashboard**
   - Click "New Project" on Railway dashboard
   
2. **Connect GitHub Repository**
   - Click "Deploy from GitHub repo"
   - Select your repository: `biosepeter1/octad-engineering-website`
   - Railway will show the repository structure

3. **Configure Root Directory** 
   - ⚠️ **IMPORTANT**: Set the root directory to `backend` (not the repository root)
   - This ensures Railway deploys only the backend folder
   - In project settings → Root Directory → Enter: `backend`

4. **Environment Variables Setup**
   Click on your deployed service → Settings → Variables tab, then add:
   
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://biosejohn_db_user:CcysloGwhCaAaCUB@cluster123.q8f3jcf.mongodb.net/construction-website?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-here-change-in-production-xyz123
   
   # Gmail SMTP (Replace with your actual Gmail credentials)
   GMAIL_USER=your-actual-gmail@gmail.com
   GMAIL_APP_PASSWORD=your-16-char-app-password
   ADMIN_EMAIL=your-admin@gmail.com
   COMPANY_EMAIL=info@octadengineering.com
   
   # Frontend URL (will be your Vercel URL)
   FRONTEND_URL=https://octad-engineering-website-duaz-dxvctv8nu-allian-johns-projects.vercel.app
   ```

### 3. Deploy Configuration
Railway should automatically detect:
- ✅ **Start Command**: `npm start` (from package.json)
- ✅ **Build Command**: `npm install` (automatic)
- ✅ **Health Check**: `/health` endpoint (configured in railway.json)

### 4. Domain & URL
After deployment completes:
- Railway will provide a URL like: `https://your-app-name-production.up.railway.app`
- Copy this URL - you'll need it to update your frontend

### 5. Test Deployment
- Visit: `https://your-railway-url/health`
- Should return: `{"success": true, "message": "Server is running", "timestamp": "..."}`

## 🔧 Gmail SMTP Setup (Required)

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled

### Step 2: Generate App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click "2-Step Verification"
3. Scroll down to "App passwords"
4. Generate new app password for "Mail"
5. Copy the 16-character password (format: xxxx-xxxx-xxxx-xxxx)

### Step 3: Update Railway Environment Variables
In Railway dashboard → Your Project → Settings → Variables:
- `GMAIL_USER`: Your Gmail address (e.g., yourname@gmail.com)
- `GMAIL_APP_PASSWORD`: The 16-character app password (without spaces)
- `ADMIN_EMAIL`: Where admin emails should be sent
- `COMPANY_EMAIL`: Company email for replies

## ✅ What's Already Configured

The backend is fully prepared with:
- ✅ Railway.json configuration
- ✅ Procfile for deployment
- ✅ Health check endpoint
- ✅ CORS configured for Vercel frontend
- ✅ MongoDB connection
- ✅ All API routes and email functionality
- ✅ File upload handling
- ✅ Security middleware (helmet, rate limiting)

## 🚀 Next Steps After Railway Deployment

1. **Get Railway URL**: Copy your Railway app URL
2. **Update Frontend**: Update frontend API URLs to use Railway backend
3. **Test Integration**: Test contact form and admin functionality
4. **Monitor**: Check Railway logs for any issues

## 📝 Notes

- **Free Tier**: Railway offers $5 free credit monthly (plenty for small apps)
- **Auto Deploy**: Any push to `main` branch will auto-redeploy
- **Logs**: View real-time logs in Railway dashboard
- **Scaling**: Easily scale if needed in Railway dashboard

## ⚠️ Important

Make sure to:
- Set the correct root directory (`backend`)
- Add all environment variables
- Set up Gmail SMTP credentials
- Update frontend to use Railway backend URL

---
**Ready to deploy!** 🎉