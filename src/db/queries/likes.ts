import mongoose from "mongoose";
import dbConnect from "../connect";
import { Like } from "../models";

type Ticker = string;

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
}

// const userIdString = "507f1f77bcf86cd799439011";
// const ticker = "AAPL";
// createLike(userIdString, ticker).then(() => console.log("Like saved"));

export async function deleteLike(userId: string, ticker: string) {
  await dbConnect();
  await Like.deleteOne({
    userId,
    ticker,
  });
}
