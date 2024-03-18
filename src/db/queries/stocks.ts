import type {
  ILogoData,
  IOverviewData,
  IQuoteData,
  IStock,
} from "@/../types/types";
import dbConnect from "../connect";
import { Logourl, Overview, Quote } from "../models";
import { mongoDocsToPlainObjs } from "@/utils/data";

const dataFilterOverviews = [
  "id",
  "ticker",
  "name",
  "description",
  "exchange",
  "sector",
  "industry",
  "marketCapitalization",
  "dividendPerShare",
  "dividendYield",
  "analystTargetPrice",
  "eps",
  "eps15x",
  "bookValue",
  "priceToBookRatio",
  "fiftyTwoWeekHigh",
  "fiftyTwoWeekLow",
  "updatedAt",

  "country",
];

/// FETCH DATA WITH API
export async function getStockOverviewsFromAPI(): Promise<IStock[]> {
  const res = await fetch("http://localhost:3000/api/stocks", {
    next: { revalidate: 3600 },
  });
  console.log("Overviews have been fetched from API.");
  return res.json();
}

/// FETCH DATA WITHOUT API
// export const revalidate = 3600; /// set revalidation time for cached stocks
export const revalidate = 1; /// set revalidation time for cached stocks

export async function getStocksFromDB(): Promise<IStock[]> {
  dbConnect();
  const stocksData = [
    await Overview.find().select(dataFilterOverviews).sort({ ticker: 1 }),
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

  return mergedData as IStock[];
}
