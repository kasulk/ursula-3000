export interface Stock {
  _id: string;
  ticker: string;
  name: string;
  description: string;
  exchange: string;
  sector: string;
  industry: string;
  dividendPerShare: number;
  dividendYield: number;
  eps: number;
  eps15x: number;
  bookValue: number; // | string
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  analystTargetPrice: number;
  price: number;
  // bruchwert52Week: number;
  // Favorites?: string[];
  // logoURL: string;
  updatedAt: string;
  quotes?: {
    _id?: string;
    ticker: string;
    change: string;
    changePercent: string;
    latestTradingDay: string;
    previousClose: number;
    price: number;
    volume: number;
    updatedAt: string;
  };
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
