import { readFileSync } from "fs"
import { join } from "path"
import type { TrainInfo, TrainStop, StationBoardEntry } from "./train-types"

let cachedTrains: TrainInfo[] | null = null

function loadTrains(): TrainInfo[] {
  if (cachedTrains) return cachedTrains
  try {
    const filePath = join(process.cwd(), "lib", "chennai-schedules.json")
    const raw = JSON.parse(readFileSync(filePath, "utf-8")) as any[]
    cachedTrains = raw.map((t: any) => ({
      trainNumber: t.trainNumber,
      trainName: t.trainName,
      source: { code: t.source?.code || "", name: t.source?.name || "", departureTime: t.source?.departureTime || "" },
      destination: { code: t.destination?.code || "", name: t.destination?.name || "", arrivalTime: t.destination?.arrivalTime || "" },
      runsOn: t.runsOn || "1111111",
      duration: t.duration || "",
      distance: t.distance || 0,
      classes: t.classes || [],
      route: (t.route || []).map((s: any) => ({
        stationCode: s.stationCode,
        stationName: s.stationName,
        arrivalTime: s.arrivalTime || "",
        departureTime: s.departureTime || "",
        haltTime: s.haltTime || "",
        dayCount: s.dayCount || 0,
        distance: s.distance || 0,
        platform: s.platform || "",
      })),
    }))
    return cachedTrains
  } catch {
    return []
  }
}

export function getAllTrains(): TrainInfo[] {
  return loadTrains()
}

export function getTrainByNumber(num: string): TrainInfo | undefined {
  return loadTrains().find((t) => t.trainNumber === num)
}

export function getTrainsBetween(fromCode: string, toCode: string): TrainInfo[] {
  return loadTrains().filter((t) => {
    const fromIdx = t.route.findIndex((s) => s.stationCode === fromCode)
    const toIdx = t.route.findIndex((s) => s.stationCode === toCode)
    return fromIdx !== -1 && toIdx !== -1 && fromIdx < toIdx
  })
}

export function getTrainsByStation(stationCode: string): TrainInfo[] {
  return loadTrains().filter((t) =>
    t.route.some((s) => s.stationCode === stationCode),
  )
}

export function getTrainsByStationBoard(stationCode: string): StationBoardEntry[] {
  const trains = getTrainsByStation(stationCode)
  const now = new Date()
  const currentMin = now.getHours() * 60 + now.getMinutes()

  return trains.flatMap((t) => {
    const stop = t.route.find((s) => s.stationCode === stationCode)
    if (!stop) return []

    const depMin = minutesFromMidnight(stop.departureTime)
    if (depMin < currentMin - 30) return []

    const type = stop.arrivalTime ? "arrival" : "departure"

    return [{
      trainNumber: t.trainNumber,
      trainName: t.trainName,
      source: t.source.name,
      destination: t.destination.name,
      arrivalTime: stop.arrivalTime,
      departureTime: stop.departureTime,
      platform: stop.platform || "",
      delay: 0,
      type: type as "arrival" | "departure",
      distance: stop.distance,
      runsOn: t.runsOn,
    }]
  })
    .sort((a, b) => minutesFromMidnight(a.departureTime) - minutesFromMidnight(b.departureTime))
    .slice(0, 20)
}

function minutesFromMidnight(time: string) {
  if (!time) return 0
  const [h, m] = time.split(":").map(Number)
  return h * 60 + (m || 0)
}

export function getPlatformForTrainAtStation(trainNumber: string, stationCode: string): string {
  const train = getTrainByNumber(trainNumber)
  if (!train) return ""
  const stop = train.route.find((s) => s.stationCode === stationCode)
  return stop?.platform || ""
}

export function getRunsOnForTrain(trainNumber: string): string {
  const train = getTrainByNumber(trainNumber)
  return train?.runsOn || ""
}
