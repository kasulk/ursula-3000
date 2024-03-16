import NextAuth from "next-auth";

/// augment Profile type in
/// node_modules/next-auth/src/core/types.ts
/// because of missing login and avatar_url properties
///
/// Docs: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module "next-auth" {
  interface Profile {
    login?: string;
    avatar_url?: string;
  }
  /// usually not needed, this is a nextauth bug fix:
  /// user obj does not get the id property asigned to it
  /// see seesion callback in authOptions.ts
  // interface Session {
  //   user: {
  //     id: string;
  //   } & DefaultSession["user"];
  // }
}
