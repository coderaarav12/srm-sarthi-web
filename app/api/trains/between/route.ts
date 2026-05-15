import { NextResponse } from "next/server"
import { getTrainsBetween } from "@/lib/server-chennai-data"

const BACKEND = process.env.BACKEND_URL || "http://localhost:4000/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const from = searchParams.get("from") || "POTI"
  const to = searchParams.get("to") || "MSB"

  try {
    const resp = await fetch(`${BACKEND}/search?from=${from}&to=${to}`, {
      signal: AbortSignal.timeout(5000),
    })
    if (resp.ok) {
      const data = await resp.json()
      return NextResponse.json({ from, to, trains: data.data?.trains || [] })
    }
  } catch {
    // fallback to static data
  }

  const trains = getTrainsBetween(from, to)
  return NextResponse.json({ from, to, trains })
}
