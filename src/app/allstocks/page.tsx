import { StocksTable } from "@/components";
import { OriginalTable } from "@/components";
import { getStockOverviewsFromAPI } from "@/db/queries/stocks"; /// FETCH DATA WITH API
import { getStocksFromDB } from "@/db/queries/stocks"; /// FETCH DATA WITHOUT API
import { unstable_cache as nextCache } from "next/cache";

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
