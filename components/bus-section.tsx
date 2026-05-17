"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Route {
  number: string
  name: string
}

const STUDENT_ROUTES: Route[] = [
  { number: "11", name: "Avadi" },
  { number: "11A", name: "Waves" },
  { number: "11B", name: "Ambattur" },
  { number: "11C", name: "Thirumullaivayol" },
  { number: "22", name: "Mylapore" },
  { number: "22A", name: "" },
  { number: "22B", name: "" },
  { number: "33", name: "Pallikaranai" },
  { number: "33A", name: "" },
  { number: "33B", name: "Porur Roundana" },
  { number: "33C", name: "Medavakkam" },
  { number: "44", name: "" },
  { number: "44A", name: "" },
  { number: "55", name: "" },
  { number: "55A", name: "Koyambedu" },
  { number: "55B", name: "Sirucheri" },
  { number: "55C", name: "Koyambedu" },
  { number: "55D", name: "Kaiveli" },
  { number: "55E", name: "Medavakkam" },
  { number: "55 ECR", name: "ECR" },
  { number: "66", name: "Vanagaram" },
  { number: "66A", name: "Thirumangalam" },
  { number: "66B", name: "Thoraipakkam" },
  { number: "77", name: "" },
  { number: "88", name: "Nesapakkam" },
  { number: "99", name: "" },
  { number: "122", name: "Manali" },
  { number: "122A", name: "Manali" },
  { number: "133", name: "Thiruvetriyur" },
  { number: "144", name: "Kelleys" },
  { number: "177", name: "Loyola College / Anna Nagar" },
  { number: "188", name: "Santhosapuram" },
  { number: "188A", name: "Velachery" },
]

const STAFF_ROUTES: Route[] = [
  { number: "S1", name: "Avadi" },
  { number: "S1A", name: "Padappai / Senthil Nagar / Chengalpattu" },
  { number: "S2", name: "Mount Subway" },
  { number: "S3", name: "Pallikaranai" },
  { number: "S4", name: "Koyambedu / Besant Nagar" },
  { number: "S5", name: "Nandambakkam" },
  { number: "S6", name: "Tiruvottiyur" },
  { number: "S7", name: "Velachery" },
  { number: "S7A", name: "Ayanavaram" },
  { number: "S8", name: "Chrompet" },
  { number: "S9", name: "" },
  { number: "S10", name: "" },
  { number: "S11", name: "Chrompet" },
  { number: "E4", name: "Light House" },
]

