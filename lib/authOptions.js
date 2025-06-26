import GoogleProvider from "next-auth/providers/google";
import dbConnect from "./dbConnect";
import User from "../models/User.js";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async signIn({user}){
        try{
            await dbConnect();

            const existingUser=await User.findOne({email:user.email});
            if(!existingUser){
                //create new
                await User.create({
                    name:user.name,
                    email:user.email,
                    image:user.image,
                });
                console.log("User Added to Database Successfully");
            }
            return true;
        }catch(error){
            console.error("Error in Saving User to DB",error);
            return false;
        }

    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
   debug: true,
  events: {
    signIn: async (message) => console.log('SignIn Event:', message),
    error: async (error) => console.error('Auth Error:', error),
  },
};
