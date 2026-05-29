# syntax=docker/dockerfile:1

# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM oven/bun:1 AS builder

WORKDIR /app

# Install dependencies using Bun's lockfile for reproducible installs
COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

# Copy source and build
COPY . .
RUN bun run build

# ── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM oven/bun:1-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# TanStack Start / Nitro outputs a self-contained server in .output
COPY --from=builder /app/.output ./.output

EXPOSE 3000

# Nitro's output entry point
CMD ["bun", ".output/server/index.mjs"]