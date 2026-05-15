import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  applicationName: "SRM Sarthi",
  title: { default: "SRM Sarthi | Commute Companion for SRMIST Day Scholars", template: "%s | SRM Sarthi" },
  description: "Daily commute tracker for SRMIST day scholars. Live local train schedules from Potheri station, bus tracking, and route planning.",
  keywords: ["SRM Sarthi", "SRMIST commute", "Potheri station", "Chennai local train", "SRM day scholar", "SRM transport"],
  authors: [{ name: "SRM Sarthi Team" }],
  openGraph: {
    type: "website",
    siteName: "SRM Sarthi",
    title: "SRM Sarthi | Commute Companion for SRMIST Day Scholars",
    description: "Live local train schedules, bus tracking, and route planning for SRMIST day scholars.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
