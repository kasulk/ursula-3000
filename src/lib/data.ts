import Overview from "../../db/models/Overview";
import dbConnect from "../../db/connect";

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
export function cleanStocks(stocks: any[]) {
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
export async function getStockOverviews() {
  try {
    dbConnect();
    const stockOverviews = await Overview.find();
    return stockOverviews;
    //
  } catch (err: any) {
    console.log(err);
    throw new Error(
      "Uh-oh... Failed to fetch stocks overviews from database!",
      err,
    );
  }
}

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
