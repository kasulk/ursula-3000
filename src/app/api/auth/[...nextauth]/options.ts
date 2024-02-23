import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/db/connect";
import { User } from "@/db/models";

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your cool username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your awesome password",
        },
      },
      async authorize(credentials) {
        /// This is where you need to retrieve user data
        /// to verify with credentials
        /// Docs:https://next-auth.js.org/configuration/providers/credentials
        const user = { id: "", name: "", password: "" }; // !hard-coded test-user

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user: providerUser, account, profile }) {
      // console.log("user:", providerUser);
      // console.log("account:", account);
      // console.log("profile:", profile);

      if (account?.provider === "github" && profile) {
        dbConnect();
        try {
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              avatar: profile.avatar_url,
            });

            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
    // ...authConfig.callbacks,
  },
};
