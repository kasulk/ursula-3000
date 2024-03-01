import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
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
    avatar: {
      type: String,
    },
    role: {
      type: String,
      // enum: ["admin", "user", "googleUser", "githubUser"],
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
