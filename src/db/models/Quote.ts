import mongoose from "mongoose";
import { NumberOrNull } from "./_customSchemaTypes";

const quoteSchema = new mongoose.Schema(
  {
    ticker: { type: String, required: true },
    /// alphaVantage START
    price: NumberOrNull, // = close
    volume: NumberOrNull,
    latestTradingDay: String,
    // latestTradingDay: Date,
    previousClose: NumberOrNull,
    change: String,
    changePercent: String,
    /// alphaVantage END
  },
  /// create timestamps for createdAt and updatedAt
  { timestamps: true }, /// https://mongoosejs.com/docs/timestamps.html
);

/// check whether the model with this name has already been
/// compiled and if yes, take the already compiled model
export const Quote =
  mongoose.models.Quote || mongoose.model("Quote", quoteSchema);
