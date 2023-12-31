export type Stock = {
  _id: string; // TS: if not set to optional, TS complains when passing the props to Card-Component...
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
  bruchwert52Week: number;
  Favorites?: string[];
  logoURL: string;
  updatedAt: string;
  quotesData: {
    _id: string;
    ticker: string;
    change: string;
    changePercent: string;
    latestTradingDay: string;
    previousClose: number;
    price: number;
    volume: number;
    updatedAt: string;
  };
  logoData: {
    _id: string;
    ticker: string;
    logoURL: string;
    name: string;
    updatedAt: string;
  };
};

export type DemoStock = {
  _id: string; // TS: if not set to optional, TS complains when passing the props to Card-Component...
  Symbol: string;
  Name: string;
  Description: string;
  Exchange: string;
  Sector: string;
  Industry: string;
  DividendPerShare: number;
  DividendYield: number;
  EPS: number;
  EPSx15: number;
  BookValue: number; // | string
  _52WeekHigh: number;
  _52WeekLow: number;
  AnalystTargetPrice: number;
  Price: number;
  Bruchwert52Week: number;
  Favorites?: string[];
  LogoURL: string;
};

// TS: Yair
// export type SortByType = "Symbol" | "Name";
export type SortByType = "ticker" | "name";

// TS: Yair
export type SortDirectionType = "ascending" | "descending";

// TS: Yair
export type SortParamType = {
  sortBy: SortByType;
  sortDirection: SortDirectionType;
};

export type FavoriteMutation = {
  // TS: Yair
  id: string;
  Favorites: string;
};
