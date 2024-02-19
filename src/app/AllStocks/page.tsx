import { StocksTable } from "@/components";
import { OriginalTable } from "@/components";
import { getStockOverviewsFromAPI } from "@/lib/data"; //:: FETCH DATA WITH API
import { getStockOverviewsFromDB } from "@/lib/data"; //:: FETCH DATA WITHOUT API
import { unstable_cache as nextCache } from "next/cache";

console.log("render AllStocks");

const getCachedStockOverviews = nextCache(
  async () => getStockOverviewsFromDB(),
  ["all-stock-overviews"],
  {
    revalidate: 3600,
  },
);

export default async function AllStocks() {
  //:: FETCH DATA WITHOUT API
  // const stocks = await getStockOverviewsFromDB();
  const stocks = await getCachedStockOverviews();

  //:: FETCH DATA WITH API
  // const stocks = await getStockOverviewsFromAPI();

  return (
    <section>
      <StocksTable stocks={stocks} />
      {/* <OriginalTable /> */}
    </section>
  );
}
