"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Building {
  id: number
  icon: string
  name: string
  shortDesc: string
  lat: number
  lng: number
}

interface MapViewProps {
  buildings: Building[]
  selectedId: number | null
  userPos: { lat: number; lng: number } | null
  onSelect: (id: number) => void
}

const markerIcons: Record<string, string> = {
  "University Building (UB Block)": "🏛️",
  "Tech Park (TP1)": "💻",
  "Tech Park (TP2)": "💻",
  "High Tech Block": "🔬",
  "Main Block": "🖥️",
  "Electrical Sciences Block": "⚡",
  "Mechanical Block": "🔧",
  "Aerospace Block": "🏗️",
  "Bio-Tech Block": "🧬",
  "MBA Block": "📊",
  "Architecture Block": "🏗️",
  "C V Raman Block": "🎓",
  "Dr. T.P. Ganesan Auditorium": "🎭",
  "Central Library": "📚",
  "SRM Medical College Hospital": "🏥",
  "SRM Hotel": "🏨",
  "Canteen": "🍽️",
  "Temple": "🕌",
  "Sports Complex": "⚽",
  "Transport Office": "🚌",
  "Potheri Railway Station Gate": "🚉",
}

export default function MapView({ buildings, selectedId, userPos, onSelect }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<number, L.Marker>>(new Map())
  const userMarkerRef = useRef<L.Marker | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [12.8236, 80.0442],
      zoom: 16,
      zoomControl: false,
      attributionControl: false,
    })

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map)

    L.control.zoom({ position: "bottomright" }).addTo(map)

    // Force size recalculation after mount
    setTimeout(() => map.invalidateSize(), 200)

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const markers = markersRef.current

    buildings.forEach((b) => {
      const existing = markers.get(b.id)
      if (existing) {
        map.removeLayer(existing)
      }

      const isSelected = b.id === selectedId
      const iconHtml = markerIcons[b.name] || "📍"
      const size = isSelected ? 44 : 28
      const fontSize = isSelected ? 20 : 12

      const html = isSelected
        ? `<div style="position:relative;display:flex;flex-direction:column;align-items:center">
            <div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(135deg,#0d9488,#2dd4bf);border:3px solid #5eead4;display:flex;align-items:center;justify-content:center;font-size:${fontSize}px;box-shadow:0 0 30px rgba(45,212,191,0.7),0 0 60px rgba(45,212,191,0.3);animation:pulse-glow 1.5s ease-in-out infinite">
              <div style="position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(45,212,191,0.3);animation:pulse-ring 1.5s ease-in-out infinite"></div>
              ${iconHtml}
            </div>
            <div style="margin-top:4px;padding:3px 10px;border-radius:8px;background:rgba(15,23,42,0.92);border:1px solid rgba(45,212,191,0.3);color:#e2e8f0;font-size:11px;font-weight:700;white-space:nowrap;backdrop-filter:blur(8px);box-shadow:0 4px 12px rgba(0,0,0,0.4)">${b.name}</div>
           </div>`
        : `<div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(135deg,#0d9488,#2dd4bf);border:2px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;font-size:${fontSize}px;box-shadow:0 2px 8px rgba(0,0,0,0.4)">${iconHtml}</div>`

      const icon = L.divIcon({
        className: "",
        html,
        iconSize: [isSelected ? 160 : 28, isSelected ? 72 : 28],
        iconAnchor: [isSelected ? 80 : 14, isSelected ? 72 : 14],
      })

      const marker = L.marker([b.lat, b.lng], { icon }).addTo(map)
      marker.on("click", () => onSelect(b.id))
      markers.set(b.id, marker)
    })

    return () => {
      markers.forEach((m) => map.removeLayer(m))
      markers.clear()
    }
  }, [buildings, selectedId, onSelect])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current)
      userMarkerRef.current = null
    }

    if (userPos) {
      const userMarker = L.marker([userPos.lat, userPos.lng], {
        icon: L.divIcon({
          className: "",
          html: `<div style="width:20px;height:20px;border-radius:50%;background:#3b82f6;border:3px solid rgba(255,255,255,0.8);box-shadow:0 0 16px rgba(59,130,246,0.6)"><div style="width:8px;height:8px;border-radius:50%;background:white;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"></div></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        }),
      }).addTo(map)
      userMarker.bindTooltip("You are here", { direction: "top", className: "campus-tooltip" })
      userMarkerRef.current = userMarker
    }
  }, [userPos])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !selectedId) return

    const building = buildings.find((b) => b.id === selectedId)
    if (building) {
      map.flyTo([building.lat, building.lng], 17, { duration: 0.6 })
    }
  }, [selectedId, buildings])

  return (
    <div ref={containerRef} className="w-full h-full" style={{ position: "absolute", inset: 0, zIndex: 1 }} />
  )
}
