"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function SplashScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            background: "radial-gradient(ellipse at center, oklch(0.18 0.04 245), oklch(0.08 0.03 248))",
          }}
        >
          {/* Animated rings */}
          <div className="relative flex items-center justify-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute w-24 h-24 rounded-full"
              style={{
                border: "2px solid rgba(45,212,191,0.15)",
                animation: "ping 1.5s ease-out infinite",
              }}
            />
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="absolute w-16 h-16 rounded-full"
              style={{
                border: "2px solid rgba(45,212,191,0.25)",
                animation: "ping 1.5s ease-out infinite 0.3s",
              }}
            />
            {/* Center logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(45,212,191,0.15), rgba(76,201,240,0.08))",
                border: "1px solid rgba(45,212,191,0.2)",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="#2dd4bf" strokeWidth="6" fill="none" />
                <circle cx="50" cy="50" r="20" fill="#2dd4bf" opacity="0.3" />
                <circle cx="50" cy="50" r="8" fill="#2dd4bf" />
                <line x1="50" y1="5" x2="50" y2="22" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
                <line x1="50" y1="78" x2="50" y2="95" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
                <line x1="5" y1="50" x2="22" y2="50" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
                <line x1="78" y1="50" x2="95" y2="50" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <h1 className="text-3xl font-black tracking-tight sarthi-gradient">
              SRM Sarthi
            </h1>
            <p className="text-sm mt-1.5 font-medium tracking-wider" style={{ color: "#475569" }}>
              Commute Companion
            </p>
          </motion.div>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-1.5 mt-8"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#2dd4bf" }}
              />
            ))}
          </motion.div>

          <style>{`
            @keyframes ping {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.3); opacity: 0.3; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
