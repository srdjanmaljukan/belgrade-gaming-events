import { API_URL } from "@/config";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json();

  const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await strapiRes.json();

  if (strapiRes.ok) {
    // Set cookie

    cookies().set("token", data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
      path: "/"
    });

    return NextResponse.json({ user: data.user }, { status: 200 });
  } else {
    return NextResponse.json({ message: data.error.message }, {status: 401});
  }
}
