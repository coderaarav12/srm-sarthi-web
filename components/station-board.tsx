"use client"

import { useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { StationBoardEntry } from "@/lib/train-types"
import { getStationBoardApi } from "@/lib/train-api"

interface StationBoardProps {
  stationCode: string
  onTrainClick: (trainNumber: string) => void
}

export function StationBoard({ stationCode, onTrainClick }: StationBoardProps) {
  const [filter, setFilter] = useState<"all" | "arrivals" | "departures">("all")
  const [refreshKey, setRefreshKey] = useState(0)
  const [apiEntries, setApiEntries] = useState<StationBoardEntry[] | null>(null)

  useEffect(() => {
    const interval = setInterval(() => setRefreshKey(k => k + 1), 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    getStationBoardApi(stationCode).then(setApiEntries)
  }, [stationCode, refreshKey])

  const entries = apiEntries ?? []
  const filtered = useMemo(() => {
    if (filter === "arrivals") return entries.filter(e => e.type === "arrival")
    if (filter === "departures") return entries.filter(e => e.type === "departure")
    return entries
  }, [entries, filter])

  const now = new Date()
  const currentMin = now.getHours() * 60 + now.getMinutes()
  const dayIdx = now.getDay() === 0 ? 6 : now.getDay() - 1

  return (
    <div className="soft-panel overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-black tracking-tight" style={{ color: "#f1f5f9" }}>
              Potheri Station Board
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
              Live departures & arrivals · Updates every 30s
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inset-0 rounded-full bg-teal-400 opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-teal-400" />
            </span>
            <span className="text-[10px] font-semibold" style={{ color: "#2dd4bf" }}>LIVE</span>
          </div>
        </div>
        <div className="flex gap-1.5">
          {(["all", "arrivals", "departures"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all"
              style={{
                background: filter === f ? "rgba(45,212,191,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${filter === f ? "rgba(45,212,191,0.25)" : "rgba(255,255,255,0.06)"}`,
                color: filter === f ? "#2dd4bf" : "#64748b",
              }}
            >
              {f === "all" ? "All" : f === "arrivals" ? "Arrivals" : "Departures"}
            </button>
          ))}
        </div>
      </div>

      {/* Board */}
      <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.03)" }}>
        {filtered.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm" style={{ color: "#475569" }}>No trains found for this filter.</p>
          </div>
        )}
        {filtered.map((entry, i) => {
          const timeStr = entry.arrivalTime || entry.departureTime
          const parts = timeStr?.split(":") || ["0", "0"]
          const entryMin = parseInt(parts[0]) * 60 + parseInt(parts[1])
          const isNext = i === 0 && entryMin >= currentMin
          const isNow = entryMin >= currentMin && entryMin < currentMin + 5

          return (
            <motion.button
              key={`${entry.trainNumber}-${entry.type}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => onTrainClick(entry.trainNumber)}
              className="w-full text-left px-5 py-3.5 transition-all hover:bg-white/[0.02] relative overflow-hidden"
              style={entry.runsOn && entry.runsOn[dayIdx] !== "1" ? { opacity: 0.45 } : undefined}
            >
              {/* Now indicator */}
              {isNow && (
                <motion.div
                  layoutId="now-indicator"
                  className="absolute left-0 top-0 bottom-0 w-0.5"
                  style={{ background: "#2dd4bf", boxShadow: "0 0 8px rgba(45,212,191,0.5)" }}
                />
              )}

              <div className="flex items-center gap-4">
                {/* Time */}
                <div className="w-16 flex-shrink-0 text-right">
                  <div
                    className="text-sm font-black tabular-nums"
                    style={{ color: isNow ? "#2dd4bf" : "#e2e8f0" }}
                  >
                    {entry.type === "arrival" ? entry.arrivalTime : entry.departureTime}
                  </div>
                  {entry.delay > 0 && (
                    <div className="text-[10px] font-semibold" style={{ color: "#f87171" }}>
                      +{entry.delay} min
                    </div>
                  )}
                </div>

                {/* Type indicator */}
                <div
                  className="w-1 h-8 rounded-full flex-shrink-0"
                  style={{
                    background: entry.type === "arrival" ? "#4cc9f0" : "#2dd4bf",
                    boxShadow: `0 0 6px ${entry.type === "arrival" ? "rgba(76,201,240,0.4)" : "rgba(45,212,191,0.4)"}`,
                  }}
                />

                {/* Train info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold" style={{ color: "#2dd4bf" }}>
                      {entry.trainNumber}
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{
                        background: entry.type === "arrival" ? "rgba(76,201,240,0.1)" : "rgba(45,212,191,0.1)",
                        color: entry.type === "arrival" ? "#4cc9f0" : "#2dd4bf",
                      }}
                    >
                      {entry.type === "arrival" ? "ARR" : "DEP"}
                    </span>
                  </div>
                  <div className="text-sm font-semibold truncate mt-0.5" style={{ color: "#f1f5f9" }}>
                    {entry.trainName}
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: "#64748b" }}>
                    {entry.source} → {entry.destination}
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-[10px] font-semibold uppercase" style={{ color: "#475569" }}>
                    Plat
                  </div>
                  <div className="text-lg font-black" style={{ color: "#a78bfa" }}>
                    {entry.platform || "-"}
                  </div>
                </div>

                {/* Not running today */}
                {entry.runsOn && entry.runsOn[dayIdx] !== "1" && (
                  <div
                    className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      color: "#ef4444",
                    }}
                  >
                    Not running today
                  </div>
                )}

                {/* Next badge */}
                {isNext && (
                  <div
                    className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
                    style={{
                      background: "rgba(45,212,191,0.15)",
                      border: "1px solid rgba(45,212,191,0.3)",
                      color: "#2dd4bf",
                    }}
                  >
                    Next
                  </div>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
