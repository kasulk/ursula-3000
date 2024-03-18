import type { IUser, IUserWithPassword } from "@/../types/types";

/// Only plain objects can be passed from Server Components
/// to Client Components
export function mongoDocToPlainObj(document: any): Object {
  const { _id, __v, ...rest } = document.toObject();
  const plainObject = { id: _id.toString(), ...rest };
  return plainObject;
}

export function mongoDocsToPlainObjs(documents: any[]): Object[] {
  const plainObjects = documents.map((doc) => mongoDocToPlainObj(doc));
  return plainObjects;
}

export function removePasswordFromUser(user: IUserWithPassword): IUser {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function createUsername(): string {
  const randomNumStr = Math.floor(Math.random() * 100000).toString();
  return "ursula" + randomNumStr;
}

export function createUsernameFromEmail(email?: string | null): string {
  const randomNumStr = Math.floor(Math.random() * 10000).toString();
  if (!email) return "ursula" + randomNumStr;
  if (email.length > 30) {
    const [local] = email.split("@");
    return local.slice(0, 26) + randomNumStr;
  }
  return email;
}
