import NextAuth from "next-auth";
//import Providers from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google"

async function signIn(user) {
    return user.email.endsWith("@middlebury.edu");
  }

const options = {
  providers: [
    //  Providers.Auth0({
    //    clientId: process.env.AUTH0_CLIENT_ID,
    //    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    //    domain: process.env.AUTH0_DOMAIN,
    // AUTH0_CLIENT_ID= "yz3al0Ge3FYcMgrGfYDq8oR5mJv2YbPH"
    // AUTH0_DOMAIN= 'dev-0-15yeg9.us.auth0.com'
    // NEXTAUTH_URL= 'http://localhost:3000'
    //AUTH0_CLIENT_SECRET= "J_-ilknAYZLqsuwQzQjpZBqor7Mp6jxzEHLcE1NZZED_4ONoljcOWQOcHHTIcudA"
    //  }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{signIn: signIn}
};

export default (req, res) => NextAuth(req, res, options);