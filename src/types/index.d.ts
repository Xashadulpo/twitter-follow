import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    oauth_token?: string;
    oauth_token_secret?: string;
    user: {
      id?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    oauth_token?: string;
    oauth_token_secret?: string;
    userId?: string;
  }
}
