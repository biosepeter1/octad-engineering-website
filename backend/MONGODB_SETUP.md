# MongoDB Atlas Setup & Admin Panel Access Guide

## 🚨 Current Issue: IP Whitelist

Your current IP address **105.112.176.39** needs to be added to MongoDB Atlas whitelist.

## 📋 Admin Login Credentials

```
Username: admin
Email: admin@octadengineering.com (if email field exists)
Password: Admin123!
```

## 🔧 Step-by-Step Solution

### 1. Add IP to MongoDB Atlas Whitelist

1. **Go to MongoDB Atlas Dashboard:**
   - Visit: https://cloud.mongodb.com/
   - Log in with your MongoDB Atlas credentials

2. **Navigate to Network Access:**
   - Click on "Network Access" in the left sidebar
   - Or go to: `https://cloud.mongodb.com/v2/{PROJECT_ID}#/security/network/accessList`

3. **Add Your IP Address:**
   - Click "Add IP Address" button
   - Choose "Add Current IP Address" or manually enter: `105.112.176.39`
   - Add a comment like "Development Machine - [Today's Date]"
   - Click "Confirm"

4. **Alternative - Allow All IPs (Development Only):**
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere"
   - This adds `0.0.0.0/0` (⚠️ Only for development!)

### 2. Start Backend Server

```bash
cd backend
npm run dev
```

The server should start on `http://localhost:5000`

### 3. Start Frontend Server

```bash
cd frontend
npm run dev
```

The frontend should start on `http://localhost:3000`

### 4. Access Admin Panel

Visit: `http://localhost:3000/admin/login`

Use the credentials:
- **Username:** `admin`
- **Password:** `Admin123!`

## 🐛 Troubleshooting

### If you still can't connect:

1. **Check MongoDB Atlas Status:**
   - Ensure your cluster is running (not paused)
   - Verify database user permissions

2. **Verify Database User:**
   - Go to "Database Access" in Atlas
   - Ensure user `biosejohn_db_user` exists and has proper roles
   - Roles should include: `readWrite` on your database

3. **Test Connection:**
   ```bash
   cd backend
   npm run create-admin
   ```

4. **Check Backend Logs:**
   - Look for connection errors in the terminal
   - MongoDB connection should show "✅ Connected to MongoDB successfully!"

### If admin panel still won't load:

1. **Check both servers are running:**
   - Backend: `http://localhost:5000/api/health` (should return status)
   - Frontend: `http://localhost:3000` (should load website)

2. **Clear browser cache and cookies**

3. **Check browser console for errors** (F12 → Console tab)

## 🔄 Reset Admin Password

Run this anytime to reset the admin password:

```bash
cd backend
npm run create-admin
```

## 📞 Need Help?

If you're still having issues:

1. **Check your current IP:**
   ```bash
   curl https://httpbin.org/ip
   ```
   
2. **Verify Atlas connection string** in `backend/.env`

3. **Test with MongoDB Compass** using the same connection string

## ⚠️ Security Notes

- Change the default password `Admin123!` after first login
- For production, use specific IP addresses, not `0.0.0.0/0`
- Regularly rotate admin passwords
- Enable two-factor authentication in production