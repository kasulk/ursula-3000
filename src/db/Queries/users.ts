import dbConnect from "../connect";
import { User } from "../models";
import type { IUser, IUserWithPassword } from "@/../types/types";
import { mongoDocToPlainObj, removePasswordFromUser } from "@/utils/data";

export async function getDBUserById(id: string): Promise<IUserWithPassword> {
  try {
    dbConnect();
    const dbUser = await User.findOne({ _id: id });
    return mongoDocToPlainObj(dbUser) as IUserWithPassword;
  } catch (err: any) {
    console.log("error:", err);
    throw new Error("Uh-oh... Failed to fetch user!", err);
  }
}

export async function getDBUserByEmailWithoutPassword(
  email: string,
): Promise<IUser> {
  try {
    dbConnect();
    const dbUser = await User.findOne({ email });
    const user = mongoDocToPlainObj(dbUser) as IUserWithPassword;
    return removePasswordFromUser(user);
  } catch (err: any) {
    console.log("error:", err);
    throw new Error("Uh-oh... Failed to fetch user!", err);
  }
}
