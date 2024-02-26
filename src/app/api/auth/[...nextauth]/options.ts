import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/db/connect";
import { User } from "@/db/models";

/// Set environment variables based on current environment;
/// so authentication works in production AND development
const {
  NODE_ENV,
  GITHUB_ID,
  GITHUB_ID_DEV,
  GITHUB_SECRET,
  GITHUB_SECRET_DEV,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env;

const GitHubID = NODE_ENV === "production" ? GITHUB_ID : GITHUB_ID_DEV;
const GitHubSecret =
  NODE_ENV === "production" ? GITHUB_SECRET : GITHUB_SECRET_DEV;

console.log("process.env.NODE_ENV:", process.env.NODE_ENV);

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: GitHubID as string,
      clientSecret: GitHubSecret as string,
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
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
