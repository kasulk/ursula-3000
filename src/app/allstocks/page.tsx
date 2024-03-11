import { StocksTable } from "@/components";
import { OriginalTable } from "@/components";
import { getStockOverviewsFromAPI } from "@/lib/data"; /// FETCH DATA WITH API
import { getStocksFromDB } from "@/lib/data"; /// FETCH DATA WITHOUT API
import { unstable_cache as nextCache } from "next/cache";

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

  /// FETCH DATA WITH API
  // const stocks = await getStockOverviewsFromAPI();

  return (
    // <section>
    <StocksTable stocks={stocks} />
    // <OriginalTable />
    // </section>
  );
}
