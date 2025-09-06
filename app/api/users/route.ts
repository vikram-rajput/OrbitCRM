import { db } from "@/lib/db/drizzle";
import { user } from "@/lib/db/schema";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const allUsers = await db.select().from(user);
    return NextResponse.json(allUsers);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}