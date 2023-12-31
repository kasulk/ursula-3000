import {
  formatTimestampToDate,
  formatTimestampToDays,
} from "../../utils/DataUtils";
import React from "react";

type Props = {
  stockNumbersToRender: {
    title: string;
    value: string;
    styles: string;
    distToPrice?: string;
    // distToPrice?: number | "-";
  }[];
  priceLatestUpdate: string;
  updatedAt: string;
};

export default function StockCardBody({
  stockNumbersToRender,
  priceLatestUpdate,
  updatedAt,
}: Props) {
  return (
    <>
      {stockNumbersToRender.map(
        (number, index) =>
          number.value && (
            // <div key={index} className="flex justify-between items-center">
            <div
              key={index}
              className="grid grid-cols-3 transition-all hover:bg-accent-1"
            >
              {/* //? grid? */}
              <span className={number.styles}>{number.title}: </span>
              <div className="text-center">
                {number.distToPrice && (
                  <span
                    className={` text-xs rounded px-0.5 
   ${
     Number(number.distToPrice) > 0
       ? "bg-red-500 text-red-950"
       : "bg-green-500 text-green-950"
   } `}
                  >
                    {`${
                      Number(number.distToPrice) > 0 ? "+" : ""
                      // }${number.distToPrice.toFixed(0)}%`}
                    }${number.distToPrice}%`}
                  </span>
                )}
              </div>
              <span
                className="text-right"
                title={
                  number.title === "Price"
                    ? `last updated: ${formatTimestampToDays(
                        priceLatestUpdate
                      )} - ${formatTimestampToDate(priceLatestUpdate)}`
                    : ""
                }
              >
                {number.value}
              </span>
            </div>
          )
      )}
      <span
        className="flex justify-end text-xs italic opacity-30"
        title={formatTimestampToDate(updatedAt)}
      >
        last updated: {formatTimestampToDays(updatedAt)}
      </span>
    </>
  );
}
