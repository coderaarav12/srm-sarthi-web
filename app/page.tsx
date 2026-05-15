"use client"

import { useState, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { TrainPage } from "@/components/train-page"
import { BusSection } from "@/components/bus-section"
import { CampusMap } from "@/components/campus-map"
import { SplashScreen } from "@/components/splash-screen"
import type { TabType } from "@/lib/train-types"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("trains")

  const handleNavigate = useCallback((tab: TabType) => {
    setActiveTab(tab)
  }, [])

  const renderTab = () => {
    switch (activeTab) {
      case "trains":
        return <TrainPage />
      case "buses":
        return <BusSection />
      case "third":
        return <CampusMap />
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <SplashScreen />
      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar activeTab={activeTab} setActiveTab={handleNavigate} />
        <main className="w-full pt-12 flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex-1 flex flex-col"
            >
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}


