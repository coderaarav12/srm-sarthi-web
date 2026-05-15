import { NextResponse } from "next/server"
import { getTrainsByStationBoard } from "@/lib/server-chennai-data"

const BACKEND = process.env.BACKEND_URL || "http://localhost:4000/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const station = searchParams.get("station") || "POTI"

  try {
    const resp = await fetch(`${BACKEND}/station/${station}`, {
      signal: AbortSignal.timeout(5000),
    })
    if (resp.ok) {
      const data = await resp.json()
      return NextResponse.json(data.data || { station, trains: [] })
    }
  } catch {
    // fallback to static data
  }

  const trains = getTrainsByStationBoard(station)
  return NextResponse.json({ station, trains })
}
