import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/db/connect";
import { User } from "@/db/models";

/// Set environment variables based on current environment;
/// so authentication works in production AND development
const isDeployed = !process.env.IS_DEV;
let GitHubID = process.env.GITHUB_ID_DEV;
let GitHubSecret = process.env.GITHUB_SECRET_DEV;

if (isDeployed) {
  GitHubID = process.env.GITHUB_ID;
  GitHubSecret = process.env.GITHUB_SECRET;
}

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: GitHubID as string,
      clientSecret: GitHubSecret as string,
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
      console.log("user:", providerUser);
      console.log("account:", account);
      console.log("profile:", profile);

      if (account?.provider === "github" && profile) {
        dbConnect();
        try {
          const user = await User.findOne({
            email: profile.email || providerUser.email,
          });

          if (!user) {
            const newUser = new User({
              username: profile.login || providerUser.name,
              email: profile.email || providerUser.email,
              avatar: profile.avatar_url || providerUser.image,
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
