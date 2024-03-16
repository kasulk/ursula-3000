import { StocksTable } from "@/components";
import { OriginalTable } from "@/components";
import { getLikedStocksByUser, getStockOverviewsFromAPI } from "@/lib/data"; /// FETCH DATA WITH API
import { getStocksFromDB } from "@/lib/data"; /// FETCH DATA WITHOUT API
import { getServerSession } from "next-auth";
import { unstable_cache as nextCache } from "next/cache";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

console.log("render AllStocks");

const getCachedStocks = nextCache(
  async () => getStocksFromDB(),
  ["allstocks"],
  {
    // revalidate: 3600,
    revalidate: 1,
  },
);

export default async function AllStocks() {
  /// FETCH DATA WITHOUT API
  const stocks = await getCachedStocks();
  // const session = await getServerSession(authOptions);

  /// FETCH DATA WITH API
  // const stocks = await getStockOverviewsFromAPI();

  return (
    <StocksTable stocks={stocks} />
    // <OriginalTable />
  );
}
