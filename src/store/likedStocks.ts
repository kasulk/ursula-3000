import { create } from "zustand";
import { Ticker } from "@/../types/types";

type LikedStocksStore = {
  tickers: Ticker[];
  setLikedStocks: (tickers: Ticker[]) => void;
  addLikedStock: (ticker: Ticker) => void;
  removeLikedStock: (ticker: Ticker) => void;
};

export const useLikedStocksStore = create<LikedStocksStore>()((set, get) => ({
  tickers: [],
  setLikedStocks: (tickers) => set({ tickers }),
  addLikedStock: (ticker) => {
    const updatedTickers = [...get().tickers, ticker];
    set({ tickers: updatedTickers });
  },
  removeLikedStock: (ticker) => {
    const updatedTickers = get().tickers.filter((t) => t !== ticker);
    set({ tickers: updatedTickers });
  },
}));
