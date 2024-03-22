"use server";

import type { Ticker } from "@/../types/types";
import mongoose from "mongoose";
import dbConnect from "../connect";
import { Like } from "../models";
import { getLogTime } from "@/utils/debug";

export async function getLikedStocksByUser(userId: string): Promise<Ticker[]> {
  await dbConnect();
  const userLikes = await Like.find({ userId }).lean();
  const likedTickers = userLikes.map((like) => like.ticker); // ['AMD', 'MCD' ...]
  return likedTickers;
}

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

export async function deleteLike(userId: string, ticker: string) {
  await dbConnect();
  await Like.deleteOne({
    userId,
    ticker,
  });
  getLogTime();
  console.log(ticker + " like deleted!");
}
