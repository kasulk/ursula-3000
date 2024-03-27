import { create } from "zustand";
import { Ticker } from "@/../types/types";

type LikedStocksStore = {
  likedTickers: Ticker[];
  addLikedStock: (ticker: Ticker) => void;
  removeLikedStock: (ticker: Ticker) => void;
  setLikedStocks: (tickers: Ticker[]) => void;
};

export const useLikedStocksStore = create<LikedStocksStore>((set) => ({
  likedTickers: [],
  setLikedStocks: (tickers) => set({ likedTickers: tickers }),
  addLikedStock: (newTicker) =>
    set((state) => ({ likedTickers: [...state.likedTickers, newTicker] })),
  removeLikedStock: (ticker) =>
    set((state) => ({
      likedTickers: [
        ...state.likedTickers.filter((_ticker) => _ticker !== ticker),
      ],
    })),
}));
