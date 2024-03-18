import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      min: 3,
      max: 30,
    },
    password: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 60,
    },
    emailVerified: {
      type: Date || null,
    },
    avatar: {
      type: String,
    },
    account: {
      type: String,
      enum: ["credentials", "github", "google"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
    },
    // favoriteStocks: {
    //   type: [String],
    // },
  },
  { timestamps: true },
);

// check whether the model with this name has already been
// compiled and if yes, take the already compiled model
export const User = mongoose.models.User || mongoose.model("User", userSchema);
