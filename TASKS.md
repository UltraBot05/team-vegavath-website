# Vegavath Website — Build Progress

## Current Phase: Phase 1 — Core Site

## Status Legend
- [ ] Not started
- [~] In progress  
- [x] Complete

## Build Order

### Step 1 — Foundation
- [x] Next.js scaffold
- [x] Dependencies installed
- [x] tsconfig.json (strict mode)
- [x] next.config.ts (clean, no ignores)
- [x] .env.local (template)
- [x] .npmrc
- [x] AGENTS.md
- [x] TASKS.md
- [x] GitHub Actions CI workflow
- [x] Neon database setup
- [x] DB migration file (all tables + indexes)
- [x] .env.local values filled

### Step 2 — Data Layer
- [x] src/lib/db.ts
- [x] src/lib/r2.ts
- [x] src/lib/utils.ts
- [x] src/types/ (all interfaces)
- [x] src/lib/services/events.ts
- [x] src/lib/services/team.ts
- [x] src/lib/services/gallery.ts
- [x] src/lib/services/sponsors.ts
- [x] src/lib/services/applications.ts
- [x] src/lib/services/settings.ts

### Step 3 — Auth
- [ ] src/lib/auth.ts
- [ ] src/middleware.ts
- [ ] src/app/(admin)/admin/page.tsx (login page)
- [ ] src/app/api/auth/[...nextauth]/route.ts

### Step 4 — API Routes
- [ ] src/app/api/events/route.ts
- [ ] src/app/api/team/route.ts
- [ ] src/app/api/gallery/route.ts
- [ ] src/app/api/sponsors/route.ts
- [ ] src/app/api/join/route.ts
- [ ] src/app/api/admin/events/route.ts
- [ ] src/app/api/admin/team/route.ts
- [ ] src/app/api/admin/gallery/route.ts
- [ ] src/app/api/admin/sponsors/route.ts
- [ ] src/app/api/admin/settings/route.ts

### Step 5 — Layout
- [ ] src/app/layout.tsx (root)
- [ ] src/app/globals.css
- [ ] src/components/layout/Navbar.tsx
- [ ] src/components/layout/Footer.tsx
- [ ] src/components/layout/RacingCursor.tsx
- [ ] src/components/layout/CursorToggle.tsx
- [ ] src/components/layout/PageTransition.tsx

### Step 6 — Pages (in order)
- [ ] / (Home)
- [ ] /about
- [ ] /events
- [ ] /events/[slug]
- [ ] /gallery
- [ ] /crew
- [ ] /sponsors
- [ ] /join
- [ ] /admin/dashboard
- [ ] /admin/events
- [ ] /admin/team
- [ ] /admin/gallery
- [ ] /admin/sponsors
- [ ] /admin/settings
- [ ] 404 page

### Step 7 — Pre-launch
- [ ] Migration scripts (old repo → R2)
- [ ] Seed scripts (DB initial data)
- [ ] Full build test (npm run build)
- [ ] Deploy to Vercel