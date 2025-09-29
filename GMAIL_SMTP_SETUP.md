# Gmail SMTP Setup Guide for Admin Reply System

This guide will help you set up Gmail SMTP for the admin reply functionality, replacing EmailJS with a more reliable server-side email solution.

## 🚀 **Why Gmail SMTP?**

- ✅ **More Reliable**: Server-side email delivery
- ✅ **Professional**: Emails come from your actual Gmail account
- ✅ **Better Deliverability**: Less likely to be marked as spam
- ✅ **No Third-party Dependencies**: Direct integration with Gmail
- ✅ **Better Error Handling**: Detailed server-side logging

## 📧 **Step 1: Gmail Setup**

### 1.1 Enable 2-Factor Authentication
1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled

### 1.2 Generate App Password
1. In Google Account settings → **Security**
2. Under "2-Step Verification", click **App passwords**
3. Select **Mail** as the app
4. Select **Other** as the device and name it "Octad Website"
5. **Copy the generated 16-character password** (you'll need this)

## ⚙️ **Step 2: Backend Configuration**

### 2.1 Environment Variables
Create or update your `backend/.env` file with:

```env
# Gmail SMTP Configuration
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=your-admin@gmail.com

# Optional: If different from GMAIL_USER
COMPANY_EMAIL=info@octadengineering.com
```

### 2.2 Example Configuration
```env
# Replace with your actual values
GMAIL_USER=info@octadengineering.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
ADMIN_EMAIL=admin@octadengineering.com
```

## 🔧 **Step 3: Test the Setup**

### 3.1 Start the Backend
```bash
cd backend
npm run dev
```

### 3.2 Check Gmail Connection
Look for this message in your backend console:
```
✅ Gmail SMTP server is ready to send emails
```

If you see an error, check your Gmail credentials.

## 🎯 **Step 4: How It Works**

### 4.1 Reply Process Flow
1. **Admin clicks Reply** → Opens modal with templates
2. **Admin customizes message** → Form validation ensures quality
3. **Admin sends reply** → Frontend calls backend API
4. **Backend sends email** → Uses Gmail SMTP with professional template
5. **Contact marked as replied** → Database updated automatically
6. **Success notification** → Admin receives confirmation

### 4.2 Email Template Features
- ✨ **Professional HTML design** with company branding
- 📱 **Mobile responsive** layout
- 🎨 **Nigerian company information** (address, phone, etc.)
- 🔗 **Branded header** with Octad Engineering colors
- 📝 **Clean message formatting** with proper typography

## 🛠️ **Step 5: Customization**

### 5.1 Email Template
The email template can be customized in:
```
backend/src/services/emailService.js
```

### 5.2 Company Information
Update company details in the template:
- Company name
- Address (currently: 15 Adeola Odeku Street, Victoria Island, Lagos)
- Phone (currently: +234 803 123 4567)
- Email (currently: info@octadengineering.com)

### 5.3 Smart Templates
The system includes smart templates in:
```
frontend/src/components/admin/ReplyModal.tsx
```

Templates automatically detect:
- **Commercial** inquiries (office, business, commercial)
- **Residential** inquiries (home, house, residential)
- **General** inquiries (default template)

## 📋 **Step 6: Usage Instructions**

### 6.1 For Admins
1. **Login to admin panel** → `/admin/login`
2. **Navigate to Messages** → View all contact submissions
3. **Click Reply button** → Opens professional email composer
4. **Select template** → Commercial, Residential, or General
5. **Customize message** → Edit the pre-filled professional response
6. **Send reply** → Email sent immediately via Gmail SMTP

### 6.2 Features Available
- **Pre-filled subjects** → Automatically prefixed with "Re:"
- **Smart templates** → Context-aware professional responses
- **Form validation** → Ensures quality responses
- **Loading states** → Shows progress during sending
- **Success/Error handling** → Clear feedback to admin
- **Database tracking** → Marks contacts as replied

## 🚨 **Troubleshooting**

### Common Issues

#### 1. "Authentication failed" error
- ✅ Check GMAIL_USER is correct
- ✅ Verify GMAIL_APP_PASSWORD (16 characters, no spaces)
- ✅ Ensure 2FA is enabled on Gmail account
- ✅ Use App Password, not regular password

#### 2. "Service unavailable" error
- ✅ Check internet connection
- ✅ Verify Gmail service is not down
- ✅ Try generating a new App Password

#### 3. Emails not being received
- ✅ Check recipient's spam folder
- ✅ Verify Gmail account has sending permissions
- ✅ Check backend console for error logs

#### 4. Template not loading
- ✅ Check backend/src/services/emailService.js exists
- ✅ Verify email service is properly imported
- ✅ Check console for JavaScript errors

### 📞 Support Commands

Test the email service:
```bash
# In backend directory
node -e "const emailService = require('./src/services/emailService'); emailService.testConnection().then(console.log);"
```

## 🎉 **Step 7: Benefits Achieved**

After setup, you'll have:

- ✅ **Professional email responses** from your actual Gmail
- ✅ **Reliable delivery** through Gmail's infrastructure  
- ✅ **Smart templates** for different inquiry types
- ✅ **Admin-friendly interface** with easy customization
- ✅ **Nigerian branding** with local contact information
- ✅ **Database tracking** of all replies sent
- ✅ **Error handling** with detailed feedback
- ✅ **Mobile-friendly** HTML email templates

## 🔒 **Security Notes**

- 🔐 **Never commit** `.env` file to version control
- 🔑 **App passwords** are safer than regular passwords
- 📧 **Gmail SMTP** uses TLS encryption
- 🔒 **Authentication required** for admin functions
- 📊 **Logging** helps track email delivery

Your admin panel now has professional, reliable email functionality powered by Gmail SMTP!