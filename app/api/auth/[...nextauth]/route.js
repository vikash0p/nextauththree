import Signup from "@/mongoose/models/registerSchema";
import mongooseconection from "@/mongoose/mongooseconection";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            

            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await mongooseconection();
                    const user = await Signup.findOne({ email });
                    
                    if (!user) {
                        return null;
                    }
                    
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        return null;
                    }
                    return user;
                } catch (error) {

                    console.log(error)
                    
                }
            },
        }),
    ],

    session: {
        strategy : "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn : "/login",
    }
};

const handler = NextAuth(authOptions);

export {
    handler as GET,
    handler as POST
};