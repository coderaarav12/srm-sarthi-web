# SRM Sarthi

A commute companion for SRMIST day scholars in Chennai/Kattankulathur.

Built with Next.js, statically exported — no server runtime needed.

## Features

- **Live train schedules** — Potheri (POTI) station board with real-time arrivals/departures and 30s auto-refresh
- **Train search & route planning** — find trains between any two Chennai Suburban stations
- **Train tracking** — running status with live position and station-wise timeline
- **SRM bus routes** — all 47 student & staff shuttle routes with stops, timings, and transport contact info
- **Interactive campus map** — Leaflet map with 35+ geolocated buildings, search, distance calculation, and directions

> **Note:** This project uses Next.js 16 which has breaking changes from earlier versions. APIs, conventions, and file structure may differ. Check deprecation notices in `node_modules/next/dist/docs/` before modifying code.

## Tech Stack

- Next.js 16 (App Router, static export)
- React 19, TypeScript
- Tailwind CSS v4, Framer Motion
- Leaflet + React-Leaflet (campus map)
- Radix UI (ScrollArea, Select, Tabs)
- Lucide icons, Sonner toasts

## Data Sources

- Train schedules: static JSON datasets committed in `lib/`
- Live train data: external API endpoints (`/api/trains/*`, `/api/track/*`)
- Bus routes: hardcoded in `components/bus-section.tsx`
- Campus buildings: hardcoded in `components/campus-map.tsx`
- User profiles: `localStorage`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Static output is written to `out/`.

## Deployment

Deployed at [srm-sarthi-web.vercel.app](https://srm-sarthi-web.vercel.app).

For Cloudflare deployment, see [`CLOUDFLARE_DEPLOY.md`](./CLOUDFLARE_DEPLOY.md) (requires `@opennextjs/cloudflare`).
