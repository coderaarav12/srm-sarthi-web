# Deploying SRM Sarthi to Cloudflare

## Prerequisites

- Node.js 20+
- Cloudflare account
- Wrangler CLI

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install OpenNext Cloudflare adapter:
```bash
npm install -D @opennextjs/cloudflare wrangler
```

3. Deploy:
```bash
npm run build:opennext
npx wrangler deploy
```

## Development

```bash
npm run dev
```