const ROUTE_STOPS: Record<string, string[]> = {
  "11": ["Avadi", "Thirumullaivayol", "Ambattur", "Mogappair", "Tambaram", "SRM Kattankulathur"],
  "11A": ["Waves", "Ambattur", "Mogappair", "Tambaram", "SRM Kattankulathur"],
  "11B": ["Ambattur", "Mogappair", "Tambaram", "SRM Kattankulathur"],
  "11C": ["Thirumullaivayol", "Ambattur", "Mogappair", "Tambaram", "SRM Kattankulathur"],
  "22": ["Mylapore", "Santhome", "Adyar", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "22A": ["Mylapore", "Teynampet", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "22B": ["Mylapore", "Nungambakkam", "Saidapet", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "33": ["Pallikaranai", "Medavakkam", "Tambaram", "SRM Kattankulathur"],
  "33A": ["Pallikaranai", "Perungudi", "Medavakkam", "Tambaram", "SRM Kattankulathur"],
  "33B": ["Porur", "Ramapuram", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "33C": ["Medavakkam", "Tambaram", "SRM Kattankulathur"],
  "44": ["Poonamallee", "Porur", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "44A": ["Poonamallee", "Mangadu", "Porur", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "55": ["Koyambedu", "Vadapalani", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "55A": ["Koyambedu", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "55B": ["Sirucheri", "Medavakkam", "Tambaram", "SRM Kattankulathur"],
  "55C": ["Koyambedu", "Vadapalani", "Ashok Nagar", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "55D": ["Kaiveli", "Medavakkam", "Tambaram", "SRM Kattankulathur"],
  "55E": ["Medavakkam", "Tambaram", "SRM Kattankulathur"],
  "55 ECR": ["ECR", "Thiruvanmiyur", "Adyar", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "66": ["Vanagaram", "Thirumangalam", "Ambattur", "Tambaram", "SRM Kattankulathur"],
  "66A": ["Thirumangalam", "Anna Nagar", "Koyambedu", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "66B": ["Thoraipakkam", "Perungudi", "Madipakkam", "Tambaram", "SRM Kattankulathur"],
  "77": ["Avadi", "Pattabiram", "Ambattur", "Tambaram", "SRM Kattankulathur"],
  "88": ["Nesapakkam", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "99": ["Porur", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "122": ["Manali", "Ennore", "Thiruvottiyur", "Parrys", "Saidapet", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "122A": ["Manali", "Ennore", "Tondiarpet", "Parrys", "Saidapet", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "133": ["Thiruvetriyur", "Pozhichalur", "Pallavaram", "Tambaram", "SRM Kattankulathur"],
  "144": ["Kelleys", "Mylapore", "Adyar", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "177": ["Anna Nagar", "Loyola College", "Nungambakkam", "Saidapet", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "188": ["Santhosapuram", "Velachery", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "188A": ["Velachery", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "S1": ["Avadi", "Thirumullaivayol", "Ambattur", "Mogappair", "Tambaram", "SRM Kattankulathur"],
  "S1A": ["Padappai", "Senthil Nagar", "Chengalpattu", "SRM Kattankulathur"],
  "S2": ["Mount Subway", "Parrys", "Chennai Central", "Saidapet", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "S3": ["Pallikaranai", "Medavakkam", "Tambaram", "SRM Kattankulathur"],
  "S4": ["Koyambedu", "Besant Nagar", "Adyar", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "S5": ["Nandambakkam", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "S6": ["Tiruvottiyur", "Tondiarpet", "Parrys", "Saidapet", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "S7": ["Velachery", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "S7A": ["Ayanavaram", "Chennai Central", "Egmore", "Saidapet", "Guindy", "Tambaram", "SRM Kattankulathur"],
  "S8": ["Chrompet", "Tambaram", "SRM Kattankulathur"],
  "S9": ["Pallavaram", "Chrompet", "Tambaram", "SRM Kattankulathur"],
  "S10": ["Tambaram", "SRM Kattankulathur"],
  "S11": ["Chrompet", "Pallavaram", "Tambaram", "SRM Kattankulathur"],
  "E4": ["Light House", "Marina Beach", "Parrys", "Saidapet", "Guindy", "Tambaram", "SRM Kattankulathur"],
}

type Tab = "student" | "staff"

function RouteDetailModal({ route, onClose }: { route: Route; onClose: () => void }) {
  const stops = ROUTE_STOPS[route.number] || [route.name, "Tambaram", "SRM Kattankulathur"].filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      style={{ background: "rgba(7,10,18,0.8)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0f172a 0%, #0a0e16 100%)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-2 sm:hidden">
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
        </div>

        <div className="px-5 pb-6 pt-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-black"
                style={{
                  background: "linear-gradient(135deg, rgba(45,212,191,0.15), rgba(76,201,240,0.08))",
                  border: "1px solid rgba(45,212,191,0.2)",
                  color: "#2dd4bf",
                }}
              >
                {route.number}
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: "#e2e8f0" }}>Route {route.number}</div>
                {route.name && <div className="text-xs" style={{ color: "#64748b" }}>{route.name}</div>}
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full hover:opacity-80" style={{ color: "#64748b" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" /><path d="M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Route stops */}
          <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: "#475569" }}>Route Stops</div>
            <div className="space-y-0">
              {stops.map((stop, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{
                        background: i === 0 ? "#2dd4bf" : i === stops.length - 1 ? "#f59e0b" : "rgba(255,255,255,0.15)",
                      }}
                    />
                    {i < stops.length - 1 && (
                      <div className="w-px h-6" style={{ background: "rgba(255,255,255,0.06)" }} />
                    )}
                  </div>
                  <div className="pb-4 -mt-0.5">
                    <div className="text-xs font-semibold" style={{ color: "#cbd5e1" }}>{stop}</div>
                    <div className="text-[10px]" style={{ color: "#475569" }}>
                      {i === 0 ? "Start" : i === stops.length - 1 ? "Destination (SRM)" : "Intermediate Stop"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timings */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl p-3" style={{ background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.1)" }}>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#475569" }}>Spell I</div>
              <div className="text-xs font-bold" style={{ color: "#e2e8f0" }}>7:40 AM Arrival</div>
              <div className="text-[10px]" style={{ color: "#64748b" }}>4:20 PM Departure</div>
            </div>
            <div className="rounded-xl p-3" style={{ background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.1)" }}>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#475569" }}>Spell II</div>
              <div className="text-xs font-bold" style={{ color: "#e2e8f0" }}>8:30 AM Arrival</div>
              <div className="text-[10px]" style={{ color: "#64748b" }}>5:15 PM Departure</div>
            </div>
          </div>

          {/* Contact */}
          <a
            href="tel:04427417315"
            className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
            style={{ background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.2)", color: "#2dd4bf" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Contact Transport Office
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

function RouteCard({ route, index, onViewRoute }: { route: Route; index: number; onViewRoute: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.025 }}
      className="soft-panel p-4 flex items-center justify-between gap-3"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(45,212,191,0.12), rgba(76,201,240,0.08))",
            border: "1px solid rgba(45,212,191,0.15)",
            color: "#2dd4bf",
          }}
        >
          {route.number}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold truncate" style={{ color: "#e2e8f0" }}>
            Route {route.number}
          </div>
          {route.name && (
            <div className="text-xs truncate mt-0.5" style={{ color: "#64748b" }}>
              {route.name}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={onViewRoute}
        className="text-xs font-bold px-3.5 py-2 rounded-xl flex-shrink-0 transition-all active:scale-95 hover:opacity-80"
        style={{
          background: "rgba(45,212,191,0.1)",
          border: "1px solid rgba(45,212,191,0.2)",
          color: "#2dd4bf",
        }}
      >
        View Route
      </button>
    </motion.div>
  )
}

export function BusSection() {
  const [activeTab, setActiveTab] = useState<Tab>("student")
  const [viewingRoute, setViewingRoute] = useState<Route | null>(null)

  const routes = activeTab === "student" ? STUDENT_ROUTES : STAFF_ROUTES

  return (
    <div className="page-shell px-4 pt-5 pb-8">
      <div className="page-cluster">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="soft-panel p-5"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="section-kicker">Campus Transport</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight section-headline">
            Bus Routes
          </h2>
          <p className="text-sm mt-1 leading-relaxed" style={{ color: "#64748b" }}>
            SRMIST Kattankulathur campus shuttle routes for students &amp; staff
          </p>
        </motion.div>

        {/* Timings & Fee info card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="soft-panel p-4 grid grid-cols-2 gap-3"
        >
          <div
            className="rounded-xl p-3"
            style={{
              background: "rgba(45,212,191,0.06)",
              border: "1px solid rgba(45,212,191,0.1)",
            }}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "#475569" }}>
              Spell I
            </div>
            <div className="text-sm font-bold" style={{ color: "#e2e8f0" }}>
              7:40 AM Arrival
            </div>
            <div className="text-xs" style={{ color: "#64748b" }}>
              4:20 PM Departure
            </div>
          </div>
          <div
            className="rounded-xl p-3"
            style={{
              background: "rgba(45,212,191,0.06)",
              border: "1px solid rgba(45,212,191,0.1)",
            }}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "#475569" }}>
              Spell II
            </div>
            <div className="text-sm font-bold" style={{ color: "#e2e8f0" }}>
              8:30 AM Arrival
            </div>
            <div className="text-xs" style={{ color: "#64748b" }}>
              5:15 PM Departure
            </div>
          </div>
          <div
            className="col-span-2 rounded-xl p-3 flex items-center justify-between"
            style={{
              background: "rgba(251,191,36,0.06)",
              border: "1px solid rgba(251,191,36,0.12)",
            }}
          >
            <div className="text-xs font-bold" style={{ color: "#fbbf24" }}>
              Annual Bus Fee (2025-26)
            </div>
            <div className="text-sm font-black" style={{ color: "#fbbf24" }}>
              ₹70,000
            </div>
          </div>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="soft-panel p-1 flex gap-1"
        >
          {[
            { key: "student" as Tab, label: "Student Routes" },
            { key: "staff" as Tab, label: "Staff Routes" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 text-xs font-bold py-2.5 rounded-xl transition-all"
              style={
                activeTab === tab.key
                  ? {
                      background: "rgba(45,212,191,0.12)",
                      border: "1px solid rgba(45,212,191,0.2)",
                      color: "#2dd4bf",
                    }
                  : {
                      background: "transparent",
                      color: "#475569",
                    }
              }
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Route count */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#475569" }}>
            {routes.length} {activeTab === "student" ? "Student" : "Staff"} Routes
          </span>
          <a
            href="tel:04427417315"
            className="text-xs font-semibold transition-colors"
            style={{ color: "#2dd4bf" }}
          >
            Contact Transport
          </a>
        </div>

        {/* Route List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="page-cluster"
          >
            {routes.map((route, i) => (
              <RouteCard key={`${activeTab}-${route.number}`} route={route} index={i} onViewRoute={() => setViewingRoute(route)} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Contact Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center pt-2 pb-4"
        >
          <p className="text-[10px] leading-relaxed" style={{ color: "#334155" }}>
            Transport Office &middot; SRMIST Kattankulathur<br />
            <span style={{ color: "#475569" }}>044-27417315 / 044-27417316</span>
          </p>
        </motion.div>
      </div>

      {/* Route Detail Modal */}
      <AnimatePresence>
        {viewingRoute && (
          <RouteDetailModal route={viewingRoute} onClose={() => setViewingRoute(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
