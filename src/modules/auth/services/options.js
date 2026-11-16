import Credentialsprovider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { OAuth2Client } from "google-auth-library";
import dbConnect from "@/shared/utils/dbConnect";
import bcrypt from "bcryptjs";
import { sendWellcomeMessage } from "@/templates/email/sendWelcomeMail";
import User from "../models/user.model";

const googleOAuthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authOptions = {
  providers: [
    Credentialsprovider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials?.email }).lean();
        if (!user) {
          throw new Error("user not found");
        }
        const ispaswordVaild = await bcrypt.compare(credentials.password, user.password);
        if (!ispaswordVaild) {
          throw new Error("inavaild password");
        }
        return user;
      },
    }),

    Credentialsprovider({
      id: "google-one-tap",
      name: "Google One Tap",
      credentials: {
        idToken: { label: "Google ID token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.idToken || !process.env.GOOGLE_CLIENT_ID) return null;

        try {
          const ticket = await googleOAuthClient.verifyIdToken({
            idToken: credentials.idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
          });
          const profile = ticket.getPayload();

          if (!profile?.sub || !profile.email || !profile.email_verified) return null;

          return {
            id: profile.sub,
            name: profile.name || profile.email,
            email: profile.email,
            image: profile.picture,
          };
        } catch (error) {
          console.error("Google One Tap token verification failed", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await dbConnect();
      const now = new Date();
      const finduser = await User.findOne({ email: user?.email });
      if (!finduser) {
        const newUser = await User.create({
          name: user.name,
          email: user.email,
          role: "user",
          provider: account.provider,
          lastActive: now,
          lastLogin: now,
        });

        try {
          sendWellcomeMessage(user.email, user.name).catch(console.error);
        } catch (err) {
          console.error(err);
        }
        user.id = newUser._id;
        user.role = newUser.role;
      } else {
        finduser.lastLogin = now;
        finduser.lastActive = now;
        await finduser.save();
        user.id = finduser._id;
        user.role = finduser.role;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token?.user;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
