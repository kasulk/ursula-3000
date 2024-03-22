"use server";

import dbConnect from "@/db/connect";
import { Like } from "@/db/models";

export async function deleteLike(userId: string, ticker: string) {
  try {
    await dbConnect();
    await Like.deleteOne({
      userId,
      ticker,
    });

    console.log(ticker + " like deleted!");
  } catch (error) {
    console.error(
      `An error occurred while deleting like for ${ticker}:`,
      error,
    );
  }
}
