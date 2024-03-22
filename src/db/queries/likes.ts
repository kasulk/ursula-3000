import type { Ticker } from "@/../types/types";
import dbConnect from "../connect";
import { Like } from "../models";

export async function getLikedStocksByUser(userId: string): Promise<Ticker[]> {
  try {
    await dbConnect();
    const userLikes = await Like.find({ userId }).lean();
    const likedTickers = userLikes.map((like) => like.ticker); // ['AMD', 'MCD' ...]
    return likedTickers;
  } catch (error) {
    console.error(
      `An error occurred while fetching liked stocks for user ${userId}:`,
      error,
    );
    throw error;
  }
}
