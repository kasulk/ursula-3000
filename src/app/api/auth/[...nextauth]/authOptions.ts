import type { NextAuthOptions } from "next-auth";
import type { IUserWithPassword } from "@/../types/types";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/db/connect";
import { User } from "@/db/models";
import {
  createNewDBUser,
  mongoDocToPlainObj,
  removePasswordFromUser,
} from "@/utils/data";
import {
  getDBUserByEmailWithoutPassword,
  getDBUserIdByEmail,
} from "@/db/queries/users";

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
  NEXTAUTH_SECRET,
} = process.env;

const GitHubID = NODE_ENV === "production" ? GITHUB_ID : GITHUB_ID_DEV;
const GitHubSecret =
  NODE_ENV === "production" ? GITHUB_SECRET : GITHUB_SECRET_DEV;

export const authOptions: NextAuthOptions = {
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
      /// only for CredentialsProvider
      async authorize(credentials) {
        await dbConnect();
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
      const email = user.email || profile?.email;
      const avatar = user.image;

      try {
        await dbConnect();
        const dbUser = await getDBUserByEmailWithoutPassword(email);

        if (dbUser) {
          await User.findOneAndUpdate({ email }, { $set: { avatar } }); /// update user data
        } else {
          await createNewDBUser(email!, avatar, account?.provider!);
        }
      } catch (err) {
        console.log(err);
        return false;
      }

      return true;
    },
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      const dbUserId = await getDBUserIdByEmail(token.email);

      /// pass in userId to session
      return {
        ...session,
        user: {
          ...session.user,
          id: dbUserId,
        },
      };
    },
  },
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: NODE_ENV === "development",
};
