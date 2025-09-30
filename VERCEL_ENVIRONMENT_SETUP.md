# 🚀 Vercel Environment Variables Setup Guide

## ✅ Backend Successfully Deployed
Your backend is now running on Render at:
**https://octad-engineering-website-2.onrender.com**

## 🔧 Update Vercel Environment Variables

To connect your deployed frontend to the Render backend, you need to update the environment variables in Vercel:

### Steps:

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project: `octad-engineering-website`

2. **Navigate to Settings**
   - Click on your project → Settings tab
   - Click "Environment Variables" in the left sidebar

3. **Add/Update Environment Variables**
   Add these environment variables:

   | Variable Name | Value | Environments |
   |---------------|--------|-------------|
   | `NEXT_PUBLIC_API_URL` | `https://octad-engineering-website-2.onrender.com/api` | Production, Preview, Development |
   | `NEXT_PUBLIC_SITE_NAME` | `Octad Engineering Limited` | Production, Preview, Development |
   | `NEXT_PUBLIC_SITE_URL` | `https://octad-engineering-website-duaz-dxvctv8nu-allian-johns-projects.vercel.app` | Production, Preview, Development |

4. **Redeploy Your Frontend**
   - Go to "Deployments" tab
   - Click "Redeploy" on the latest deployment
   - Or push a new commit to trigger automatic deployment

## 🧪 Test the Integration

After redeployment, test these features on your live site:

### ✅ Test Checklist:
- [ ] **Contact Form**: Submit a message and check if it works
- [ ] **Admin Panel**: Login at `/admin/login` (if credentials are set)
- [ ] **Logo Display**: Verify the logo loads correctly
- [ ] **Services Page**: Check if services load from backend
- [ ] **Projects Page**: Verify projects display properly

## 📋 Backend Status Check

Test your backend directly:
- **Health Check**: https://octad-engineering-website-2.onrender.com/health
- **API Status**: https://octad-engineering-website-2.onrender.com/api

## ⚠️ Important Notes

1. **Environment Variables**: Your local `.env.local` is already updated to use the Render backend
2. **CORS**: Backend is configured to accept requests from your Vercel frontend
3. **MongoDB**: Backend is connected to your MongoDB Atlas database
4. **Email**: Make sure Gmail SMTP credentials are set in Render environment variables

## 🎯 Expected Result

After setup:
- ✅ Frontend (Vercel): https://octad-engineering-website-duaz-dxvctv8nu-allian-johns-projects.vercel.app
- ✅ Backend (Render): https://octad-engineering-website-2.onrender.com
- ✅ Database (MongoDB Atlas): Connected and working
- ✅ Email (Gmail SMTP): Ready for contact form submissions

---

**Your full-stack application is now deployed! 🚀**

Test the contact form to verify everything is connected properly.