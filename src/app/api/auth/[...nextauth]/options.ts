import type { NextAuthOptions } from "next-auth";
import type { IUserWithPassword } from "@/../types/types";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/db/connect";
import { User } from "@/db/models";
import { mongoDocToPlainObj, removePasswordFromUser } from "@/lib/data";

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

console.log("NODE_ENV:", NODE_ENV);

export const options: NextAuthOptions = {
  providers: [
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
        // TODO: Hash password
        const dbUser = await User.findOne({
          name: credentials?.username,
        });

        if (dbUser && dbUser.password === credentials?.password) {
          const user = mongoDocToPlainObj(dbUser) as IUserWithPassword;
          return removePasswordFromUser(user);
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: GitHubID as string,
      clientSecret: GitHubSecret as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      /// GOOGLE
      if (account?.provider === "google") {
        dbConnect();
        try {
          const dbUser = await User.findOne({
            email: user.email,
          });

          if (!dbUser) {
            const newUser = new User({
              name: user.name,
              email: user.email,
              avatar: user.image,
              role: "googleUser",
            });
            await newUser.save();
            return newUser;
          } else {
            /// update user data
            dbUser.name = user.name;
            dbUser.avatar = user.image;
            await dbUser.save();
            return dbUser;
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      /// GITHUB
      if (account?.provider === "github" && profile) {
        dbConnect();
        try {
          const dbUser = await User.findOne({
            email: profile.email || user.email,
          });

          if (!dbUser) {
            const newUser = new User({
              name: profile.login,
              email: user.email,
              avatar: user.image,
              role: "githubUser",
            });
            await newUser.save();
          } else {
            /// update user data
            dbUser.name = profile.login;
            dbUser.avatar = user.image;
            await dbUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }

      return true;
    },
  },
};
