import Overview from "../../db/models/Overview";
import dbConnect from "../../db/connect";
import { Stock } from "../../types/types";

//*********************
//* FETCH DATA WITH API
//*********************
// async function getStocks(): Promise<Stock[]> {
export async function getStocks(): Promise<any[]> {
  const res = await fetch("http://localhost:4000/stocks", {
    // const data = await fetch("https://ursula-2000.vercel.app/api/stocks", {
    next: {
      // revalidate: 3600, // production mode
      revalidate: 30, // dev mode
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data from API!");
  }

  return res.json();
}
//* clean demo data export from MongoDB
export function cleanStocks(stocks: any[]): Stock[] {
  return stocks.map((stock) => {
    return {
      ...stock,
      _id: stock._id.$oid,
      dividendDate: stock.dividendDate.$date,
      ebitda: stock.ebitda?.$numberLong,
      exDividendDate: stock.exDividendDate.$date,
      grossProfitTTM: stock.grossProfitTTM.$numberLong,
      latestQuarter: stock.latestQuarter.$date,
      marketCapitalization: stock.marketCapitalization.$numberLong,
      revenueTTM: stock.revenueTTM.$numberLong,
      sharesOutstanding: stock.sharesOutstanding.$numberLong,
      updatedAt: stock.updatedAt.$date,
    };
  });
}

//************************
//* FETCH DATA WITHOUT API
//************************
export async function getStockOverviews(): Promise<Stock[]> {
  try {
    dbConnect();
    // const stockOverviews = await Overview.find({}, dataFilter)
    const stockOverviews = await Overview.find();
    return mongoDocsToPlainObjs(stockOverviews) as Stock[];
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
