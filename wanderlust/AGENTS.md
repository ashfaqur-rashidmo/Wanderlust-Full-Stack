<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust

Next.js 16.4 / React 19 landing site (travel theme). App Router only (`src/app/`); no tests, no CI. Routes: `/` (landing), `/destination` (all packages, client-side filters), `/destination/[id]` (details), `/add-destination` (add-package form), `/signin` + `/signup` (better-auth forms), `/my-bookings` (session-gated). Components live under `src/components/{Home,Destination,Booking}`. `README.md` is stale create-next-app boilerplate (it still claims Geist fonts) — treat this file as the source of truth.

## Commands

- `npm run dev` — dev server (Turbopack is the default bundler in Next 16). If a server is already running for this project, `next dev` refuses to start another ("Another next dev server is already running") — check `http://localhost:3000` / `.next/dev/logs/` before starting one.
- `npm run lint` — bare `eslint` using flat config (`eslint.config.mjs`); lints the working tree, which is slow — scope to changed files for a single change (`npx eslint <file>`).
- `npm run build` / `npm start` — production build/serve.
- No `typecheck` script; run `npx tsc --noEmit` yourself when verification needs more than lint.

## Backend is external and hard-coded

- The repo is frontend-only. Data comes from a backend expected at `http://localhost:8000` (not in this repo, not behind an env var). It will be running during development; without it `/destination` and `/destination/[id]` throw on fetch (`/my-bookings` code lands in a `try/catch` instead).
- Hard-coded fetch literals, spread across several files: `src/app/destination/page.tsx` (`GET /all-destinations`), `src/app/destination/[id]/page.tsx` + `DeleteDestination.tsx` + `EditDestinationDialog.tsx` (read/mutate `destination/:id`), `src/app/add-destination/page.tsx` (`POST /add-destination`, `"use client"` form), `src/app/my-bookings/page.tsx` (`GET /my-bookings/:email`, `cache: "no-store"`), `MyBookingCard.tsx` (delete `my-bookings/:id`), `BookingCard.tsx` (`POST /booking`), `FeatureDestination.tsx` (`GET /feature-destinations`). If the port/origin changes, update all of them (no proxy, no `NEXT_PUBLIC_*` helper).
- Established pattern: protected backend calls (`/booking`, `/add-destination`, `/my-bookings/:id`, delete/edit `destination/:id`) send `authorization: Bearer <token>` — see the Auth section below for the token helpers. Match this in new client-side calls.
- The `Destination` type and data helpers live in **`src/lib/destination.ts`** (single source; import from there, don't re-declare). Real backend records can have **empty `imageUrl` and/or empty `price`** — cards render a placeholder tile and omit the price (`priceLabel()` returns `null`; see also `formatDepartureDate`). Keep that behavior in new UI.
- Rating/reviews/highlights aren't in the backend response yet; the details-page mock values are `DEFAULT_RATING / DEFAULT_REVIEWS / DEFAULT_HIGHLIGHTS` in `destination.ts`. Don't "fix" the mock values or render them as real data.

## Auth: better-auth + MongoDB + JWT

- Server: `src/lib/auth.ts` (`betterAuth` + `@better-auth/mongo-adapter`, database name `wanderlust`, email/password enabled, **`jwt()` plugin**, session `cookieCache` with `strategy: "jwt"` / 7-day maxAge); mounted at `/api/auth/[...all]` via `toNextJsHandler`. Client: `authClient` from `src/lib/auth-client.ts` (`better-auth/react` + `jwtClient()`, `useSession`, `signIn.email`, `signOut`, `authClient.token()`).
- Getting a JWT for backend calls — two helpers with inconsistent casing, don't confuse which side they run on:
  - `src/lib/getTokenFromServer.ts` → `getTokenFromServer()`: server components (uses `auth.api.getToken` + `headers()`; used by `/my-bookings` page).
  - `src/lib/GetTokenFromClient.ts` → `getTokenFromClient()`: client components (uses `authClient.token()`; used by `BookingCard`, `add-destination`, `DeleteDestination`, `EditDestinationDialog`).
- Route protection lives in **`src/proxy.ts`** (Next 16's middleware-equivalent file): `auth.api.getSession`, then `NextResponse.redirect('/signin')` for matchers `/add-destination`, `/my-bookings`, `/destination/:path`. This runs before pages, so the sign-in-prompt gate in `/my-bookings` is a second line of defense. New protected routes go in the `config.matcher` array there.
- Env vars referenced by the code: `MONGODB_URI` (server) and `BETTER_AUTH_URL` (client base URL); also set `BETTER_AUTH_SECRET` (better-auth throws without it in production). `.env` exists locally but is **not committed** — a fresh checkout needs all three or `import "@/lib/auth"` crashes (e.g. `/my-bookings`, `/api/auth/*`, `proxy.ts`).

## Config quirks (in `next.config.ts`)

- `reactCompiler: true` — components are auto-memoized; don't add `useCallback`/`useMemo`/`memo` by hand.
- `cacheComponents` and `partialPrefetching` are both **false** — no Suspense-boundary requirement for request-time fetches.
- Tailwind v4 is CSS-first: there is **no** `tailwind.config`. Tailwind is wired through the Turbopack loader in `next.config.ts` and theme tokens live in `src/app/globals.css` (`@theme inline`, plus shadcn CSS variables). Edit tokens there.
- `next/image` with external URLs only optimizes hostnames on the `images.domains` allow-list (currently `images.unsplash.com` + `localhost`); all other origins 400 from `/_next/image`. Add new origins when rendering other external images — `images.domains` is deprecated in Next 16 in favor of `images.remotePatterns` (see `node_modules/next/dist/docs/.../upgrading/version-16.md`).

## Theming

- `src/app/layout.tsx` sets the theme via `data-theme` on `<html>`, but the `dark:` Tailwind variant compiles to `&:is(.dark *)` (a `.dark` class ancestor) per `globals.css`. These don't agree — if adding dark styles, keep the class and attribute mechanisms consistent.
- Fonts: three Google fonts via `next/font` in `layout.tsx`, exposed as CSS variables on `<html>`: `--font-josefin` (also `.className`, so it's the base font), `--font-instrument`, `--font-dmserif`. Use the variables in Tailwind/globals.css, don't re-import fonts. `globals.css` `@theme inline` maps them to Tailwind utilities: `font-heading` (josefin), `font-display` (instrument), `font-logo` (dmserif).

## shadcn/ui

- Style is `base-nova`: primitives come from **`@base-ui/react`, not Radix** — components in `src/components/ui/` will look different from typical shadcn examples.
- Add components with `npx shadcn@latest add <name>`; they land in `src/components/ui` (aliases from `components.json`: `@/` → `src/`).
- Icons: `lucide-react`.
- `cn` is not the usual clsx + tailwind-merge util: `src/lib/utils.ts` re-exports the standalone `cn` package. Import it from `cn` (as generated components do), don't rewrite it.

## Misc

- `Navbar`, `Footer`, and the react-toastify `ToastContainer` are rendered globally in `layout.tsx`; `page.tsx` has Navbar/Footer commented out. Don't re-render them per-page. Toasts (`react-toastify`) are the existing pattern for BOOK NOW / add / delete feedback.
- Static assets live in `public/images/` (banner, destinations/, testimonials); reference with `next/image`.

## Route typing

- Route typing is on: use generated helper types (`PageProps<"/">`, `LayoutProps<"/">`) for route props instead of declaring `{ params, searchParams }` manually. Dynamic props are Promises: `const { id } = await params`.
