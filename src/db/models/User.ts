import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      min: 3,
      max: 20,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    avatar: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    favoriteStocks: {
      type: [String],
    },
  },
  { timestamps: true },
);

// check whether the model with this name has already been
// compiled and if yes, take the already compiled model
export const User = mongoose.models.User || mongoose.model("User", userSchema);
