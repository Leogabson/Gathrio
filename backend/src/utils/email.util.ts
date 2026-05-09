import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Use SendGrid if API key is provided, otherwise fallback to SMTP
    if (process.env.SENDGRID_API_KEY) {
      this.transporter = nodemailer.createTransport(
        nodemailerSendgrid({
          apiKey: process.env.SENDGRID_API_KEY,
        })
      );
    } else {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.FROM_EMAIL || 'noreply@gathrio.com',
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const html = `
      <h1>Password Reset</h1>
      <p>You requested a password reset for your Gathrio account.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    await this.sendEmail({
      to: email,
      subject: 'Password Reset - Gathrio',
      html,
    });
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const html = `
      <h1>Welcome to Gathrio!</h1>
      <p>Hi ${name},</p>
      <p>Thank you for joining Gathrio. We're excited to have you!</p>
      <p>Start exploring events and connecting with others.</p>
    `;

    await this.sendEmail({
      to: email,
      subject: 'Welcome to Gathrio',
      html,
    });
  }
}

export const emailService = new EmailService();