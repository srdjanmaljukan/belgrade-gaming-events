import { API_URL } from "@/config";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  if (!cookies().has("token")) {
    return NextResponse.json({ message: "Not Authorized" }, { status: 403 });
  }
  const token = cookies().get("token")?.value;

  const strapiRes = await fetch(`${API_URL}/api/users/me?populate=*`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = await strapiRes.json()

//   console.log(strapiRes)

  if (strapiRes.ok) {
    return NextResponse.json({user}, {status: 200})
  } else {
    return NextResponse.json({message: "User forbidden"}, {status: 403})
  }
}
