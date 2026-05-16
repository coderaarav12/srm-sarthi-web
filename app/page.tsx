"use client"

import { useState, useCallback, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { TrainPage } from "@/components/train-page"
import { BusSection } from "@/components/bus-section"
import { CampusMap } from "@/components/campus-map"
import { SplashScreen } from "@/components/splash-screen"
import { OnboardingModal } from "@/components/onboarding-modal"
import { ProfileModal } from "@/components/profile-modal"
import { loadProfile } from "@/lib/srm-data"
import type { TabType } from "@/lib/train-types"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("trains")
  const [splashDone, setSplashDone] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [profileKey, setProfileKey] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashDone(true)
      if (!loadProfile()) {
        setShowOnboarding(true)
      }
    }, 2200)
    return () => clearTimeout(timer)
  }, [])

  const handleNavigate = useCallback((tab: TabType) => {
    setActiveTab(tab)
  }, [])

  const handleProfileClick = useCallback(() => {
    setShowProfile(true)
  }, [])

  const handleOnboardingClose = useCallback(() => {
    setShowOnboarding(false)
    setProfileKey((k) => k + 1)
  }, [])

  const handleProfileClose = useCallback(() => {
    setShowProfile(false)
  }, [])

  const handleEditProfile = useCallback(() => {
    setShowProfile(false)
    setTimeout(() => setShowOnboarding(true), 200)
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
        <Navbar activeTab={activeTab} setActiveTab={handleNavigate} onProfileClick={handleProfileClick} />
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
      <OnboardingModal
        key={profileKey}
        open={showOnboarding}
        onClose={handleOnboardingClose}
        initialProfile={loadProfile()}
      />
      <ProfileModal
        key={`profile-${profileKey}`}
        open={showProfile}
        onClose={handleProfileClose}
        onEdit={handleEditProfile}
      />
    </div>
  )
}


