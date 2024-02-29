import {API_URL} from "@/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
    const {identifier, password} = await request.json();
    
    const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            identifier,
            password
        })
    })

    const data = await strapiRes.json()

    if (strapiRes.ok) {
        // Set cookie
        return NextResponse.json({user: data.user}, {status: 200})
    } else {
        return NextResponse.json({message: data.error.message})
    }

    
}