const nodemailer = require('nodemailer');
const path = require('path');

// Email service for sending emails via Gmail SMTP
class EmailService {
  constructor() {
    this.transporter = null;
    this.initialize();
  }

  async initialize() {
    try {
      // Check if Gmail credentials are configured
      if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || 
          process.env.GMAIL_USER === 'your-gmail@gmail.com' ||
          process.env.GMAIL_APP_PASSWORD === 'your-16-char-app-password') {
        console.log('⚠️  Gmail SMTP credentials not configured. Email service will run in demo mode.');
        console.log('📧 To enable email functionality, please configure GMAIL_USER and GMAIL_APP_PASSWORD in your .env file.');
        console.log('📖 See GMAIL_SMTP_SETUP.md for detailed setup instructions.');
        this.transporter = null;
        return;
      }

      // Create Gmail SMTP transporter
      this.transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER, // Your Gmail address
          pass: process.env.GMAIL_APP_PASSWORD // App-specific password (not regular password)
        }
      });

      // Verify connection configuration
      await this.transporter.verify();
      console.log('✅ Gmail SMTP server is ready to send emails');
    } catch (error) {
      console.error('❌ Gmail SMTP server failed to initialize:', error.message);
      console.log('📧 Please check your Gmail credentials and ensure 2FA is enabled with an App Password.');
      this.transporter = null;
    }
  }

  // Generate professional HTML email template
  generateEmailTemplate(options) {
    const { subject, message, senderName = 'Octad Engineering Limited' } = options;
    
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #236BB5 0%, #1e5a9b 100%);
                color: white;
                padding: 30px 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
            }
            .header p {
                margin: 10px 0 0 0;
                font-size: 16px;
                opacity: 0.9;
            }
            .content {
                padding: 40px 30px;
                color: #333333;
            }
            .message {
                background-color: #f8f9fa;
                padding: 25px;
                border-radius: 8px;
                border-left: 4px solid #236BB5;
                margin: 20px 0;
                white-space: pre-line;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 30px 20px;
                text-align: center;
                border-top: 1px solid #e9ecef;
                color: #6c757d;
                font-size: 14px;
            }
            .footer .company-info {
                margin-bottom: 20px;
            }
            .footer .company-info h3 {
                color: #236BB5;
                margin: 0 0 10px 0;
                font-size: 18px;
            }
            .footer .contact-info {
                display: flex;
                justify-content: center;
                gap: 30px;
                flex-wrap: wrap;
                margin: 15px 0;
            }
            .footer .contact-item {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .footer .social-links {
                margin-top: 20px;
            }
            .footer .social-links a {
                color: #236BB5;
                text-decoration: none;
                margin: 0 10px;
            }
            .footer .copyright {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #dee2e6;
                font-size: 12px;
                color: #999;
            }
            @media (max-width: 600px) {
                .container {
                    margin: 10px;
                    border-radius: 0;
                }
                .content {
                    padding: 20px;
                }
                .footer .contact-info {
                    flex-direction: column;
                    gap: 10px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                <h1>Octad Engineering Limited</h1>
                <p>Excellence in Construction Across Nigeria</p>
            </div>
            
            <!-- Content -->
            <div class="content">
                <div class="message">${message}</div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
                <div class="company-info">
                    <h3>Octad Engineering Limited</h3>
                    <p>Nigeria's Leading Construction Company</p>
                </div>
                
                <div class="contact-info">
                    <div class="contact-item">
                        <span>📍</span>
                        <span>15 Adeola Odeku Street, Victoria Island, Lagos 101241, Nigeria</span>
                    </div>
                </div>
                
                <div class="contact-info">
                    <div class="contact-item">
                        <span>📞</span>
                        <span>+234 803 123 4567</span>
                    </div>
                    <div class="contact-item">
                        <span>✉️</span>
                        <span>info@octadengineering.com</span>
                    </div>
                </div>
                
                <div class="social-links">
                    <a href="#">LinkedIn</a>
                    <a href="#">Twitter</a>
                    <a href="#">Facebook</a>
                </div>
                
                <div class="copyright">
                    © ${new Date().getFullYear()} Octad Engineering Limited. All rights reserved.<br>
                    This email was sent from our admin system in response to your inquiry.
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  // Send reply email
  async sendReply(options) {
    const {
      to,
      subject,
      message,
      originalMessage = null,
      senderName = 'Octad Engineering Limited'
    } = options;

    try {
      if (!this.transporter) {
        // Demo mode - simulate email sending
        console.log('🎭 DEMO MODE: Email would be sent to:', to);
        console.log('📧 Subject:', subject);
        console.log('📝 Message Preview:', message.substring(0, 100) + '...');
        
        return {
          success: true,
          messageId: 'demo-' + Date.now(),
          response: 'Demo mode - no actual email sent. Configure Gmail SMTP to enable real email sending.',
          demo: true
        };
      }

      const htmlContent = this.generateEmailTemplate({
        subject,
        message,
        senderName
      });

      const mailOptions = {
        from: {
          name: senderName,
          address: process.env.GMAIL_USER
        },
        to: to,
        subject: subject,
        html: htmlContent,
        text: message, // Plain text fallback
        replyTo: process.env.GMAIL_USER
      };

      // Send email
      const info = await this.transporter.sendMail(mailOptions);
      
      console.log('✅ Email sent successfully:', {
        messageId: info.messageId,
        to: to,
        subject: subject
      });

      return {
        success: true,
        messageId: info.messageId,
        response: info.response
      };

    } catch (error) {
      console.error('❌ Failed to send email:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Send contact form notification (existing functionality)
  async sendContactNotification(options) {
    const {
      name,
      email,
      phone,
      subject,
      message,
      ipAddress
    } = options;

    try {
      if (!this.transporter) {
        throw new Error('Email service not initialized');
      }

      const notificationContent = `
        New Contact Form Submission:
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        
        Message:
        ${message}
        
        IP Address: ${ipAddress}
        Timestamp: ${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}
      `;

      const mailOptions = {
        from: {
          name: 'Octad Engineering Website',
          address: process.env.GMAIL_USER
        },
        to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
        subject: `New Contact: ${subject}`,
        text: notificationContent,
        replyTo: email
      };

      const info = await this.transporter.sendMail(mailOptions);
      
      console.log('✅ Contact notification sent:', info.messageId);
      
      return {
        success: true,
        messageId: info.messageId
      };

    } catch (error) {
      console.error('❌ Failed to send contact notification:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Test email connection
  async testConnection() {
    try {
      if (!this.transporter) {
        await this.initialize();
      }
      
      await this.transporter.verify();
      return { success: true, message: 'Gmail SMTP connection successful' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Create singleton instance
const emailService = new EmailService();

module.exports = emailService;