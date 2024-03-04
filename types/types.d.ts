import { NumberSchemaDefinition } from "mongoose";

interface IOverviewData {
  id: string;
  ticker: string;
  address: string;
  analystTargetPrice: number;
  assetType: string;
  beta: number;
  bookValue: number;
  cik: string;
  country: string;
  currency: string;
  description: string;
  dilutedEPSTTM: number;
  dividendDate: string;
  dividendPerShare: number;
  dividendYield: number;
  ebitda: number;
  eps: number;
  eps15x: number;
  evToEBITDA: number;
  evToRevenue: number;
  exDividendDate: string;
  exchange: string;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  fiscalYearEnd: string;
  forwardPE: number;
  grossProfitTTM: number;
  industry: string;
  latestQuarter: string;
  marketCapitalization: number;
  movingAverage200day: number;
  movingAverage50day: number;
  name: string;
  operatingMarginTTM: number;
  peRatio: number;
  pegRatio: number;
  priceToBookRatio: number;
  priceToSalesRatioTTM: number;
  profitMargin: number;
  quarterlyEarningsGrowthYOY: number;
  quarterlyRevenueGrowthYOY: number;
  returnOnAssetsTTM: number;
  returnOnEquityTTM: number;
  revenuePerShareTTM: number;
  revenueTTM: number;
  sector: string;
  sharesOutstanding: number;
  trailingPE: number;
  updatedAt: string;
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
  avatar?: string;
  role: string;
  favoriteStocks: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface IUserWithPassword extends IUser {
  password: string;
}
