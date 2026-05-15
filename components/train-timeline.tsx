"use client"

import { motion } from "framer-motion"
import type { TrainInfo } from "@/lib/train-types"
import { formatTime, getMinutesFromMidnight, isRunningNow } from "@/lib/utils"

interface TrainTimelineProps {
  train: TrainInfo
}

export function TrainTimeline({ train }: TrainTimelineProps) {
  const totalDuration = getMinutesFromMidnight(train.destination.arrivalTime) -
    getMinutesFromMidnight(train.source.departureTime)

  return (
    <div className="soft-panel p-5">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(45,212,191,0.12), rgba(76,201,240,0.08))",
            border: "1px solid rgba(45,212,191,0.15)",
          }}
        >
          🚄
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono font-bold" style={{ color: "#2dd4bf" }}>
              {train.trainNumber}
            </span>
            <span className="text-base font-bold" style={{ color: "#f1f5f9" }}>
              {train.trainName}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs" style={{ color: "#64748b" }}>
              {train.source.name} ({train.source.code}) → {train.destination.name} ({train.destination.code})
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{
              background: "rgba(45,212,191,0.1)",
              color: "#2dd4bf",
              border: "1px solid rgba(45,212,191,0.2)",
            }}>
              {train.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {train.route.map((stop, i) => {
          const isFirst = i === 0
          const isLast = i === train.route.length - 1
          const isCurrent = isRunningNow(stop.arrivalTime, stop.departureTime)
          const isPOTI = stop.stationCode === "POTI"

          // Position as percentage of total journey
          const stopMin = getMinutesFromMidnight(stop.arrivalTime)
          const startMin = getMinutesFromMidnight(train.source.departureTime)
          const position = ((stopMin - startMin) / totalDuration) * 100

          return (
            <motion.div
              key={stop.stationCode}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative flex items-start gap-4 pb-5"
            >
              {/* Timeline line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-3.5 h-3.5 rounded-full border-2 z-10 transition-all ${
                    isCurrent ? "animate-pulse" : ""
                  }`}
                  style={{
                    background: isCurrent
                      ? "#2dd4bf"
                      : isPOTI
                      ? "rgba(45,212,191,0.3)"
                      : "rgba(255,255,255,0.08)",
                    borderColor: isCurrent
                      ? "#2dd4bf"
                      : isPOTI
                      ? "rgba(45,212,191,0.5)"
                      : "rgba(255,255,255,0.15)",
                    boxShadow: isCurrent ? "0 0 12px rgba(45,212,191,0.5)" : "none",
                  }}
                />
                {!isLast && (
                  <div
                    className="w-0.5 flex-1 mt-1"
                    style={{
                      background: isCurrent
                        ? "linear-gradient(180deg, #2dd4bf, rgba(255,255,255,0.08))"
                        : "rgba(255,255,255,0.08)",
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div
                className={`flex-1 rounded-2xl border p-3.5 transition-all ${
                  isCurrent ? "border-teal-500/30" : isPOTI ? "border-teal-400/15" : "border-transparent"
                }`}
                style={{
                  background: isCurrent
                    ? "rgba(45,212,191,0.06)"
                    : isPOTI
                    ? "rgba(45,212,191,0.03)"
                    : "rgba(255,255,255,0.02)",
                  marginTop: -2,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-bold"
                        style={{ color: isCurrent ? "#2dd4bf" : isPOTI ? "#f1f5f9" : "#cbd5e1" }}
                      >
                        {stop.stationName}
                      </span>
                      <span className="text-[10px] font-mono font-semibold" style={{ color: "#475569" }}>
                        {stop.stationCode}
                      </span>
                      {isPOTI && (
                        <span
                          className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                          style={{
                            background: "rgba(45,212,191,0.12)",
                            color: "#2dd4bf",
                            border: "1px solid rgba(45,212,191,0.2)",
                          }}
                        >
                          Your stop
                        </span>
                      )}
                      {isCurrent && (
                        <span
                          className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded animate-pulse"
                          style={{
                            background: "rgba(45,212,191,0.15)",
                            color: "#2dd4bf",
                          }}
                        >
                          NOW
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-semibold tabular-nums" style={{ color: "#94a3b8" }}>
                        Arr: {formatTime(stop.arrivalTime)}
                      </span>
                      <span className="text-xs font-semibold tabular-nums" style={{ color: "#94a3b8" }}>
                        Dep: {formatTime(stop.departureTime)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] font-semibold uppercase" style={{ color: "#475569" }}>
                      Plat
                    </div>
                    <div className="text-xl font-black" style={{ color: "#a78bfa" }}>
                      {stop.platform}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-[10px]" style={{ color: "#475569" }}>
                    Halt: {stop.haltTime}
                  </span>
                  <span className="text-[10px]" style={{ color: "#475569" }}>
                    Distance: {stop.distance} km
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
