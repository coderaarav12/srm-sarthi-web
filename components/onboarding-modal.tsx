"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ACADEMIC_YEARS, SRM_BRANCHES, saveProfile, loadProfile } from "@/lib/srm-data"
import type { UserProfile } from "@/lib/srm-data"

interface OnboardingModalProps {
  open: boolean
  onClose: () => void
  initialProfile?: UserProfile | null
}

export function OnboardingModal({ open, onClose, initialProfile }: OnboardingModalProps) {
  const [name, setName] = useState(initialProfile?.name ?? "")
  const [year, setYear] = useState(initialProfile?.year ?? "")
  const [branch, setBranch] = useState(initialProfile?.branch ?? "")
  const [branchSearch, setBranchSearch] = useState("")
  const [showBranchDropdown, setShowBranchDropdown] = useState(false)
  const [showYearDropdown, setShowYearDropdown] = useState(false)
  const [step, setStep] = useState(0)
  const branchRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const filteredBranches = SRM_BRANCHES.filter((b) =>
    b.toLowerCase().includes(branchSearch.toLowerCase())
  )

  useEffect(() => {
    if (open && nameInputRef.current) {
      setTimeout(() => nameInputRef.current?.focus(), 600)
    }
  }, [open])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (branchRef.current && !branchRef.current.contains(e.target as Node)) {
        setShowBranchDropdown(false)
      }
      if (yearRef.current && !yearRef.current.contains(e.target as Node)) {
        setShowYearDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSave = () => {
    if (!name.trim()) return
    saveProfile({ name: name.trim(), year, branch })
    onClose()
  }

  const handleSkip = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{
            background: "radial-gradient(ellipse at center, oklch(0.18 0.04 245 / 0.95), oklch(0.08 0.03 248 / 0.98))",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-full max-w-md relative"
          >
            <div
              className="relative overflow-hidden rounded-3xl border"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                background: "linear-gradient(180deg, rgba(15,23,42,0.95), rgba(7,11,20,0.98))",
                boxShadow: "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(45,212,191,0.06), transparent 35%, rgba(167,139,250,0.04) 70%, transparent 100%)",
                }}
              />

              <div className="relative p-6 pt-10 pb-8">
                <div className="flex flex-col items-center text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: "linear-gradient(135deg, rgba(45,212,191,0.15), rgba(76,201,240,0.08))",
                      border: "1px solid rgba(45,212,191,0.2)",
                    }}
                  >
                    <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="45" stroke="#2dd4bf" strokeWidth="6" fill="none" />
                      <circle cx="50" cy="50" r="20" fill="#2dd4bf" opacity="0.3" />
                      <circle cx="50" cy="50" r="8" fill="#2dd4bf" />
                      <line x1="50" y1="5" x2="50" y2="22" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
                      <line x1="50" y1="78" x2="50" y2="95" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
                      <line x1="5" y1="50" x2="22" y2="50" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
                      <line x1="78" y1="50" x2="95" y2="50" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-black tracking-tight mb-1"
                    style={{
                      background: "linear-gradient(135deg, #00f5d4 0%, #4cc9f0 50%, #a78bfa 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Welcome to SRM Sarthi
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 }}
                    className="text-sm"
                    style={{ color: "#64748b" }}
                  >
                    Set up your profile to personalise your experience
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#64748b" }}>
                      Your Name
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: name.trim()
                          ? "1px solid rgba(45,212,191,0.3)"
                          : "1px solid rgba(255,255,255,0.06)",
                        color: "#f1f5f9",
                      }}
                    />
                  </div>

                  <div ref={yearRef} className="relative">
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#64748b" }}>
                      College Year
                    </label>
                    <button
                      onClick={() => { setShowYearDropdown(!showYearDropdown); setShowBranchDropdown(false) }}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium text-left flex items-center justify-between transition-all"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: year ? "1px solid rgba(45,212,191,0.3)" : "1px solid rgba(255,255,255,0.06)",
                        color: year ? "#f1f5f9" : "#64748b",
                      }}
                    >
                      <span>{year || "Select your year"}</span>
                      <motion.svg
                        animate={{ rotate: showYearDropdown ? 180 : 0 }}
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                      >
                        <path d="M4 6L8 10L12 6" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {showYearDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-10 w-full mt-1 rounded-xl overflow-hidden border"
                          style={{
                            background: "rgba(15,23,42,0.98)",
                            borderColor: "rgba(255,255,255,0.08)",
                            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                          }}
                        >
                          {ACADEMIC_YEARS.map((y) => (
                            <button
                              key={y}
                              onClick={() => { setYear(y); setShowYearDropdown(false) }}
                              className="w-full px-4 py-2.5 text-sm font-medium text-left transition-all hover:bg-white/5"
                              style={{
                                color: year === y ? "#2dd4bf" : "#cbd5e1",
                                background: year === y ? "rgba(45,212,191,0.08)" : "transparent",
                              }}
                            >
                              {y}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div ref={branchRef} className="relative">
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#64748b" }}>
                      Branch
                    </label>
                    <button
                      onClick={() => { setShowBranchDropdown(!showBranchDropdown); setShowYearDropdown(false) }}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium text-left flex items-center justify-between transition-all"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: branch ? "1px solid rgba(45,212,191,0.3)" : "1px solid rgba(255,255,255,0.06)",
                        color: branch ? "#f1f5f9" : "#64748b",
                      }}
                    >
                      <span className="truncate">{branch || "Select your branch"}</span>
                      <motion.svg
                        animate={{ rotate: showBranchDropdown ? 180 : 0 }}
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                      >
                        <path d="M4 6L8 10L12 6" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {showBranchDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-10 w-full mt-1 rounded-xl overflow-hidden border"
                          style={{
                            background: "rgba(15,23,42,0.98)",
                            borderColor: "rgba(255,255,255,0.08)",
                            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                            maxHeight: "220px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div className="p-2 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                            <input
                              type="text"
                              value={branchSearch}
                              onChange={(e) => setBranchSearch(e.target.value)}
                              placeholder="Search branches..."
                              className="w-full px-3 py-2 rounded-lg text-xs font-medium outline-none"
                              style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                color: "#f1f5f9",
                              }}
                            />
                          </div>
                          <div className="overflow-y-auto" style={{ maxHeight: "160px" }}>
                            {filteredBranches.length === 0 ? (
                              <div className="p-4 text-center text-xs" style={{ color: "#64748b" }}>
                                No branches found
                              </div>
                            ) : (
                              filteredBranches.map((b) => (
                                <button
                                  key={b}
                                  onClick={() => { setBranch(b); setBranchSearch(""); setShowBranchDropdown(false) }}
                                  className="w-full px-4 py-2.5 text-sm font-medium text-left transition-all hover:bg-white/5"
                                  style={{
                                    color: branch === b ? "#2dd4bf" : "#cbd5e1",
                                    background: branch === b ? "rgba(45,212,191,0.08)" : "transparent",
                                  }}
                                >
                                  {b}
                                </button>
                              ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 space-y-2.5"
                >
                  <button
                    onClick={handleSave}
                    disabled={!name.trim()}
                    className="w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all disabled:opacity-40"
                    style={{
                      background: !name.trim()
                        ? "rgba(255,255,255,0.05)"
                        : "linear-gradient(135deg, #2dd4bf, #4cc9f0)",
                      color: !name.trim() ? "#64748b" : "#0a0f1a",
                      boxShadow: name.trim() ? "0 4px 24px rgba(45,212,191,0.25)" : "none",
                    }}
                  >
                    {initialProfile ? "Save Changes" : "Get Started"}
                  </button>
                  <button
                    onClick={handleSkip}
                    className="w-full py-2.5 rounded-xl text-xs font-bold transition-all"
                    style={{
                      color: "#64748b",
                    }}
                  >
                    Skip for now
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
