import { emailFromContact } from "@/modules/contact";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();
    return await emailFromContact({ name, email, message });
  } catch (error) {
    console.error("Email Submission Error:", error);
    return NextResponse.json({ error: error?.message || "something went wrong" }, { status: 500 });
  }
}
