# EmailJS Setup for Admin Reply Functionality

To enable the reply functionality in the admin panel, you need to set up EmailJS with a specific template for replies.

## Steps to Set Up EmailJS for Replies

### 1. Create a New EmailJS Template

Go to your EmailJS dashboard and create a new template with the following variables:

- `to_email` - The recipient's email address
- `to_name` - The recipient's name
- `from_name` - Your company name (Octad Engineering Limited)
- `from_email` - Your company email (info@octadengineering.com)
- `subject` - The email subject
- `message` - The email body/message
- `reply_to` - Your reply-to email address

### 2. Template Structure

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{subject}}</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #236BB5; margin: 0;">Octad Engineering Limited</h1>
            <p style="color: #6B7280; margin: 5px 0;">Excellence in Construction</p>
        </div>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="margin-bottom: 20px;">{{message}}</p>
        </div>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6B7280; font-size: 12px;">
            <p><strong>Octad Engineering Limited</strong></p>
            <p>15 Adeola Odeku Street, Victoria Island, Lagos 101241, Nigeria</p>
            <p>Phone: +234 803 123 4567 | Email: info@octadengineering.com</p>
            <p>© 2025 Octad Engineering Limited. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
```

### 3. Environment Variables

Make sure you have the following environment variables set in your `.env.local` file:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_reply_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Testing

1. Go to your admin panel
2. Navigate to Messages
3. Click "Reply" on any message
4. The modal will open with pre-filled content based on the inquiry type
5. You can customize the message or use quick templates
6. Send the reply

### 5. Features Included

- **Smart Templates**: Automatically detects if the inquiry is commercial, residential, or general
- **Pre-filled Content**: Subject line is automatically set as "Re: [Original Subject]"
- **Quick Template Buttons**: Commercial, Residential, and General templates
- **Professional Formatting**: Includes company branding and contact information
- **Form Validation**: Ensures subject and message are properly filled
- **Success/Error Handling**: Shows toast notifications for feedback

### 6. Backend Integration

The system also marks the contact as "replied" in the database, so you can track which messages have been responded to.

## Troubleshooting

- If emails aren't sending, check your EmailJS console for quota limits
- Ensure all environment variables are properly set
- Test the template directly in EmailJS dashboard first
- Check browser console for any JavaScript errors

## Template Customization

You can customize the email templates by modifying the `getEmailTemplate` function in `src/components/admin/ReplyModal.tsx`:

- Update the company information
- Modify service descriptions
- Change the email signature
- Adjust the professional tone/messaging