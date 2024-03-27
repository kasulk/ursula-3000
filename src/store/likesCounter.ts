import { create } from "zustand";
import { Ticker } from "../../types/types";

type LikedStocksStore = {
  likedStocks: Ticker[];
  addLikedStock: (ticker: Ticker) => void;
  removeLikedStock: (ticker: Ticker) => void;
  setLikedStocks: (tickers: Ticker[]) => void;
};

export const useLikedStocksStore = create<LikedStocksStore>((set) => ({
  likedStocks: [],
  setLikedStocks: (tickers) => set({ likedStocks: tickers }),
  addLikedStock: (newTicker) =>
    set((state) => ({ likedStocks: [...state.likedStocks, newTicker] })),
  removeLikedStock: (ticker) =>
    set((state) => ({
      likedStocks: [...state.likedStocks.filter((stock) => stock !== ticker)],
    })),
}));
