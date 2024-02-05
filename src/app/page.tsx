import { StocksTable } from "@/components";
import { Stock } from "../../types/types";

console.log("render Home");

// async function getStocks(): Promise<Stock[]> {
async function getStocks(): Promise<any[]> {
  // const data = await fetch("http://localhost:4000/stocks", {
  const data = await fetch("https://ursula-2000.vercel.app/api/stocks", {
    next: { revalidate: 3600 },
  });
  return data.json();
}

// clean demo data export from MongoDB
function cleanStocks(stocks: any[]) {
  return stocks.map((stock) => {
    return {
      ...stock,
      _id: stock._id.$oid,
      dividendDate: stock.dividendDate.$date,
      ebitda: stock.ebitda?.$numberLong,
      exDividendDate: stock.exDividendDate.$date,
      grossProfitTTM: stock.grossProfitTTM.$numberLong,
      latestQuarter: stock.latestQuarter.$date,
      marketCapitalization: stock.marketCapitalization.$numberLong,
      revenueTTM: stock.revenueTTM.$numberLong,
      sharesOutstanding: stock.sharesOutstanding.$numberLong,
      updatedAt: stock.updatedAt.$date,
    };
  });
}

export default async function Home() {
  const stocks: any[] = await getStocks();
  const cleanedStocks: Stock[] = cleanStocks(stocks);

  return (
    <section>
      <StocksTable stocks={cleanedStocks} />
      {/* <StocksTable stocks={stocks} /> */}
    </section>
  );
}
