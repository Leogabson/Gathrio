import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    let nodemailerSendgrid: any;
    try {
      nodemailerSendgrid = require('nodemailer-sendgrid');
    } catch (error) {
      nodemailerSendgrid = null;
    }

    if (process.env.SENDGRID_API_KEY && nodemailerSendgrid) {
      this.transporter = nodemailer.createTransport(
        nodemailerSendgrid({
          apiKey: process.env.SENDGRID_API_KEY,
        })
      );
    } else {
      const host = process.env.SMTP_HOST;
      const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;

      if (!host || !user || !pass) {
        console.warn(
          'EmailService is not configured: set SENDGRID_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS.'
        );
        return;
      }

      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: false,
        auth: {
          user,
          pass,
        },
      });
    }
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    if (!this.transporter) {
      console.warn('EmailService is not fully configured; skipping email send.');
      return;
    }

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

  async sendVerificationEmail(email: string, name: string | null, token: string): Promise<void> {
    const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;

    const html = `
      <h1>Verify your email</h1>
      <p>Hi ${name || 'there'},</p>
      <p>Thanks for creating an account at Gathrio. Please verify your email by clicking the link below:</p>
      <a href="${verifyUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't create an account, you can ignore this message.</p>
    `;

    await this.sendEmail({
      to: email,
      subject: 'Verify your Gathrio account',
      html,
    });
  }
}

export const emailService = new EmailService();