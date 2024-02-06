import { StocksTable } from "@/components";
import { Stock } from "../../types/types";
import { getStockOverviews, getStocks, cleanStocks } from "@/lib/data";

console.log("render Home");

export default async function Home() {
  //* FETCH DATA WITH API
  // const stocks: any[] = await getStocks();
  // const cleanedStocks: Stock[] = cleanStocks(stocks);

  //* FETCH DATA WITHOUT API
  const stocks: Stock[] = await getStockOverviews();

  return (
    <section>
      {/* <StocksTable stocks={cleanedStocks} /> */}
      <StocksTable stocks={stocks} />
    </section>
  );
}
