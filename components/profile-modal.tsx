"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { loadProfile, saveProfile } from "@/lib/srm-data"
import type { UserProfile } from "@/lib/srm-data"

interface ProfileModalProps {
  open: boolean
  onClose: () => void
  onEdit: () => void
}

export function ProfileModal({ open, onClose, onEdit }: ProfileModalProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (open) setProfile(loadProfile())
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm relative"
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

              <div className="relative p-6 pt-8 pb-6">
                {profile ? (
                  <>
                    <div className="flex flex-col items-center mb-6">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-black mb-3"
                        style={{
                          background: "linear-gradient(135deg, rgba(45,212,191,0.2), rgba(76,201,240,0.1))",
                          border: "2px solid rgba(45,212,191,0.25)",
                          color: "#2dd4bf",
                        }}
                      >
                        {profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                      </div>
                      <h2
                        className="text-xl font-black tracking-tight"
                        style={{
                          background: "linear-gradient(135deg, #00f5d4 0%, #4cc9f0 50%, #a78bfa 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {profile.name}
                      </h2>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div
                        className="flex items-center justify-between px-4 py-3 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748b" }}>
                          Year
                        </span>
                        <span className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
                          {profile.year}
                        </span>
                      </div>
                      <div
                        className="flex items-center justify-between px-4 py-3 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748b" }}>
                          Branch
                        </span>
                        <span className="text-sm font-semibold text-right max-w-[60%]" style={{ color: "#f1f5f9" }}>
                          {profile.branch}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={onEdit}
                      className="w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all"
                      style={{
                        background: "linear-gradient(135deg, #2dd4bf, #4cc9f0)",
                        color: "#0a0f1a",
                        boxShadow: "0 4px 24px rgba(45,212,191,0.25)",
                      }}
                    >
                      Edit Profile
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center py-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-black mb-3"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#64748b",
                      }}
                    >
                      ?
                    </div>
                    <h2 className="text-lg font-black tracking-tight mb-1" style={{ color: "#f1f5f9" }}>
                      No Profile Yet
                    </h2>
                    <p className="text-xs mb-6" style={{ color: "#64748b" }}>
                      Set up your profile to get started
                    </p>
                    <button
                      onClick={onEdit}
                      className="w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all"
                      style={{
                        background: "linear-gradient(135deg, #2dd4bf, #4cc9f0)",
                        color: "#0a0f1a",
                        boxShadow: "0 4px 24px rgba(45,212,191,0.25)",
                      }}
                    >
                      Set Up Profile
                    </button>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="w-full py-2 mt-2 rounded-xl text-xs font-bold transition-all"
                  style={{ color: "#64748b" }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
