"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getTrackTrainApi } from "@/lib/train-api"
import type { TrackResult, TrackStop } from "@/lib/train-types"
import { CHENNAI_STATIONS } from "@/lib/train-types"

function TrackStopRow({ stop, index, total }: { stop: TrackStop; index: number; total: number }) {
  const isDelayed = stop.status && !["ontime", "on time", ""].includes(stop.status.toLowerCase())
  const isLast = index === total - 1

  return (
    <div className="relative flex gap-4 pb-4">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full border-2 z-10"
          style={{
            borderColor: isDelayed ? "#fb923c" : "#2dd4bf",
            background: isDelayed ? "rgba(251,191,36,0.2)" : "rgba(45,212,191,0.2)",
          }}
        />
        {!isLast && (
          <div className="w-px flex-1 mt-1" style={{ background: "rgba(255,255,255,0.08)" }} />
        )}
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold" style={{ color: "#e2e8f0" }}>
          {stop.name}
        </p>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-xs font-mono" style={{ color: isDelayed ? "#fb923c" : "#94a3b8" }}>
            {stop.arrival || "----"} / {stop.departure || "----"}
          </span>
          {stop.status && (
            <span
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
              style={{
                background: isDelayed ? "rgba(251,191,36,0.1)" : "rgba(45,212,191,0.1)",
                color: isDelayed ? "#fb923c" : "#2dd4bf",
              }}
            >
              {stop.status}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function TrackView() {
  const [trainNumber, setTrainNumber] = useState("")
  const [fromStation, setFromStation] = useState("")
  const [result, setResult] = useState<TrackResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trainNumber.trim() || !/^\d{4,5}$/.test(trainNumber.trim())) {
      setError("Enter a valid 4-5 digit train number")
      return
    }
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const data = await getTrackTrainApi(trainNumber.trim(), fromStation.trim() || undefined)
      if (data?.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch {
      setError("Failed to fetch train tracking data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="page-shell px-4 pt-6 pb-24"
    >
      <div className="page-cluster">
        <div className="soft-panel p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="section-kicker">Live Tracking</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight section-headline">
            Train Running Status
          </h2>
          <p className="text-sm mt-1" style={{ color: "#64748b" }}>
            Track train location, delays, and station-wise running status
          </p>
        </div>

        <form onSubmit={handleSubmit} className="soft-panel p-5">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <div className="sm:col-span-3">
              <label className="text-[11px] font-semibold mb-1.5 block" style={{ color: "#64748b" }}>
                Train Number
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                placeholder="e.g. 40601"
                value={trainNumber}
                onChange={(e) => { setTrainNumber(e.target.value.replace(/\D/g, "")); setError("") }}
                className="w-full rounded-xl border px-4 py-3 text-lg font-mono text-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: error ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)",
                  color: "#e2e8f0",
                }}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold mb-1.5 block" style={{ color: "#64748b" }}>
                From Station (optional)
              </label>
              <select
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 text-sm font-semibold appearance-none cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "#e2e8f0",
                }}
              >
                <option value="" style={{ background: "#0f172a" }}>Any station</option>
                {CHENNAI_STATIONS.map((s) => (
                  <option key={s.code} value={s.code} style={{ background: "#0f172a" }}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
          {error && (
            <p className="text-xs mt-2" style={{ color: "#ef4444" }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !trainNumber.trim()}
            className="mt-4 w-full rounded-xl py-3.5 text-sm font-bold transition-all disabled:opacity-40"
            style={{
              background: "linear-gradient(135deg, rgba(45,212,191,0.15), rgba(76,201,240,0.1))",
              border: "1px solid rgba(45,212,191,0.25)",
              color: "#2dd4bf",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-teal-400/30 border-t-teal-400 rounded-full animate-spin" />
                Tracking...
              </span>
            ) : (
              "Track Train"
            )}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {result && !result.error && (
            <motion.div
              key="track-result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="soft-panel p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold" style={{ color: "#f1f5f9" }}>
                    Train #{result.trainNumber}
                  </h3>
                  <p className="text-xs" style={{ color: "#64748b" }}>{result.date}</p>
                </div>
                <span className="text-xs font-semibold" style={{ color: "#64748b" }}>
                  {result.stations?.length || 0} stations
                </span>
              </div>
              <div className="mt-2">
                {result.stations?.map((stop, i) => (
                  <TrackStopRow key={i} stop={stop} index={i} total={result.stations.length} />
                ))}
              </div>
            </motion.div>
          )}
          {result?.error && (
            <motion.div
              key="track-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="soft-panel p-6 text-center"
            >
              <p className="text-sm" style={{ color: "#94a3b8" }}>{result.error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
