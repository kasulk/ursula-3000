import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const connection = {
  isConnected: 0,
};

export default async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env",
    );
  }

  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    //
  } catch (error: any) {
    console.log(error);
    throw new Error("Uh-oh...", error);
  }
}
