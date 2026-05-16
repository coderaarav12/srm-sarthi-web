"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { TabType } from "@/lib/train-types"
import { loadProfile } from "@/lib/srm-data"
import type { UserProfile } from "@/lib/srm-data"

interface NavbarProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
  onProfileClick: () => void
}

const tabs: { id: TabType; label: string; icon: string }[] = [
  { id: "trains", label: "Trains", icon: "🚄" },
  { id: "buses", label: "Buses", icon: "🚌" },
  { id: "third", label: "Explore", icon: "✨" },
]

export function Navbar({ activeTab, setActiveTab, onProfileClick }: NavbarProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    setProfile(loadProfile())
  }, [])

  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?"

  return (
    <>
      {/* Top branding bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "linear-gradient(180deg, rgba(7,10,18,0.98), rgba(10,14,22,0.92))",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="#2dd4bf" strokeWidth="6" fill="none" />
              <circle cx="50" cy="50" r="20" fill="#2dd4bf" opacity="0.3" />
              <circle cx="50" cy="50" r="8" fill="#2dd4bf" />
              <line x1="50" y1="5" x2="50" y2="22" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
              <line x1="50" y1="78" x2="50" y2="95" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
              <line x1="5" y1="50" x2="22" y2="50" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
              <line x1="78" y1="50" x2="95" y2="50" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="text-sm font-black tracking-tight sarthi-gradient">
              SRM Sarthi
            </span>
          </div>

          <button
            onClick={onProfileClick}
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
            style={{
              background: profile
                ? "linear-gradient(135deg, rgba(45,212,191,0.2), rgba(76,201,240,0.1))"
                : "rgba(255,255,255,0.06)",
              border: profile
                ? "1px solid rgba(45,212,191,0.25)"
                : "1px solid rgba(255,255,255,0.08)",
              color: profile ? "#2dd4bf" : "#64748b",
            }}
          >
            {initials}
          </button>
        </div>
      </div>

      {/* Bottom tab bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: "linear-gradient(0deg, rgba(7,10,18,0.98), rgba(10,14,22,0.92))",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
        }}
      >
        <div className="flex items-center justify-around px-2 py-1.5 max-w-lg mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all relative min-w-0"
              style={{
                background: activeTab === tab.id ? "rgba(45,212,191,0.1)" : "transparent",
              }}
            >
              {activeTab === tab.id && (
                <span
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                  style={{ background: "#2dd4bf" }}
                />
              )}
              <span className="text-lg leading-none">{tab.icon}</span>
              <span
                className="text-[10px] font-bold leading-none"
                style={{
                  color: activeTab === tab.id ? "#2dd4bf" : "#475569",
                }}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
