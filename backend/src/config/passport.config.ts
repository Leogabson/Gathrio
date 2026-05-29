const passport: any = require("passport");
const GoogleStrategy: any = require("passport-google-oauth20").Strategy;
const LinkedInStrategy: any = require("passport-linkedin-oauth2").Strategy;
import { findOrCreateOAuthUser } from "../services/auth.service";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GOOGLE_CALLBACK =
  process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/api/auth/google/callback";

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || "";
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || "";
const LINKEDIN_CALLBACK =
  process.env.LINKEDIN_CALLBACK_URL || "http://localhost:5000/api/auth/linkedin/callback";

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK,
      },
      async (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
        try {
          const user = await findOrCreateOAuthUser({ provider: "google", profile });
          done(null, user);
        } catch (err) {
          done(err as Error);
        }
      }
    )
  );
}

if (LINKEDIN_CLIENT_ID && LINKEDIN_CLIENT_SECRET) {
  passport.use(
    new LinkedInStrategy(
      {
        clientID: LINKEDIN_CLIENT_ID,
        clientSecret: LINKEDIN_CLIENT_SECRET,
        callbackURL: LINKEDIN_CALLBACK,
        scope: ["r_liteprofile", "r_emailaddress"],
        state: true,
      },
      async (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
        try {
          const user = await findOrCreateOAuthUser({ provider: "linkedin", profile });
          done(null, user);
        } catch (err) {
          done(err as Error);
        }
      }
    )
  );
}

export default passport;
