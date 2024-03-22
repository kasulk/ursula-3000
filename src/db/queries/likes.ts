import type { Ticker } from "@/../types/types";
import dbConnect from "../connect";
import { Like } from "../models";

export async function getLikedStocksByUser(userId: string): Promise<Ticker[]> {
  await dbConnect();
  const userLikes = await Like.find({ userId }).lean();
  const likedTickers = userLikes.map((like) => like.ticker); // ['AMD', 'MCD' ...]
  return likedTickers;
}
