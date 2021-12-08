import NextAuth from "next-auth";
//import Providers from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google"

async function signIn(user) {
    return user.email.endsWith("@middlebury.edu");
  }

const options = {
  providers: [
  

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{signIn: signIn}
};

export default (req, res) => NextAuth(req, res, options);