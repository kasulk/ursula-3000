"use server";

import mongoose from "mongoose";
import dbConnect from "@/db/connect";
import { Like } from "@/db/models";

export async function createLike(userIdString: string, ticker: string) {
  try {
    await dbConnect();
    const like = new Like({
      userId: new mongoose.Types.ObjectId(userIdString),
      ticker,
    });
    await like.save();

    console.log(ticker + " like saved!");
  } catch (error) {
    console.error(`An error occurred while saving like for ${ticker}:`, error);
  }
}
