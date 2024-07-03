//api/auth/[...nextauth.ts]
import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";

import dotenv from "dotenv";

dotenv.config();

const handler = NextAuth({
  //   providers: [
  //     TwitterProvider({
  //       clientId: process.env.TWITTER_CLIENT_ID,
  //       clientSecret: process.env.TWITTER_CLIENT_SECRET,
  //     }),
  //   ],
  //   callbacks: {
  //     async jwt({ token, account }) {
  //       if (account) {
  //         token.accessToken = account.access_token;
  //         token.refreshToken = account.refresh_token;
  //       }
  //       return token;
  //     },
  //     async session({ session, token }) {
  //       (session as any).accessToken = token.accessToken;
  //       return session;
  //     },
  //   },

  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOGGLE_SECRET,
    // }),
    TwitterProvider({
           clientId: process.env.TWITTER_CLIENT_ID,
               clientSecret: process.env.TWITTER_CLIENT_SECRET,
               version: "2.0",
          }),
  ],
});

export default handler;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_ID: string;
      GOGGLE_SECRET: string;
      TWITTER_CLIENT_ID:string;
      TWITTER_CLIENT_SECRET:string

    }
  }
}




// pages/index.tsx
// import React, { useState, useEffect } from 'react';
// import { signIn, useSession } from 'next-auth/react';

// const Home = () => {
//   const { data: session, status } = useSession();
//   const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

//   useEffect(() => {
//     const checkFollowStatus = async () => {
//       if (session) {
//         try {
//           const response = await fetch('/api/verify-follow', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ userId: session.user.id }),
//           });

//           if (!response.ok) {
//             throw new Error('Failed to verify follow status');
//           }

//           const data = await response.json();
//           setIsFollowing(data.isFollowing);
//         } catch (error) {
//           console.error('Error verifying follow status:', error);
//         }
//       }
//     };

//     checkFollowStatus();
//   }, [session]);

//   const handleAuth = async () => {
//     if (!session) {
//       await signIn('twitter');
//     } else {
//       window.location.href = 'https://x.com/xashadulpo123'; // Replace with your Twitter profile URL
//     }
//   };
//   const handleSignIn = async () => {
//     await signIn('twitter');
//   };

//   return (
//     <div>
      
//       {/* {status === 'authenticated' && isFollowing !== null && (
//         <button className={`p-4 ${isFollowing ? 'bg-green-400' : 'bg-gray-400'}`} disabled={isFollowing}>
//           {isFollowing ? 'Verified' : 'Verify Follow Status'}
//         </button>
//       )}
//       {status === 'authenticated' && isFollowing === null && (
//         <button onClick={handleAuth} className="p-4 bg-red-400">
//           Authenticate with Twitter
//         </button>
//       )}
//       {status !== 'authenticated' && (
//         <button onClick={handleSignIn} className="p-4 bg-red-400">
//         Sign in with Twitter
//       </button>
//       )} */}

//       {status === "authenticated" ? (
//         <div>
//           already login
//         </div>
//       ):(
        
//         <button className="p-4 bg-red-100" onClick={()=> signIn("twitter")}>please login first </button>
//       )}
//     </div>
//   );
// };

// export default Home;
