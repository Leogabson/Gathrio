# Gathrio - TODO List

## Email Integration (Required for Production)

### Setup Email Service:

- [ ] Choose email provider (SendGrid, AWS SES, Mailgun, etc.)
- [ ] Get API keys
- [ ] Install email package: `npm install nodemailer` or use provider SDK
- [ ] Create email templates for:
  - [ ] Welcome email (after registration)
  - [ ] Password reset email
  - [ ] Email verification
  - [ ] Event notifications

### Implementation:

- [ ] Create `backend/src/utils/email.util.ts`
- [ ] Create email templates in `backend/src/templates/emails/`
- [ ] Update `forgotPassword` service to send actual emails
- [ ] Remove `resetToken` from response in production
- [ ] Add email verification flow

### Example Email Template Structure:

```
Subject: Reset Your Gathrio Password

Hi {firstName},

We received a request to reset your password. Click the link below to create a new password:

{resetUrl}

This link will expire in 1 hour.

If you didn't request this, please ignore this email.

Best regards,
The Gathrio Team
```

## OAuth Integration (Google & LinkedIn)

### Google OAuth:

- [ ] Create Google Cloud project
- [ ] Enable Google OAuth API
- [ ] Get Client ID and Client Secret
- [ ] Add authorized redirect URIs
- [ ] Install passport.js: `npm install passport passport-google-oauth20`
- [ ] Create OAuth routes and callbacks
- [ ] Update frontend OAuth buttons with actual links

### LinkedIn OAuth:

- [ ] Create LinkedIn App
- [ ] Get Client ID and Client Secret
- [ ] Add redirect URIs
- [ ] Install: `npm install passport-linkedin-oauth2`
- [ ] Create OAuth routes and callbacks
- [ ] Update frontend OAuth buttons

## Next Sprint Features:

- [ ] Event creation
- [ ] Event discovery
- [ ] User dashboard
- [ ] Profile management

## Email Integration with .live

Professional email: hello@gathrio.live
Support email: support@gathrio.live
No-reply email: noreply@gathrio.live
