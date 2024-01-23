import { NextRequest, NextResponse } from "next/server";
import {events} from "./data.json"

export function GET(request: NextRequest) {
    return NextResponse.json(events)
}