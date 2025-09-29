# 🚀 Render.com Backend Deployment Guide

## Why Render.com?
- ✅ Free tier available
- ✅ Excellent GitHub integration
- ✅ Automatic deployments
- ✅ Easy environment variable management
- ✅ Great for Node.js apps

## Quick Setup Steps

### 1. Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account (recommended)
3. Verify your email

### 2. Deploy Web Service
1. **Login to Render Dashboard**
   - Click "New +" → "Web Service"

2. **Connect GitHub Repository**
   - Click "Connect a repository"
   - Select your repository: `biosepeter1/octad-engineering-website`
   - Click "Connect"

3. **Configure Service Settings**
   ```
   Name: octad-backend (or any name you prefer)
   Region: Oregon (US West) or closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Choose Plan**
   - Select "Free" plan (perfect for testing)
   - Free plan includes 750 hours/month

### 3. Environment Variables
Click "Advanced" → "Add Environment Variable" and add each:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://biosejohn_db_user:CcysloGwhCaAaCUB@cluster123.q8f3jcf.mongodb.net/construction-website?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production-xyz123

# Gmail SMTP (Replace with your actual credentials)
GMAIL_USER=your-actual-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=your-admin@gmail.com
COMPANY_EMAIL=info@octadengineering.com

# Frontend URL
FRONTEND_URL=https://octad-engineering-website-duaz-dxvctv8nu-allian-johns-projects.vercel.app
```

### 4. Deploy
- Click "Create Web Service"
- Render will automatically build and deploy
- You'll get a URL like: `https://octad-backend.onrender.com`

### 5. Test Deployment
- Visit: `https://your-render-url.onrender.com/health`
- Should return: `{"success": true, "message": "Server is running"}`

---

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

### Step 3: Update Render Environment Variables
In Render dashboard → Your Service → Environment:
- `GMAIL_USER`: Your Gmail address
- `GMAIL_APP_PASSWORD`: The 16-character app password (no spaces)
- `ADMIN_EMAIL`: Where admin emails should be sent

---

## ✅ What's Ready

Your backend is fully configured with:
- ✅ All API routes (auth, services, projects, about, contact)
- ✅ MongoDB connection
- ✅ Email functionality with Gmail SMTP
- ✅ File upload handling  
- ✅ Security middleware
- ✅ CORS configured for your Vercel frontend
- ✅ Health check endpoint

---

## 🚀 Next Steps After Deployment

1. **Copy Render URL**: Get your app URL from Render dashboard
2. **Update Frontend**: Update frontend to use Render backend URL
3. **Test**: Test contact form and admin panel functionality

---

## 📝 Notes

- **Free Tier**: Render free tier includes 750 hours/month
- **Auto Deploy**: Pushes to `main` branch auto-deploy
- **Logs**: View real-time logs in Render dashboard
- **Custom Domain**: Add custom domain if needed

---

**Let's deploy!** 🎉