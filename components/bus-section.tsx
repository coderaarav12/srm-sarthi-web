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

type Tab = "student" | "staff"

function RouteCard({ route, index }: { route: Route; index: number }) {
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
        className="text-xs font-bold px-3.5 py-2 rounded-xl flex-shrink-0 transition-all active:scale-95"
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
              <RouteCard key={`${activeTab}-${route.number}`} route={route} index={i} />
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
    </div>
  )
}
