import mongoose from "mongoose";

const { Schema } = mongoose;

const logourlSchema = new Schema(
  {
    ticker: { type: String, required: true, unique: true },
    symbol: { type: String, required: true, unique: true },
    name: String,
    logoURL: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true },
);

// check whether the model with this name has already been
// compiled and if yes, take the already compiled model
export const Logourl =
  mongoose.models.Logourl || mongoose.model("Logourl", logourlSchema);
