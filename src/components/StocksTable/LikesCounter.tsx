import { useLikedStocksStore } from "@/store/likedStocks";

export default function LikesCounter() {
  const likedTickers = useLikedStocksStore((state) => state.likedTickers);

  return (
    <span className="absolute -top-1 left-10 z-10 flex items-center justify-center rounded-full bg-danger px-2 py-1 text-foreground">
      {likedTickers.length}
    </span>
  );
}
