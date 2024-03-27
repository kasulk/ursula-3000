import { create } from "zustand";
import { Ticker } from "@/../types/types";

type LikedStocksStore = {
  tickers: Ticker[];
  setLikedStocks: (tickers: Ticker[]) => void;
  addLikedStock: (ticker: Ticker) => void;
  removeLikedStock: (ticker: Ticker) => void;
};

export const useLikedStocksStore = create<LikedStocksStore>()((set) => ({
  tickers: [],
  setLikedStocks: (tickers) => set({ tickers }),
  addLikedStock: (ticker) =>
    set((state) => {
      const tickers = [...state.tickers, ticker];
      return { tickers };
    }),
  removeLikedStock: (ticker) =>
    set((state) => {
      const tickers = state.tickers.filter((t) => t !== ticker);
      return { tickers };
    }),
}));
