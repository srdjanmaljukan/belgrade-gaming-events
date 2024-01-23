import { NextRequest, NextResponse } from "next/server";
import {events} from "../data.json"

interface Props {
    params: {slug: string}
}

export function GET(request: NextRequest, {params}: Props) {
  const evt = events.filter(ev => ev.slug === params.slug)

  return NextResponse.json(evt)
}