import { cache } from "react";
import dbConnect from "@/../db/connect";
import { Overview, Quote, Logourl } from "@/../db/models";
import { Stock } from "@/../types/types";

//:: FETCH DATA WITH API ::
export async function getStockOverviewsFromAPI(): Promise<Stock[]> {
  const res = await fetch("http://localhost:3000/api/stocks", {
    next: { revalidate: 3600 },
  });
  console.log("Overviews have been fetched from API.");

  return res.json();
}

//:: FETCH DATA WITHOUT API ::
export const revalidate = 3600; //:: set revalidation time for cached stocks
// export const getStockOverviewsFromDB: () => Promise<Stock[]> = cache(async () => {
// export const getStockOverviewsFromDB = cache(async () => {
export async function getStockOverviewsFromDB() {
  dbConnect();
  const stockOverviews = await Overview.find().sort({ name: 1 });
  console.log("Overviews have been fetched from DB.");
  return mongoDocsToPlainObjs(stockOverviews) as Stock[];
  // });
}

// export async function getStockLogoURLsFromDB(): Promise<Stock[]> {
//   dbConnect();
//   const stockLogoURLs = await Logourl.find();
//   return mongoDocsToPlainObjs(stockLogoURLs) as Stock[];
// }

// export async function getStockQuotesFromDB(): Promise<Stock[]> {
//   dbConnect();
//   const stockQuotes = await Quote.find();
//   return mongoDocsToPlainObjs(stockQuotes) as Stock[];
// }

//:: Only plain objects can be passed from Server Components
//:: to Client Components
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
