import { NextResponse } from "next/server"
import { getTrainByNumber } from "@/lib/server-chennai-data"

const BACKEND = process.env.BACKEND_URL || "http://localhost:4000/api"

export async function GET(
  _request: Request,
  context: { params: Promise<{ trainNumber: string }> },
) {
  const { trainNumber } = await context.params

  try {
    const resp = await fetch(`${BACKEND}/train/${trainNumber}`, {
      signal: AbortSignal.timeout(5000),
    })
    if (resp.ok) {
      const data = await resp.json()
      if (data.success) return NextResponse.json(data.data)
    }
  } catch {
    // fallback to static data
  }

  const train = getTrainByNumber(trainNumber)
  if (!train) return NextResponse.json({ error: "Train not found" }, { status: 404 })
  return NextResponse.json(train)
}
