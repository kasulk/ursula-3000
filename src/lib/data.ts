import { cache } from "react";
import Overview from "../../db/models/Overview";
import dbConnect from "../../db/connect";
import { Stock } from "../../types/types";

// FETCH DATA WITH API
export async function fetchStockOverviews() {
  console.log("Overviews are being fetched...");
  const res = await fetch("http://localhost:3000/api/stocks", {
    next: {
      revalidate: 60,
    },
  });
  console.log("Overviews have been fetched.");

  return res.json();
}

// FETCH DATA WITHOUT API
export async function getStockOverviews(): Promise<Stock[]> {
  try {
    dbConnect();
    const cachedStockOverviews = cache(async () => {
      console.log("Overviews are being fetched...");
      const stockOverviews = await Overview.find().sort({ ticker: 1 });
      console.log("Overviews have been fetched.");
      return mongoDocsToPlainObjs(stockOverviews) as Stock[];
    });

    return await cachedStockOverviews();
    //
  } catch (err: any) {
    console.log(err);
    throw new Error(
      "Uh-oh... Failed to fetch stocks overviews from database!",
      err,
    );
  }
}

// Only plain objects can be passed from Server Components
// to Client Components
export function mongoDocsToPlainObjs(documents: any[]): Object[] {
  const plainObjects = documents.map((doc) => {
    const { _id, ...rest } = doc.toObject();
    return { _id: _id.toString(), ...rest };
  });

  return plainObjects;
}

const dataFilter = {
  // data set to 0 or omitted won't be fetched from db
  _id: 1,
  ticker: 1,
  name: 1,
  description: 1,
  exchange: 1,
  sector: 1,
  industry: 1,
  dividendPerShare: 1,
  dividendYield: 1,
  eps: 1,
  eps15x: 1,
  bookValue: 1,
  fiftyTwoWeekLow: 1,
  analystTargetPrice: 1,
  price: 1,
  // bruchwert52Week: 1,
  // logoURL: 1,
  updatedAt: 1,
};

// export async function getUser(id) {
//   try {
//     dbConnect();
//     const user = await User.findById(id);
//     return user;
//     //
//   } catch (err: any) {
//     console.log(err);
//     throw new Error("Uh-oh... Failed to fetch user!", err);
//   }
// }
