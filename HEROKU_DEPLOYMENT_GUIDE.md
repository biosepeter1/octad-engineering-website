# 🚀 Heroku Backend Deployment Guide (Alternative)

## Why Heroku?
- ✅ Very reliable and established
- ✅ Easy GitHub integration
- ✅ Good free tier (with some limitations)
- ✅ Simple setup process

## Quick Setup Steps

### 1. Create Heroku Account
1. Go to [heroku.com](https://heroku.com)
2. Sign up for free account
3. Verify your email

### 2. Deploy from GitHub
1. **Login to Heroku Dashboard**
   - Click "New" → "Create new app"

2. **App Settings**
   ```
   App name: octad-backend (or any available name)
   Region: United States or Europe (closest to you)
   ```

3. **Connect GitHub**
   - Go to "Deploy" tab
   - Select "GitHub" as deployment method
   - Connect your GitHub account
   - Search for: `octad-engineering-website`
   - Click "Connect"

4. **Configure Deployment**
   - ⚠️ **IMPORTANT**: In "App directory" field, enter: `backend`
   - Enable "Automatic deploys" from main branch
   - Click "Deploy Branch" for first deployment

### 3. Environment Variables
Go to "Settings" tab → "Config Vars" → "Reveal Config Vars" and add:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://biosejohn_db_user:CcysloGwhCaAaCUB@cluster123.q8f3jcf.mongodb.net/construction-website?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production-xyz123

# Gmail SMTP
GMAIL_USER=your-actual-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=your-admin@gmail.com
COMPANY_EMAIL=info@octadengineering.com

# Frontend URL
FRONTEND_URL=https://octad-engineering-website-duaz-dxvctv8nu-allian-johns-projects.vercel.app
```

### 4. Test Deployment
- Your app will be available at: `https://your-app-name.herokuapp.com`
- Test health check: `https://your-app-name.herokuapp.com/health`

---

## 📝 Notes

- **Free Tier**: Heroku free tier has some limitations (app sleeps after 30 min inactivity)
- **Custom Domain**: Can add custom domain on paid plans
- **Logs**: View logs with `heroku logs --tail` (if you install Heroku CLI)

---

**Deploy with Heroku if Render doesn't work!** 🎉