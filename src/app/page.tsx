import { StocksTable } from "@/components";
import { Stock } from "../../types/types";
import { fetchStockOverviews, getStockOverviews } from "@/lib/data";

console.log("render Home");

// FETCH DATA WITHOUT API
// export const revalidate = 3600; // set revalidation time for cached stocks

export default async function Home() {
  // FETCH DATA WITHOUT API
  // const stocks: Stock[] = await getStockOverviews();

  // FETCH DATA WITH API
  const stocks: Stock[] = await fetchStockOverviews();

  return (
    <section>
      <StocksTable stocks={stocks} />
    </section>
  );
}
