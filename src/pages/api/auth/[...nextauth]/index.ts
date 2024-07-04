// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import dotenv from "dotenv";

dotenv.config();

interface ExtendedProfile {
  id: string;
  // add any other properties you need from the profile
}

const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      const extendedProfile = profile as ExtendedProfile;

      if (account?.provider === "twitter") {
        token.accessToken = account.oauth_token as string;
        token.oauth_token = account.oauth_token as string;
        token.oauth_token_secret = account.oauth_token_secret as string;
        token.id = extendedProfile.id; // Using extended profile
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      session.user.oauth_token = token.oauth_token as string | undefined;
      session.user.oauth_token_secret = token.oauth_token_secret as string | undefined;
      session.user.id = token.id as string | undefined;
      return session;
    },
  },
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
});

export default handler;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      TWITTER_CLIENT_ID: string;
      TWITTER_CLIENT_SECRET: string;
      NEXTAUTH_SECRET: string;
    }
  }
}
