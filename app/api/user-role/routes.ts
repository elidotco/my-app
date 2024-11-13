import { getUserRole } from "@/app/actions/auth/route";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const role = await getUserRole();
    return NextResponse.json({ role });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user role" },
      { status: 500 }
    );
  }
}
