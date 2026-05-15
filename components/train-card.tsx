"use client"

import { motion } from "framer-motion"
import type { TrainInfo } from "@/lib/train-types"
import { formatTime } from "@/lib/utils"

interface TrainCardProps {
  train: TrainInfo
  onClick: (trainNumber: string) => void
}

export function TrainCard({ train, onClick }: TrainCardProps) {
  return (
    <motion.button
      onClick={() => onClick(train.trainNumber)}
      className="w-full text-left soft-panel p-4 transition-all hover:scale-[1.01] active:scale-[0.99] relative overflow-hidden"
      whileHover={{ borderColor: "rgba(45,212,191,0.2)" }}
    >
      {/* Glow effect */}
      <div
        className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(45,212,191,0.15), transparent 70%)",
        }}
      />

      <div className="flex items-center gap-4 relative z-10">
        {/* Train icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(45,212,191,0.12), rgba(76,201,240,0.08))",
            border: "1px solid rgba(45,212,191,0.15)",
          }}
        >
          🚄
        </div>

        {/* Train info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold" style={{ color: "#2dd4bf" }}>
              {train.trainNumber}
            </span>
            <span className="text-xs font-bold" style={{ color: "#cbd5e1" }}>
              {train.trainName}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold" style={{ color: "#94a3b8" }}>
                {train.source.code}
              </span>
              <span className="text-xs font-bold tabular-nums" style={{ color: "#2dd4bf" }}>
                {formatTime(train.source.departureTime)}
              </span>
            </div>
            <div className="flex-1 max-w-[60px] h-px relative" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, rgba(45,212,191,0.4), rgba(76,201,240,0.4))",
                }}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold" style={{ color: "#94a3b8" }}>
                {train.destination.code}
              </span>
              <span className="text-xs font-bold tabular-nums" style={{ color: "#4cc9f0" }}>
                {formatTime(train.destination.arrivalTime)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px]" style={{ color: "#475569" }}>
              Duration: {train.duration}
            </span>
            <span className="text-[10px]" style={{ color: "#475569" }}>
              Distance: {train.distance} km
            </span>
            <span className="text-[10px]" style={{ color: "#475569" }}>
              {train.classes.join(", ")}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0" style={{ color: "#475569" }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </motion.button>
  )
}
