# 🔧 Environment Variables Setup Guide

## ❌ Common Deployment Error
```
Database connection error: The `uri` parameter to `openUri()` must be a string, got "undefined"
```

This means `MONGODB_URI` is not set in your deployment environment!

## 📋 Required Environment Variables

### **For Render.com:**
Go to your service → Settings → Environment → Add environment variable:

| Key | Value | Required |
|-----|-------|----------|
| `NODE_ENV` | `production` | ✅ |
| `PORT` | `10000` | ✅ |
| `MONGODB_URI` | `mongodb+srv://biosejohn_db_user:CcysloGwhCaAaCUB@cluster123.q8f3jcf.mongodb.net/construction-website?retryWrites=true&w=majority` | ✅ |
| `JWT_SECRET` | `your-super-secret-jwt-key-here-change-in-production-xyz123` | ✅ |
| `GMAIL_USER` | `your-actual-gmail@gmail.com` | ✅ |
| `GMAIL_APP_PASSWORD` | `your-16-char-app-password` | ✅ |
| `ADMIN_EMAIL` | `your-admin@gmail.com` | ✅ |
| `COMPANY_EMAIL` | `info@octadengineering.com` | ✅ |
| `FRONTEND_URL` | `https://octad-engineering-website-duaz-dxvctv8nu-allian-johns-projects.vercel.app` | ✅ |

### **For Heroku:**
Go to Settings → Config Vars → Reveal Config Vars → Add:

Same variables as above.

### **For Railway:**
Go to your project → Variables tab → Add:

Same variables as above.

---

## 🔐 Gmail SMTP Setup (Critical!)

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if not already enabled

### Step 2: Generate App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click "2-Step Verification"
3. Scroll down to "App passwords"
4. Select "Mail" and generate password
5. Copy the 16-character password (format: `abcd-efgh-ijkl-mnop`)

### Step 3: Use App Password
- `GMAIL_USER`: Your Gmail address (e.g., `john@gmail.com`)
- `GMAIL_APP_PASSWORD`: The 16-character app password (**without spaces or dashes**)
  - ❌ Wrong: `abcd-efgh-ijkl-mnop`
  - ✅ Correct: `abcdefghijklmnop`

---

## ⚠️ Common Mistakes

### 1. **MONGODB_URI Not Set**
❌ **Error**: `got "undefined"`
✅ **Fix**: Make sure you copy the EXACT MongoDB URI from above

### 2. **Gmail App Password Wrong Format**
❌ **Wrong**: `abcd-efgh-ijkl-mnop` (with dashes)
✅ **Correct**: `abcdefghijklmnop` (no spaces/dashes)

### 3. **Missing Environment Variables**
❌ **Error**: Email sending fails, JWT errors, CORS issues
✅ **Fix**: Set ALL required variables listed above

### 4. **Wrong Frontend URL**
❌ **Error**: CORS blocking requests from frontend
✅ **Fix**: Use exact Vercel URL: `https://octad-engineering-website-duaz-dxvctv8nu-allian-johns-projects.vercel.app`

---

## 🔍 How to Debug

After setting environment variables, check your deployment logs for:

```bash
📋 Environment Variables Status:
   NODE_ENV: production
   PORT: 10000
   MONGODB_URI: ✅ Set
   JWT_SECRET: ✅ Set
   GMAIL_USER: ✅ Set
   GMAIL_APP_PASSWORD: ✅ Set
   FRONTEND_URL: ✅ Set
```

If you see ❌ Missing for any variable, it's not set correctly.

---

## 🎯 Quick Checklist

Before testing your deployment:

- [ ] All 9 environment variables added
- [ ] MONGODB_URI is the exact string from above
- [ ] Gmail App Password is 16 characters, no spaces/dashes
- [ ] Gmail 2FA is enabled
- [ ] Frontend URL matches your Vercel deployment

---

**Set these variables correctly and your backend will work perfectly!** ✅