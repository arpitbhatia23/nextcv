import Credentialsprovider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user.model";
import apiError from "@/utils/apiError";
import bcrypt from "bcryptjs";
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
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("user not found");
        }
        const ispaswordVaild = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (ispaswordVaild) {
          throw new Error("inavaild password");
        }
        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callback: {
    async signIn({ user, account }) {
      await dbConnect();
      const finduser = await User.findOne({ email: user.email });
      if (!finduser) {
        await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
          provider: account.provider || "credentials",
        });
        return true;
      }
    },

    async jwt({ token, user, trigger }) {
      token.user = user;
      return trigger;
    },

    async session(session, token) {
      session.user = token.user;
      return session;
    },
    session: {
      strategy: "jwt",
    },
    page: {},
    secret: process.env.NEXTAUTH_SECRET,
  },
};

export default authOptions;
