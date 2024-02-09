import { StocksTable } from "@/components";
import { OriginalTable } from "@/components";
import { getStockOverviewsFromAPI } from "@/lib/data"; //:: FETCH DATA WITH API
import { getStockOverviewsFromDB } from "@/lib/data"; //:: FETCH DATA WITHOUT API

console.log("render Home");

export const revalidate = 3600; //:: set revalidation time for cached stocks

export default async function Home() {
  //:: FETCH DATA WITHOUT API
  const stocks = await getStockOverviewsFromDB();

  //:: FETCH DATA WITH API
  // const stocks = await getStockOverviewsFromAPI();

  return (
    <section>
      <StocksTable stocks={stocks} />
      {/* <OriginalTable /> */}
    </section>
  );
}
