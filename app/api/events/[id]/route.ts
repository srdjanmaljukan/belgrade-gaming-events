import { NextRequest, NextResponse } from "next/server";
import {events} from "../data.json"

interface Props {
    params: {id: string}
}

export function GET(request: NextRequest, {params}: Props) {
  const evt = events.filter(ev => ev.id === params.id)

  return NextResponse.json(evt)
}