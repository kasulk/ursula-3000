import dbConnect from "../../../../db/connect";
import { Overview } from "../../../../db/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const stockOverviews = await Overview.find();
    // .sort({ ticker: 1 });
    // .sort({ marketCapitalization: -1 })
    // .populate("quotesData");
    // .populate("logoData");

    return new NextResponse(JSON.stringify(stockOverviews), { status: 200 });
    //
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error\n\n" + error, { status: 500 });
  }
}
