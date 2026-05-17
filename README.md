# smkn74-web

Next.js (App Router, TypeScript, Tailwind) + Supabase local dev scaffold.

## Stack

- **Frontend & backend**: Next.js 15 App Router (React Server Components + Route Handlers)
- **Database / auth / storage**: Supabase (local stack via Supabase CLI + Docker)
- **Client libs**: `@supabase/supabase-js`, `@supabase/ssr`

## One-time setup

1. Install **Docker Desktop** (required by the Supabase CLI) and launch it.
2. Install the **Supabase CLI**:
   ```bash
   brew install supabase/tap/supabase
   ```
3. Initialize the local Supabase project (creates `supabase/` folder):
   ```bash
   supabase init
   ```

## Running locally

```bash
# 1. Start the local Supabase stack (Postgres, Auth, Storage, Studio)
supabase start
```

The command prints an `API URL`, `anon key`, and `service_role key`. Copy them into `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key>
```

```bash
# 2. Start Next.js
npm run dev
```

- App: http://localhost:3000
- Health check: http://localhost:3000/api/health
- Supabase Studio: http://127.0.0.1:54323

## Project layout

```
src/
  app/
    page.tsx              # Home, runs a server-side Supabase check
    api/health/route.ts   # JSON health endpoint
  lib/supabase/
    client.ts             # Browser client (use in "use client" components)
    server.ts             # Server client (use in RSC, route handlers, server actions)
```

## Useful Supabase CLI commands

```bash
supabase status     # show local URLs and keys
supabase stop       # stop the local stack
supabase db reset   # reset database to migrations + seed
supabase migration new <name>
```
