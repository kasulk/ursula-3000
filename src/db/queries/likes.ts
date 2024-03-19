import dbConnect from "../connect";
import { Like } from "../models";

type Ticker = string;

export async function getLikedStocksByUser(userId: any): Promise<Ticker[]> {
  dbConnect();
  const userLikes = await Like.find({ userId }).lean();
  const likedTickers = userLikes.map((like) => like.ticker); // ['AMD', 'MCD' ...]

  return likedTickers;
}
