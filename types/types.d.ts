import { Document } from "mongoose";
import { NumberSchemaDefinition } from "mongoose";

interface IOverviewData {
  id: string;
  ticker: string;
  name: string;
  description: string;
  exchange: string;
  sector: string;
  industry: string;
  marketCapitalization: number;

  dividendPerShare: number;
  dividendYield: number;

  analystTargetPrice: number;
  eps: number;
  eps15x: number;
  bookValue: number;
  priceToBookRatio: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;

  updatedAt: string;

  /// optional data
  address?: string;
  assetType?: string;
  beta?: number;
  cik?: string;
  country?: string;
  currency?: string;
  dilutedEPSTTM?: number;
  dividendDate?: string;
  ebitda?: number;
  evToEBITDA?: number;
  evToRevenue?: number;
  exDividendDate?: string;
  fiscalYearEnd?: string;
  forwardPE?: number;
  grossProfitTTM?: number;
  latestQuarter?: string;
  movingAverage200day?: number;
  movingAverage50day?: number;
  operatingMarginTTM?: number;
  pegRatio?: number;
  peRatio?: number;
  priceToSalesRatioTTM?: number;
  profitMargin?: number;
  quarterlyEarningsGrowthYOY?: number;
  quarterlyRevenueGrowthYOY?: number;
  returnOnAssetsTTM?: number;
  returnOnEquityTTM?: number;
  revenuePerShareTTM?: number;
  revenueTTM?: number;
  sharesOutstanding?: number;
  trailingPE?: number;
}

interface IQuoteData {
  id?: string;
  ticker: string;
  change: string;
  changePercent: string;
  latestTradingDay: string;
  previousClose: number;
  price: number;
  volume: number;
  updatedAt: string;
}

interface ILogoData {
  id: string;
  ticker: string;
  symbol: string;
  name: string;
  logoURL: string;
  updatedAt: string;
}

interface IStock extends IOverviewData {
  quotes: IQuotesData;
  logoURL: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;

  avatar?: string | null;
  account: "credentials" | "github" | "google";
  role: "user" | "admin";
  // favoriteStocks: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface IUserWithPassword extends IUser {
  password: string;
}

type Ticker = string;
