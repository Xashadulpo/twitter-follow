import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import dotenv from 'dotenv';

dotenv.config();
interface TwitterProfile {
  id: string;
  // Add other properties from the profile if needed
}

const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: '2.0',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log('Account:', account);
      console.log('Profile:', profile);  // Log the profile to see its structure

      if (account?.provider === 'twitter') {
        token.accessToken = account.access_token as string;
        token.refreshToken = account.refresh_token as string;
        token.oauth_token = account.oauth_token as string;
        token.oauth_token_secret = account.oauth_token_secret as string;
        
        // Cast profile to TwitterProfile type
        const twitterProfile = profile as TwitterProfile;
        if (twitterProfile && twitterProfile.id) {
          token.userId = twitterProfile.id;
        } else {
          console.error('Profile is undefined or missing id property');
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.oauth_token = token.oauth_token as string;
      session.oauth_token_secret = token.oauth_token_secret as string;
      session.user.id = token.userId as string;
      return session;
    },
  },
  debug: true,  // Enable debug mode to get detailed logs
});

export default handler;
