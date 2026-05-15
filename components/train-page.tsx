"use client"

import { useState, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { StationBoard } from "./station-board"
import { SearchView } from "./search-view"
import { TrackView } from "./track-view"
import { TrainTimeline } from "./train-timeline"
import { getTrainByNumberApi } from "@/lib/train-api"
import type { TrainInfo, TrainSubTab } from "@/lib/train-types"

const subTabs: { id: TrainSubTab; label: string; icon: string }[] = [
  { id: "station", label: "Station", icon: "🚉" },
  { id: "search", label: "Search", icon: "🔍" },
  { id: "track", label: "Track", icon: "📍" },
]

export function TrainPage() {
  const [subTab, setSubTab] = useState<TrainSubTab>("station")
  const [selectedTrain, setSelectedTrain] = useState<TrainInfo | null>(null)
  const [loadingTrain, setLoadingTrain] = useState(false)
  const [trainError, setTrainError] = useState("")

  const handleTrainSelect = useCallback(async (trainNumber: string) => {
    setLoadingTrain(true)
    setTrainError("")
    try {
      const train = await getTrainByNumberApi(trainNumber)
      if (train) {
        setSelectedTrain(train)
      } else {
        setTrainError("Train not found")
      }
    } catch {
      setTrainError("Failed to load train details")
    } finally {
      setLoadingTrain(false)
    }
  }, [])

  const handleCloseTimeline = useCallback(() => {
    setSelectedTrain(null)
    setTrainError("")
  }, [])

  const renderSubView = () => {
    switch (subTab) {
      case "station":
        return <StationBoard stationCode="POTI" onTrainClick={handleTrainSelect} />
      case "search":
        return <SearchView onTrainClick={handleTrainSelect} />
      case "track":
        return <TrackView />
    }
  }

  return (
    <div className="min-h-0 flex-1 flex flex-col">
      {/* Sub-navigation */}
      <div className="px-4 pt-4 pb-2">
        <div className="soft-panel p-1 flex" style={{ display: "inline-flex", borderRadius: "14px", padding: "3px" }}>
          {subTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setSubTab(t.id); setSelectedTrain(null); setTrainError("") }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={{
                background: subTab === t.id ? "rgba(45,212,191,0.12)" : "transparent",
                color: subTab === t.id ? "#2dd4bf" : "#64748b",
                border: subTab === t.id ? "1px solid rgba(45,212,191,0.2)" : "1px solid transparent",
              }}
            >
              <span className="text-sm">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-view content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={subTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            {renderSubView()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Train Timeline Overlay */}
      <AnimatePresence>
        {selectedTrain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 overflow-y-auto"
            style={{ background: "rgba(7,10,18,0.92)", backdropFilter: "blur(8px)" }}
          >
            <div className="min-h-full py-4 px-4 pt-16 pb-24">
              <div className="max-w-2xl mx-auto">
                <button
                  onClick={handleCloseTimeline}
                  className="mb-3 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#94a3b8",
                  }}
                >
                  ← Back
                </button>
                <TrainTimeline train={selectedTrain} />
              </div>
            </div>
          </motion.div>
        )}
        {loadingTrain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ background: "rgba(7,10,18,0.8)" }}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="inline-block w-8 h-8 border-2 border-teal-400/30 border-t-teal-400 rounded-full animate-spin" />
              <span className="text-sm font-semibold" style={{ color: "#94a3b8" }}>
                Loading train details...
              </span>
            </div>
          </motion.div>
        )}
        {trainError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ background: "rgba(7,10,18,0.8)" }}
          >
            <div className="soft-panel p-6 max-w-sm mx-4 text-center">
              <p className="text-sm mb-4" style={{ color: "#ef4444" }}>{trainError}</p>
              <button
                onClick={handleCloseTimeline}
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#94a3b8",
                }}
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
