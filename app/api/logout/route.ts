import { API_URL } from "@/config";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  // Destroy cookie

  cookies().delete("token");

  return NextResponse.json({message: "Success."}, {status: 200})
}
