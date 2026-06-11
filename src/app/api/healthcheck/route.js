export const runtime = "nodejs";

import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(`${process.env.MONGODB_URI}/nextcv`);
    }

    await mongoose.connection.db.admin().ping();

    return NextResponse.json({
      success: true,
      db: "connected",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        db: "disconnected",
      },
      { status: 500 }
    );
  }
}
