"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"

const MapView = dynamic(() => import("./map-view"), { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(15,23,42,0.5)" }}><span className="text-xs" style={{ color: "#64748b" }}>Loading map...</span></div> })

interface Building {
  id: number
  icon: string
  name: string
  shortDesc: string
  longDesc: string
  category: "academic" | "facilities" | "accommodation" | "transport"
  lat: number
  lng: number
}

// Verified coordinates from OpenStreetMap (2025) — comprehensive campus mapping
// Campus center: 12.8240, 80.0444 (computed from OSM data)
// Potheri Railway Station (POTI): 12.8220, 80.0385
// OSM campus boundary: 12.8190–12.8285 lat, 80.0380–80.0515 lng
const buildings: Building[] = [
  // Academic Blocks
  { id: 1, icon: "🏛️", name: "University Building (UB Block)", shortDesc: "15-storey central tower", longDesc: "The tallest building on campus at 15 storeys. Houses the Central Library (1.5L sq ft), administrative offices, university management, examination wing, and multiple lecture halls across its floors.", category: "academic", lat: 12.8233083, lng: 80.0424496 },
  { id: 2, icon: "💻", name: "Tech Park (TP1)", shortDesc: "15-storey twin tower", longDesc: "First of the Tech Park Twin Towers — a 15-storey technology hub with state-of-the-art computer labs, AI & ML research labs, incubation centre for startups, and dedicated IT-enabled learning floors.", category: "academic", lat: 12.82464806, lng: 80.045329973 },
  { id: 3, icon: "💻", name: "Tech Park (TP2)", shortDesc: "15-storey twin tower", longDesc: "Second of the Tech Park Twin Towers adjoining TP1. Houses additional research labs, clean rooms, smart classrooms, and collaborative innovation spaces for industry partnerships.", category: "academic", lat: 12.82474118, lng: 80.04584598 },
  { id: 4, icon: "🔬", name: "High Tech Block", shortDesc: "Engineering labs & research", longDesc: "Houses sophisticated engineering laboratories, nanotechnology research center, advanced materials science labs, and collaborative research spaces for postgraduate scholars.", category: "academic", lat: 12.821037078, lng: 80.038873433 },
  { id: 5, icon: "🖥️", name: "Main Block", shortDesc: "Central admin & lecture halls", longDesc: "Central administrative and academic building housing registrar, examination wing, and large-capacity lecture halls for common courses and major lectures.", category: "academic", lat: 12.820300614, lng: 80.038988014 },
  { id: 6, icon: "⚡", name: "Electrical Sciences Block", shortDesc: "EEE/ECE departments", longDesc: "Home to the Electrical & Electronics Engineering (EEE) and Electronics & Communication Engineering (ECE) departments. Features electronics labs, circuit design studios, and VLSI design centers.", category: "academic", lat: 12.819943733, lng: 80.03908885 },
  { id: 7, icon: "🔧", name: "Mechanical Block", shortDesc: "Workshops & labs", longDesc: "Houses mechanical engineering workshops, CAD/CAM labs, thermodynamics labs, fluid mechanics labs, and a full-fledged production shop floor.", category: "academic", lat: 12.820863560, lng: 80.039716700 },
  { id: 8, icon: "🏗️", name: "Aerospace Block", shortDesc: "Aerospace engineering", longDesc: "Houses the Aerospace Engineering department with wind tunnel facilities, propulsion labs, aircraft structural testing rigs, and simulator rooms for aeronautical studies.", category: "academic", lat: 12.820224, lng: 80.04012412 },
  { id: 9, icon: "🧬", name: "Bio-Tech Block", shortDesc: "Biotechnology & genetic eng.", longDesc: "State-of-the-art biotechnology labs, genetic engineering research facilities, bioinformatics center, tissue culture rooms, and advanced molecular biology instrumentation.", category: "academic", lat: 12.824926156, lng: 80.043958678 },
  { id: 10, icon: "📊", name: "MBA Block", shortDesc: "School of Management", longDesc: "The SRM School of Management building featuring case-study classrooms, a business library, computer lab with financial software, seminar halls, and placement cell.", category: "academic", lat: 12.823636383, lng: 80.04406165 },
  { id: 11, icon: "🏗️", name: "Architecture Block", shortDesc: "Architecture & design labs", longDesc: "Dedicated block for the Department of Architecture with design studios, CAD labs, material testing labs, and drafting facilities.", category: "academic", lat: 12.82424512, lng: 80.04394846 },
  { id: 12, icon: "🎓", name: "C V Raman Block", shortDesc: "Science & engineering labs", longDesc: "Advanced science and engineering research block with state-of-the-art laboratory facilities for physics, chemistry, and interdisciplinary research projects.", category: "academic", lat: 12.82544028, lng: 80.04430042 },
  
  // Facilities
  { id: 13, icon: "🎭", name: "Dr. T.P. Ganesan Auditorium", shortDesc: "3,100 seat multipurpose venue", longDesc: "One of the largest university auditoriums in India with 3,100 seats. Hosts cultural events, conferences, guest lectures, film festivals, and the annual SRM cultural fest.", category: "facilities", lat: 12.824652193, lng: 80.046600700 },
  { id: 14, icon: "📚", name: "Central Library", shortDesc: "1.5L sq ft knowledge hub", longDesc: "The Central Library spans 1,50,000 sq ft with a collection of over 1.5 lakh books, 10,000+ e-journals, digital resource center, reading halls, and a Braille section.", category: "facilities", lat: 12.8232845, lng: 80.0425857 },
  { id: 15, icon: "🏥", name: "SRM Medical College Hospital", shortDesc: "1,200 bed super specialty", longDesc: "A 1,200-bed multi-super specialty hospital providing healthcare to students, staff, and the public. Features emergency services, outpatient clinics, diagnostic imaging, and specialized departments.", category: "facilities", lat: 12.8210402, lng: 80.0479585 },
  { id: 16, icon: "🏨", name: "SRM Hotel", shortDesc: "3-star campus hotel", longDesc: "A 3-star hotel on campus serving visiting faculty, parents, and guests. Amenities include a swimming pool, restaurant, conference rooms, and comfortable accommodation.", category: "facilities", lat: 12.8237973, lng: 80.0416258 },
  { id: 17, icon: "🍽️", name: "Canteen", shortDesc: "Multi-cuisine food courts", longDesc: "Main canteen building with multiple food courts offering North Indian, South Indian, Chinese, and fast food options. Separate mess facilities for hostel residents.", category: "facilities", lat: 12.82331468, lng: 80.04444996 },
  { id: 18, icon: "🕌", name: "Temple", shortDesc: "Prayer & meditation space", longDesc: "Campus temple and prayer hall reflecting the spiritual ethos of SRM. Serves as a peaceful space for meditation and religious activities for all community members.", category: "facilities", lat: 12.823187660, lng: 80.0429429 },
  
  // Boys Hostels (verified from OSM)
  { id: 19, icon: "🏠", name: "Paari Hostel (Boys)", shortDesc: "Boys accommodation", longDesc: "Boys hostel with single, double, and triple occupancy rooms. Equipped with Wi-Fi, 24/7 security, mess, laundry services, and recreational facilities.", category: "accommodation", lat: 12.8225308, lng: 80.0435961 },
  { id: 20, icon: "🏠", name: "Kaari Hostel (Boys)", shortDesc: "Boys accommodation", longDesc: "Boys hostel with modern amenities, spacious rooms, common recreation areas, dedicated study spaces, and round-the-clock security.", category: "accommodation", lat: 12.8221717, lng: 80.0435951 },
  { id: 21, icon: "🏠", name: "Oori Hostel (Boys)", shortDesc: "Boys accommodation", longDesc: "Boys hostel offering comfortable residential facilities with Wi-Fi, mess services, laundry, sports facilities, and regular maintenance.", category: "accommodation", lat: 12.8218209, lng: 80.0436927 },
  { id: 22, icon: "🏠", name: "Adhiyaman Hostel (Boys)", shortDesc: "Boys accommodation", longDesc: "Boys hostel with well-maintained facilities including attached mess, laundry, security, and recreational activities for residents.", category: "accommodation", lat: 12.821426680, lng: 80.043637660 },
  { id: 23, icon: "🏠", name: "Nelson Mandela Hostel (Boys)", shortDesc: "Boys accommodation", longDesc: "Modern boys hostel named after the iconic leader, featuring contemporary rooms, common study areas, and comprehensive amenities.", category: "accommodation", lat: 12.821024256, lng: 80.0436765 },
  { id: 24, icon: "🏠", name: "Manoranjitham Hostel (Boys)", shortDesc: "Boys accommodation", longDesc: "Boys hostel providing comfortable living spaces with modern facilities, mess services, and a supportive residential community.", category: "accommodation", lat: 12.820431133, lng: 80.043987117 },
  { id: 25, icon: "🏠", name: "Agasthiyar Hostel (Boys)", shortDesc: "Boys accommodation", longDesc: "Named after the ancient Tamil sage, this boys hostel offers quality accommodation with comprehensive campus living facilities.", category: "accommodation", lat: 12.820679256, lng: 80.0436264 },
  { id: 26, icon: "🏠", name: "D-Block Mens Hostel", shortDesc: "Boys accommodation", longDesc: "Modern boys hostel with spacious rooms, excellent facilities, proximity to academic blocks, and dedicated support services.", category: "accommodation", lat: 12.821943880, lng: 80.049217360 },
  { id: 27, icon: "🏠", name: "N Block Mens Hostel", shortDesc: "Boys accommodation", longDesc: "Well-equipped boys hostel offering comfortable living with proximity to campus facilities and strong community support.", category: "accommodation", lat: 12.8207445, lng: 80.0465476 },
  
  // Girls Hostels (verified from OSM)
  { id: 28, icon: "🏠", name: "M Block Girls Hostel", shortDesc: "Girls accommodation", longDesc: "Modern girls hostel with comfortable rooms, dedicated study areas, mess facilities, 24/7 security, and recreational amenities.", category: "accommodation", lat: 12.8206515, lng: 80.0459960 },
  { id: 29, icon: "🏠", name: "M Block (Kopperundevi)", shortDesc: "Girls accommodation", longDesc: "Girls hostel block with well-maintained facilities, dedicated support services, and a secure living environment.", category: "accommodation", lat: 12.8208628, lng: 80.0455475 },
  { id: 30, icon: "🏠", name: "Kalpana Chawla Hostel (Girls)", shortDesc: "Girls accommodation", longDesc: "Named after the renowned astronaut, this girls hostel inspires excellence with modern facilities and supportive environment.", category: "accommodation", lat: 12.820405020, lng: 80.0453550 },
  { id: 31, icon: "🏠", name: "Meenakshi Hostel Block (Girls)", shortDesc: "Girls accommodation", longDesc: "Girls hostel offering spacious rooms, modern amenities, mess services, laundry, and a vibrant residential community.", category: "accommodation", lat: 12.8223185, lng: 80.0423595 },
  { id: 32, icon: "🏠", name: "Sannasi C Block (Girls)", shortDesc: "Girls accommodation", longDesc: "Girls hostel with comfortable living spaces, comprehensive facilities, and strong community engagement programs.", category: "accommodation", lat: 12.8219571, lng: 80.0441753 },
  
  // Facilities (continued)
  { id: 33, icon: "⚽", name: "Sports Complex", shortDesc: "Athletics & indoor sports", longDesc: "Extensive sports facilities including cricket and football grounds, basketball and tennis courts, an indoor badminton hall, table tennis rooms, gymnasium, and swimming pool.", category: "facilities", lat: 12.8275, lng: 80.0435 },
  { id: 34, icon: "🚌", name: "Transport Office", shortDesc: "Bus & shuttle booking", longDesc: "The campus transport office handles bus pass issuance, SRM shuttle booking, and transport queries for daily commuters.", category: "transport", lat: 12.8245, lng: 80.0418 },
  { id: 35, icon: "🚉", name: "Potheri Railway Station Gate", shortDesc: "Railway access point", longDesc: "A dedicated gate providing direct walkable access to Potheri Railway Station. Primary railway access for students commuting to/from Chennai and surrounding areas.", category: "transport", lat: 12.8220075, lng: 80.0384608 },
]

const categoryOrder = ["academic", "facilities", "accommodation", "transport"] as const

const categoryMeta: Record<string, { label: string }> = {
  academic: { label: "Academic Blocks" },
  facilities: { label: "Facilities" },
  accommodation: { label: "Accommodation" },
  transport: { label: "Transport" },
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`
  return `${(meters / 1000).toFixed(1)} km`
}

function getDirectionsUrl(lat: number, lng: number): string {
  const isIOS = typeof navigator !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent)
  const isAndroid = typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent)
  if (isIOS) return `https://maps.apple.com/?daddr=${lat},${lng}`
  if (isAndroid) return `https://maps.google.com/maps?daddr=${lat},${lng}`
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}

export function CampusMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null)
  const [posError, setPosError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => setPosError("Location access denied — distance unavailable"),
        { enableHighAccuracy: true, timeout: 10000 },
      )
    } else {
      setPosError("Geolocation not supported")
    }
  }, [])

  const filteredBuildings = useMemo(() => {
    if (!searchQuery.trim()) return buildings
    const q = searchQuery.toLowerCase()
    return buildings.filter((b) => b.name.toLowerCase().includes(q) || b.shortDesc.toLowerCase().includes(q))
  }, [searchQuery])

  const scrollToMap = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0
    }
  }, [])

  const toggleSelect = useCallback((id: number) => {
    setSelectedId((prev) => (prev === id ? null : id))
    scrollToMap()
  }, [scrollToMap])

  const selectedBuilding = useMemo(
    () => buildings.find((b) => b.id === selectedId) ?? null,
    [selectedId],
  )

  const distance = useMemo(() => {
    if (!userPos || !selectedBuilding) return null
    return haversineDistance(userPos.lat, userPos.lng, selectedBuilding.lat, selectedBuilding.lng)
  }, [userPos, selectedBuilding])

  const handleMapSelect = useCallback((id: number) => {
    setSelectedId(id)
    scrollToMap()
  }, [scrollToMap])

  return (
    <div className="flex flex-col h-full w-full">
      {/* Scrollable container */}
      <div ref={listRef} className="flex-1 overflow-y-auto">
        {/* Sticky map - stays below navbar when scrolling */}
        <div ref={mapRef} className="sticky top-0 z-20 w-full overflow-hidden" style={{ height: "45vh", minHeight: "280px" }}>
          <MapView
            buildings={buildings}
            selectedId={selectedId}
            userPos={userPos}
            onSelect={handleMapSelect}
          />

          {/* Search bar overlay */}
          <div className="absolute top-3 left-3 right-3 z-[10]" style={{ maxWidth: "calc(100% - 24px)" }}>
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200"
            style={{
              background: searchFocused ? "rgba(15,23,42,0.95)" : "rgba(15,23,42,0.85)",
              border: searchFocused ? "1px solid rgba(45,212,191,0.4)" : "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search buildings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="map-search-input w-full bg-transparent text-xs outline-none"
              style={{ color: "#e2e8f0" }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="shrink-0 p-0.5 rounded-full hover:opacity-80" style={{ color: "#64748b" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {/* Search results dropdown */}
          {searchQuery.trim() && filteredBuildings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 rounded-xl overflow-hidden"
              style={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
            >
              {filteredBuildings.slice(0, 8).map((b) => (
                <button
                  key={b.id}
                  onClick={() => { setSelectedId(b.id); setSearchQuery(""); setSearchFocused(false); scrollToMap() }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left transition-colors hover:opacity-80"
                  style={{ color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <span className="text-base">{b.icon}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold">{b.name}</div>
                    <div className="text-[10px]" style={{ color: "#64748b" }}>{b.shortDesc}</div>
                  </div>
                </button>
              ))}
              {filteredBuildings.length > 8 && (
                <div className="px-3 py-1.5 text-center text-[10px]" style={{ color: "#64748b" }}>
                  +{filteredBuildings.length - 8} more
                </div>
              )}
            </motion.div>
          )}
          {searchQuery.trim() && filteredBuildings.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 rounded-xl px-3 py-2 text-center text-xs"
              style={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.06)", color: "#64748b" }}
            >
              No buildings found
            </motion.div>
          )}
        </div>

        {/* Location status badge */}
        {!posError && !userPos && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[10] px-3 py-1.5 rounded-xl text-xs font-semibold" style={{ background: "rgba(15,23,42,0.9)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse mr-2 align-middle" />
            Getting your location...
          </div>
        )}
        </div>

        {/* List half */}
        <div className="px-4 py-3">
        {/* Selected building distance + directions card */}
        <AnimatePresence>
          {selectedBuilding && distance !== null && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              className="mb-3 soft-panel p-4"
              style={{ border: "1px solid rgba(45,212,191,0.2)" }}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{selectedBuilding.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold" style={{ color: "#64748b" }}>Distance from you</div>
                  <div className="text-xl font-black tracking-tight" style={{ color: "#2dd4bf" }}>
                    {formatDistance(distance)}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>{selectedBuilding.name}</div>
                </div>
                <button onClick={() => setSelectedId(null)} className="shrink-0 p-1.5 rounded-full hover:opacity-80 transition-opacity" style={{ color: "#64748b" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" /><path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <a
                href={getDirectionsUrl(selectedBuilding.lat, selectedBuilding.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #0d9488, #2dd4bf)", color: "#0f172a" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18 3 12 9 6" /><path d="M21 12H3" /><path d="M15 6l6 6-6 6" />
                </svg>
                Get Directions
              </a>
            </motion.div>
          )}
          {selectedBuilding && distance === null && userPos === null && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-3 soft-panel p-4"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{selectedBuilding.icon}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs" style={{ color: "#64748b" }}>Fetching your location to calculate distance...</p>
                  <div className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>{selectedBuilding.name}</div>
                </div>
                <button onClick={() => setSelectedId(null)} className="shrink-0 p-1.5 rounded-full hover:opacity-80 transition-opacity" style={{ color: "#64748b" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" /><path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
          {selectedBuilding && posError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-3 soft-panel p-4"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{selectedBuilding.icon}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs" style={{ color: "#ef4444" }}>{posError}</p>
                  <div className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>{selectedBuilding.name}</div>
                </div>
                <button onClick={() => setSelectedId(null)} className="shrink-0 p-1.5 rounded-full hover:opacity-80 transition-opacity" style={{ color: "#64748b" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" /><path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Building list */}
        {categoryOrder.map((cat) => {
          const items = filteredBuildings.filter((b) => b.category === cat)
          if (items.length === 0) return null
          return (
            <div key={cat} className="mb-3">
              <div className="flex items-center gap-2 px-1 py-1.5">
                <span className="section-kicker text-xs">{categoryMeta[cat].label}</span>
                <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(45,212,191,0.2), transparent)" }} />
              </div>
              <div className="flex flex-col gap-1.5">
                {items.map((b) => {
                  const isSelected = selectedId === b.id
                  const bDist = userPos ? haversineDistance(userPos.lat, userPos.lng, b.lat, b.lng) : null
                  return (
                    <motion.button
                      id={`building-${b.id}`}
                      key={b.id}
                      layout
                      onClick={() => toggleSelect(b.id)}
                      className="soft-panel w-full text-left overflow-hidden"
                      style={{
                        border: isSelected ? "1px solid rgba(45,212,191,0.25)" : "1px solid transparent",
                      }}
                    >
                      <div className="p-3 flex items-center gap-3">
                        <div className="text-xl shrink-0">{b.icon}</div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold leading-snug" style={{ color: "#cbd5e1" }}>{b.name}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px]" style={{ color: "#64748b" }}>{b.shortDesc}</span>
                            {bDist !== null && (
                              <span className="text-[10px] font-semibold shrink-0" style={{ color: "#2dd4bf" }}>{formatDistance(bDist)}</span>
                            )}
                          </div>
                        </div>
                        <motion.svg
                          animate={{ rotate: isSelected ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          width="12" height="12" viewBox="0 0 24 24" fill="none"
                          stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </motion.svg>
                      </div>
                      <AnimatePresence initial={false}>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 pb-3 pt-0">
                              <div className="h-px mb-2" style={{ background: "linear-gradient(90deg, rgba(45,212,191,0.15), transparent)" }} />
                              <p className="text-[11px] leading-relaxed" style={{ color: "#94a3b8" }}>{b.longDesc}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
    </div>
  )
}
