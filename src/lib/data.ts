import { cache } from "react";
import dbConnect from "@/db/connect";
import { Overview, Quote, Logourl, User } from "@/db/models";
import {
  IOverviewData,
  IUser,
  IUserWithPassword,
  IStock,
  IQuoteData,
  ILogoData,
} from "@/../types/types";

//:: FETCH DATA WITH API ::
export async function getStockOverviewsFromAPI(): Promise<IStock[]> {
  const res = await fetch("http://localhost:3000/api/stocks", {
    next: { revalidate: 3600 },
  });
  console.log("Overviews have been fetched from API.");

  return res.json();
}

function getLogTime() {
  console.log(
    "::::::::::::::::::::\n",
    new Date().toLocaleString("de-DE"),
    "\n::::::::::::::::::::",
  );
}

//:: FETCH DATA WITHOUT API ::
export const revalidate = 3600; //:: set revalidation time for cached stocks
// export const getStockOverviewsFromDB: () => Promise<Stock[]> = cache(async () => {
// export const getStockOverviewsFromDB = cache(async () => {
export async function getStocksFromDB() {
  dbConnect();
  getLogTime(); /// for debuggin'
  const stocksData = [
    await Overview.find().sort({ name: 1 }),
    await Quote.find(),
    await Logourl.find(),
  ].map((dataset) => mongoDocsToPlainObjs(dataset));

  const [overviews, quotesData, logosData] = stocksData as [
    IOverviewData[],
    IQuoteData[],
    ILogoData[],
  ];

  const mergedData = overviews.map((overview) => {
    const quotes =
      quotesData.find((data) => data.ticker === overview.ticker) || null;

    delete quotes?.id;

    const logoURL =
      logosData.find((data) => data.ticker === overview.ticker)?.logoURL ||
      null;

    return {
      ...overview,
      quotes,
      logoURL,
    };
  });
  console.log("mergedData[3]:", mergedData[3]);

  return mergedData as IStock[];
}

//:: Only plain objects can be passed from Server Components
//:: to Client Components
export function mongoDocToPlainObj(document: any): Object {
  const { _id, __v, ...rest } = document.toObject();
  const plainObject = { id: _id.toString(), ...rest };
  return plainObject;
}

export function mongoDocsToPlainObjs(documents: any[]): Object[] {
  const plainObjects = documents.map((doc) => mongoDocToPlainObj(doc));
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

export async function getDBUserByID(id: string): Promise<IUserWithPassword> {
  try {
    dbConnect();
    const dbUser = await User.findOne({ _id: id });
    return mongoDocToPlainObj(dbUser) as IUserWithPassword;
  } catch (err: any) {
    console.log("error:", err);
    throw new Error("Uh-oh... Failed to fetch user!", err);
  }
}

export async function getDBUserByEmailWithoutPassword(
  email: string,
): Promise<IUser> {
  try {
    dbConnect();
    const dbUser = await User.findOne({ email });
    const user = mongoDocToPlainObj(dbUser) as IUserWithPassword;
    return removePasswordFromUser(user);
  } catch (err: any) {
    console.log("error:", err);
    throw new Error("Uh-oh... Failed to fetch user!", err);
  }
}

export function removePasswordFromUser(user: IUserWithPassword): IUser {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function createUsername(): string {
  const randomNumStr = Math.floor(Math.random() * 100000).toString();
  return "ursula" + randomNumStr;
}

export function createUsernameFromEmail(email?: string | null): string {
  const randomNumStr = Math.floor(Math.random() * 10000).toString();
  if (!email) return "ursula" + randomNumStr;
  if (email.length > 30) {
    const [local] = email.split("@");
    return local.slice(0, 26) + randomNumStr;
  }
  return email;
}
