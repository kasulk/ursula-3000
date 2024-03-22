import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    ticker: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// check whether the model with this name has already been
// compiled and if yes, take the already compiled model
export const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);
