"use server";

import mongoose from "mongoose";
import dbConnect from "@/db/connect";
import { Like } from "@/db/models";
import { getLogTime } from "@/utils/debug";

export async function createLike(userIdString: string, ticker: string) {
  await dbConnect();
  const like = new Like({
    userId: new mongoose.Types.ObjectId(userIdString),
    ticker,
  });

  await like.save();

  getLogTime();
  console.log(ticker + " like saved!");
}
