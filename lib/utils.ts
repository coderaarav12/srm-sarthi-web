import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(time: string) {
  if (!time) return "--:--"
  const [h, m] = time.split(":")
  const hour = Number.parseInt(h)
  const ampm = hour >= 12 ? "PM" : "AM"
  const hour12 = hour % 12 || 12
  return `${hour12}:${m} ${ampm}`
}

export function getMinutesFromMidnight(time: string | undefined | null) {
  if (!time) return 0
  const [h, m] = time.split(":").map(Number)
  return h * 60 + m
}

export function isRunningNow(arrival: string | undefined | null, departure: string | undefined | null) {
  const now = new Date()
  const currentMin = now.getHours() * 60 + now.getMinutes()
  const arrMin = getMinutesFromMidnight(arrival)
  const depMin = getMinutesFromMidnight(departure)
  return currentMin >= arrMin && currentMin <= depMin
}

export function getCurrentDay() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  return days[new Date().getDay()]
}
