import type { Ticker } from "@/../types/types";
import { StocksTable } from "@/components";
import { OriginalTable } from "@/components";
import { getStocksFromDB } from "@/db/queries/stocks"; /// FETCH DATA WITHOUT API
import { getServerSession } from "next-auth";
import { unstable_cache as nextCache } from "next/cache";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getLikedStocksByUser } from "@/db/queries/likes";

const getCachedStocks = nextCache(
  async () => getStocksFromDB(),
  ["allstocks"],
  {
    // revalidate: 3600,
    revalidate: 1,
  },
);

export default async function AllStocks() {
  const stocks = await getCachedStocks();
  const session = await getServerSession(authOptions);
  let likedTickers: Ticker[] = [];

  if (session && session.user) {
    likedTickers = await getLikedStocksByUser(session.user.id);
  }

  return (
    <StocksTable stocks={stocks} likedTickers={likedTickers} />
    // <OriginalTable />
  );
}
