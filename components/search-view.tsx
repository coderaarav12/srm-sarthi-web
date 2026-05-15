"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { TrainCard } from "./train-card"
import { CHENNAI_STATIONS, DEFAULT_FROM, DEFAULT_TO } from "@/lib/train-types"
import type { TrainInfo } from "@/lib/train-types"
import { getTrainsBetweenApi } from "@/lib/train-api"

interface SearchViewProps {
  onTrainClick?: (trainNumber: string) => void
}

export function SearchView({ onTrainClick }: SearchViewProps) {
  const [fromStation, setFromStation] = useState(DEFAULT_FROM)
  const [toStation, setToStation] = useState(DEFAULT_TO)
  const [isSearching, setIsSearching] = useState(false)

  const [apiTrains, setApiTrains] = useState<TrainInfo[] | null>(null)

  useEffect(() => {
    getTrainsBetweenApi(fromStation, toStation).then(setApiTrains)
  }, [fromStation, toStation])

  const filteredTrains = useMemo(() => {
    if (isSearching) return []
    return apiTrains ?? []
  }, [fromStation, toStation, isSearching, apiTrains])

  const handleFindTrains = () => {
    setIsSearching(true)
    setTimeout(() => setIsSearching(false), 100)
  }

  const handleTrainClick = (trainNumber: string) => {
    onTrainClick?.(trainNumber)
  }

  const handleAvailabilityCheck = (e: React.MouseEvent, trainNumber: string) => {
    e.stopPropagation()
    window.open(`/api/availability?trainNo=${trainNumber}&from=${fromStation}&to=${toStation}&date=${new Date().toLocaleDateString("en-IN")}&coach=2S`, "_blank")
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
            <span className="section-kicker">Route Planner</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight section-headline">
            Search Trains
          </h2>
          <p className="text-sm mt-1" style={{ color: "#64748b" }}>
            Find trains between any two Chennai Suburban stations
          </p>
        </div>

        {/* Route Planner */}
        <div className="soft-panel p-5">
          <h3 className="text-sm font-bold mb-4" style={{ color: "#cbd5e1" }}>
            Plan Your Route
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold mb-1.5 block" style={{ color: "#64748b" }}>
                From Station
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
                {CHENNAI_STATIONS.map((s) => (
                  <option key={s.code} value={s.code} style={{ background: "#0f172a" }}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold mb-1.5 block" style={{ color: "#64748b" }}>
                To Station
              </label>
              <select
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 text-sm font-semibold appearance-none cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "#e2e8f0",
                }}
              >
                {CHENNAI_STATIONS.filter(s => s.code !== fromStation).map((s) => (
                  <option key={s.code} value={s.code} style={{ background: "#0f172a" }}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleFindTrains}
            className="mt-4 w-full rounded-xl py-3 text-sm font-bold transition-all"
            style={{
              background: "linear-gradient(135deg, rgba(45,212,191,0.15), rgba(76,201,240,0.1))",
              border: "1px solid rgba(45,212,191,0.25)",
              color: "#2dd4bf",
            }}
          >
            Find Trains
          </button>
        </div>

        {/* Route Results */}
        {filteredTrains.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <p className="text-xs font-semibold" style={{ color: "#64748b" }}>
                {filteredTrains.length} trains found ({fromStation} → {toStation})
              </p>
              <p className="text-[10px]" style={{ color: "#475569" }}>
                Click a train to view full route
              </p>
            </div>
            {filteredTrains.map((train, i) => (
              <motion.div
                key={train.trainNumber}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="relative"
              >
                <TrainCard train={train} onClick={() => handleTrainClick(train.trainNumber)} />
                <button
                  onClick={(e) => handleAvailabilityCheck(e, train.trainNumber)}
                  className="absolute bottom-3 right-3 text-[9px] font-bold px-2 py-1 rounded-lg transition-all hover:scale-105"
                  style={{
                    background: "rgba(251,191,36,0.1)",
                    border: "1px solid rgba(251,191,36,0.2)",
                    color: "#fbbf24",
                  }}
                >
                  Check Seats
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
