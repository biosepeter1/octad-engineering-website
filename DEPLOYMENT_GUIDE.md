# 🚀 Deployment Guide - Octad Engineering Website

This guide covers deploying your full-stack construction website with proper separation of frontend and backend services.

## 🏗️ **Deployment Architecture**

```
Frontend (Next.js) → Vercel
Backend (Node.js)   → Railway/Render/Heroku
Database           → MongoDB Atlas (Cloud)
```

## 📱 **Frontend Deployment (Vercel)**

### Option 1: Deploy Frontend Folder Only (Recommended)

#### Step 1: Create Separate Frontend Repository
```bash
# Create a new directory for frontend-only
mkdir octad-frontend-deploy
cd octad-frontend-deploy

# Copy frontend files
cp -r ../construction-website/frontend/* .
cp ../construction-website/frontend/.[^.]* . 2>/dev/null || true

# Initialize new git repo
git init
git add .
git commit -m "Initial frontend deployment"

# Create new GitHub repo and push
# Repository name: octad-engineering-frontend
git remote add origin https://github.com/biosepeter1/octad-engineering-frontend.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy to Vercel
1. **Go to [vercel.com](https://vercel.com)**
2. **Connect GitHub** account
3. **Import** `octad-engineering-frontend` repository
4. **Framework**: Next.js (auto-detected)
5. **Root Directory**: Leave empty (default)
6. **Environment Variables**: Add these in Vercel dashboard:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
   ```
7. **Deploy**!

### Option 2: Deploy from Monorepo (Alternative)

If you want to keep the monorepo structure:

1. **In Vercel Dashboard**:
   - **Framework**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

## 🖥️ **Backend Deployment**

### Option A: Railway (Recommended - Easy & Free)

#### Step 1: Prepare Backend
```bash
# In your backend directory
cd backend

# Create Procfile
echo "web: node src/server.js" > Procfile

# Update package.json with start script
```

Add to `backend/package.json`:
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

#### Step 2: Deploy to Railway
1. **Go to [railway.app](https://railway.app)**
2. **Sign up** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select** your `octad-engineering-website` repository
5. **Settings** → **Environment Variables**:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-secure-jwt-secret
   GMAIL_USER=your-gmail@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   ADMIN_EMAIL=your-admin@gmail.com
   PORT=5000
   NODE_ENV=production
   ```
6. **Deploy Settings**:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
7. **Deploy**!

### Option B: Render (Alternative)

1. **Go to [render.com](https://render.com)**
2. **New** → **Web Service**
3. **Connect** your GitHub repository
4. **Settings**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Add all variables listed above

### Option C: Heroku (Traditional)

```bash
# Install Heroku CLI first
cd backend

# Create Heroku app
heroku create octad-backend

# Set environment variables
heroku config:set MONGODB_URI="your-connection-string"
heroku config:set JWT_SECRET="your-jwt-secret"
heroku config:set GMAIL_USER="your-gmail@gmail.com"
heroku config:set GMAIL_APP_PASSWORD="your-app-password"

# Deploy
git subtree push --prefix=backend heroku main
```

## 🗄️ **Database Setup (MongoDB Atlas)**

1. **Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)**
2. **Create free cluster**
3. **Database Access** → Create user
4. **Network Access** → Allow all IPs (`0.0.0.0/0`) for production
5. **Connect** → Get connection string
6. **Replace** `<password>` and `<dbname>` in connection string

## 🔧 **Environment Variables Setup**

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://octad-backend.railway.app/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
```

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/octad?retryWrites=true&w=majority
JWT_SECRET=super-secure-random-string-here
GMAIL_USER=info@octadengineering.com
GMAIL_APP_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=admin@octadengineering.com
PORT=5000
NODE_ENV=production
```

## ✅ **Deployment Checklist**

### Before Deploying:
- [ ] **MongoDB Atlas** cluster created and connection string ready
- [ ] **Gmail App Password** generated and tested
- [ ] **Google Maps API** key obtained (optional)
- [ ] **Environment variables** documented
- [ ] **Admin user** created in database

### Frontend Deployment:
- [ ] **Vercel** account connected to GitHub
- [ ] **Repository** pushed to GitHub
- [ ] **Environment variables** set in Vercel dashboard
- [ ] **API URL** pointing to deployed backend
- [ ] **Custom domain** configured (optional)

### Backend Deployment:
- [ ] **Railway/Render/Heroku** account created
- [ ] **Repository** connected
- [ ] **Environment variables** configured
- [ ] **Database connection** tested
- [ ] **Email service** working

### Post-Deployment:
- [ ] **Frontend** loads correctly
- [ ] **API endpoints** responding
- [ ] **Admin login** working
- [ ] **Contact form** sends emails
- [ ] **File uploads** working
- [ ] **Database operations** successful

## 🌐 **Domain Configuration**

### Custom Domain (Optional)
1. **Buy domain** (Namecheap, GoDaddy, etc.)
2. **Vercel**: Add domain in project settings
3. **Backend**: Configure CORS for new domain
4. **Update** API URL in frontend environment

## 🚨 **Common Deployment Issues**

### "FUNCTION_INVOCATION_FAILED" on Vercel
- **Cause**: API routes failing or backend not reachable
- **Fix**: Check `NEXT_PUBLIC_API_URL` environment variable

### "Database connection failed"
- **Cause**: Wrong MongoDB connection string
- **Fix**: Verify MongoDB Atlas IP whitelist and credentials

### "Gmail SMTP not working"
- **Cause**: Wrong App Password or 2FA not enabled
- **Fix**: Regenerate Gmail App Password

### "Build failed" on Vercel
- **Cause**: Missing dependencies or environment variables
- **Fix**: Check build logs and ensure all env vars are set

## 📊 **Monitoring & Maintenance**

### Performance Monitoring:
- **Vercel Analytics**: Built-in performance monitoring
- **Railway Metrics**: Server performance tracking
- **MongoDB Atlas**: Database performance monitoring

### Logs Access:
- **Vercel**: Function logs in dashboard
- **Railway**: Real-time logs in dashboard
- **MongoDB**: Database logs and metrics

## 🔄 **CI/CD Setup (Optional)**

### Automatic Deployments:
- **Frontend**: Auto-deploys on push to main branch (Vercel)
- **Backend**: Auto-deploys on push to main branch (Railway)
- **Database**: Automatic backups (MongoDB Atlas)

## 💰 **Cost Estimation**

### Free Tier Limits:
- **Vercel**: 100GB bandwidth, unlimited static sites
- **Railway**: $5 credit, 500 hours runtime
- **MongoDB Atlas**: 512MB storage, shared cluster
- **Gmail**: Free with personal account

### Paid Plans (if needed):
- **Vercel Pro**: $20/month per member
- **Railway**: Pay-as-you-use after free credit
- **MongoDB**: $9+/month for dedicated cluster

---

## 🎉 **Quick Deploy Commands**

If you want to separate and deploy immediately:

```bash
# 1. Create frontend-only repo
mkdir ../octad-frontend
cp -r frontend/* ../octad-frontend/
cd ../octad-frontend
git init && git add . && git commit -m "Frontend only"

# 2. Push to new GitHub repo
git remote add origin https://github.com/biosepeter1/octad-frontend.git
git push -u origin main

# 3. Deploy to Vercel
# - Connect GitHub repo to Vercel
# - Set NEXT_PUBLIC_API_URL environment variable

# 4. Deploy backend to Railway
# - Connect your main repo to Railway
# - Set root directory to "backend"
# - Add all environment variables
```

Your construction website will be live! 🏗️✨