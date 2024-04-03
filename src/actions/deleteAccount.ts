"use server";

import dbConnect from "@/db/connect";
import { Like, User } from "@/db/models";

export async function deleteAccount(userId: string) {
  try {
    await dbConnect();

    const userDeleteResult = await User.deleteOne({ _id: userId });
    if (userDeleteResult.deletedCount === 0) {
      throw new Error(`User ${userId} not found.`);
    }
    console.log("User " + userId + " deleted!");

    const likesDeleteResult = await Like.deleteMany({ userId });
    console.log(
      `${likesDeleteResult.deletedCount} likes from user ${userId} deleted!`,
    );
  } catch (error) {
    console.error(
      `An error occurred while deleting data for user ${userId}:`,
      error,
    );
  }
}
