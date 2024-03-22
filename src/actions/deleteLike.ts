"use server";

import dbConnect from "@/db/connect";
import { Like } from "@/db/models";
import { getLogTime } from "@/utils/debug";

export async function deleteLike(userId: string, ticker: string) {
  await dbConnect();
  await Like.deleteOne({
    userId,
    ticker,
  });

  getLogTime();
  console.log(ticker + " like deleted!");
}
