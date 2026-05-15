import { NextResponse } from "next/server"

const BACKEND = process.env.BACKEND_URL || "http://localhost:4000/api"

export async function GET(
  request: Request,
  context: { params: Promise<{ trainNumber: string }> },
) {
  const { trainNumber } = await context.params
  const { searchParams } = new URL(request.url)
  const fromStation = searchParams.get("from") || ""

  try {
    const query = fromStation ? `?from=${fromStation}` : ""
    const resp = await fetch(`${BACKEND}/track/${trainNumber}${query}`, {
      signal: AbortSignal.timeout(30000),
    })
    if (resp.ok) {
      const data = await resp.json()
      if (data.success) return NextResponse.json(data.data)
    }
  } catch {
    // fallback when backend unavailable
  }

  return NextResponse.json({ error: "Train tracking failed" }, { status: 502 })
}
