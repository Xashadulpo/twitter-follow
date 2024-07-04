// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;

    user: {
      id?: string;
     
      oauth_token?: string;
      oauth_token_secret?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    accessToken?: string;

    id?: string;
    oauth_token?: string;
    oauth_token_secret?: string;
  }
}
