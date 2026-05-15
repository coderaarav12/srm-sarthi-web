import type { TrainInfo, TrainStop, StationBoardEntry } from "./train-types"

async function apiFetch(url: string) {
  try {
    const resp = await fetch(url, { signal: AbortSignal.timeout(5000) })
    if (resp.ok) return await resp.json()
  } catch {}
  return null
}

function toTrainInfo(data: any): TrainInfo | null {
  if (!data?.trainInfo) return null
  const t = data.trainInfo
  const route: TrainStop[] = (data.route || []).map((r: any) => ({
    stationCode: r.stationCode,
    stationName: r.stationName,
    arrivalTime: r.arrivalTime,
    departureTime: r.departureTime,
    haltTime: "",
    dayCount: parseInt(r.day) || 0,
    distance: parseInt(r.distance) || 0,
    platform: "",
  }))
  return {
    trainNumber: t.trainNo,
    trainName: t.trainName,
    source: { code: t.sourceCode, name: t.sourceName, departureTime: t.departureTime },
    destination: { code: t.destCode, name: t.destName, arrivalTime: t.arrivalTime },
    runsOn: t.runningDays || "0000000",
    duration: t.travelTime || "",
    distance: parseInt(t.totalDist) || 0,
    classes: [],
    route,
  }
}

function toStationBoard(station: string, data: any): StationBoardEntry[] {
  if (!data?.trains) return []
  return data.trains.map((t: any) => ({
    trainNumber: t.trainNo,
    trainName: t.trainName,
    source: t.source,
    destination: t.dest,
    arrivalTime: t.timeAt,
    departureTime: t.timeAt,
    platform: t.platform || "",
    delay: t.delay || 0,
    type: t.source === station ? "departure" : "arrival",
    distance: t.distance || 0,
    runsOn: t.runsOn || "1111111",
  }))
}

export async function getTrainByNumberApi(trainNumber: string): Promise<TrainInfo | null> {
  const data = await apiFetch(`/api/trains/${trainNumber}`)
  if (data) return toTrainInfo({ trainInfo: data, route: (data as any).route })
  return null
}

export async function getTrainsBetweenApi(from: string, to: string): Promise<TrainInfo[]> {
  const data = await apiFetch(`/api/trains/between?from=${from}&to=${to}`)
  if (data?.trains) {
    return data.trains.map((t: any) => toTrainInfo({
      trainInfo: {
        trainNo: t.trainNo || t.trainNumber,
        trainName: t.trainName,
        sourceCode: t.sourceCode || (t.source?.code),
        sourceName: t.sourceName || (t.source?.name),
        destCode: t.destCode || (t.destination?.code),
        destName: t.destName || (t.destination?.name),
        departureTime: t.departureTime,
        arrivalTime: t.arrivalTime,
        runningDays: t.runningDays,
        travelTime: t.travelTime,
        totalDist: t.totalDist,
      },
      route: [],
    })).filter(Boolean) as TrainInfo[]
  }
  return []
}

export async function getStationBoardApi(stationCode: string): Promise<StationBoardEntry[]> {
  const data = await apiFetch(`/api/trains/station?station=${stationCode}`)
  if (data) return toStationBoard(stationCode, data)
  return []
}

export async function getPNRApi(pnr: string): Promise<any> {
  const data = await apiFetch(`/api/pnr/${pnr}`)
  return data ?? null
}

export async function getTrackTrainApi(trainNumber: string, fromStation?: string): Promise<any> {
  const query = fromStation ? `?from=${fromStation}` : ""
  const data = await apiFetch(`/api/track/${trainNumber}${query}`)
  return data ?? null
}

export async function getAvailabilityApi(
  trainNo: string,
  from: string,
  to: string,
  date: string,
  coach: string,
  quota?: string,
): Promise<any> {
  const query = `trainNo=${trainNo}&from=${from}&to=${to}&date=${date}&coach=${coach}${quota ? `&quota=${quota}` : ""}`
  const data = await apiFetch(`/api/availability?${query}`)
  return data ?? null
}
