<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` / `npm run build` / `npm run start` — Next 16.4.3, Turbopack is the default bundler (no `--turbo` flag needed).
- `npm run lint` — runs `eslint` (flat config, `eslint.config.mjs`). `next lint` was removed in Next 16; use this script.
- Type check: no script exists — run `npx tsc --noEmit`.
- No test suite, no test runner, no CI workflows (`.github/` does not exist).

## Gotchas

- Lint and `npx tsc --noEmit` are both clean — keep them that way.
- `next.config.ts` has `reactCompiler: true` and a Turbopack rule mapping `*.css` to `@tailwindcss/turbopack`. React Compiler lint rules are on: `setState` inside `useEffect` is an error (`react-hooks/set-state-in-effect`) — prefill form fields with `defaultValue` + a `key` instead.
- `next/image` allows any `https` host via `images.remotePatterns` (`hostname: "**"`), but **only https** — an `http://` image URL breaks the optimizer. Use `getAvatarUrl()` from `src/lib/avatar.ts` for user avatars.

## Architecture

- Next.js App Router, all code under `src/`. Path alias `@/*` → `src/*`.
- **No in-repo backend for news data.** Pages/components fetch the external API `https://news-api-v2.vercel.app/api/...` directly at request time (`/api/news?limit&offset`, `/api/news/sections`, `/api/category/{slug}?page=`, `/api/article/{id}`). There is no cache directive (`use cache`/`cacheLife`) and `cacheComponents` is not enabled — don't assume caching exists.
- Auth: better-auth v1.7 with the MongoDB adapter.
  - `src/lib/auth.ts` — server instance + `MongoClient` (Atlas URI from `BETTER_AUTH_DB_URI`, db name `bangla_news`).
  - `src/lib/auth-client.ts` — **one** browser client, created without `baseURL` so it always calls the same origin (`/api/auth`). Calling `createAuthClient()` twice breaks the shared session atom — don't.
  - `src/app/api/auth/[...all]/route.ts` — `toNextJsHandler(auth)` mount point.
- Route protection uses Next 16's `proxy.ts` (the rename of `middleware.ts`), not `middleware.ts`: `src/proxy.ts` exports `proxy(request)` plus a `config.matcher` of `['/profile', '/profile/edit']` — only the profile area needs a session; news pages are public. Only one proxy file is supported and it must sit next to `app/`.
- `src/app/profile/*`, `src/app/signin`, `src/app/signup` are `"use client"` components.

## Environment

- `.env` exists locally (gitignored via `.env*`) and holds **real** Atlas credentials plus Google/GitHub OAuth secrets — never commit them, and don't paste their values into code, docs, or commits.
- Env vars read by the app: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_DB_URI`, `BETTER_AUTH_GOOGLE_CLIENT_ID`, `BETTER_AUTH_GOOGLE_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (GitHub ones are **not** prefixed with `BETTER_AUTH_`). Optional: `BETTER_AUTH_TRUSTED_ORIGINS` (comma separated).
- **`BETTER_AUTH_URL` must match the port you serve the app on** (`http://localhost:3000`). better-auth rejects requests whose `Origin` doesn't match it ("Invalid origin"). In dev, `src/lib/auth.ts` additionally trusts `http://localhost:*` / `http://127.0.0.1:*`, so email+password works on any port — but the Google/GitHub redirect URIs registered with the providers only work on the exact port in `BETTER_AUTH_URL`, so run `npm run dev` on port 3000 for social login.

## Styling

- Tailwind v4 + daisyUI 5. `src/app/globals.css` is just `@import "tailwindcss";` + `@plugin "daisyui";` — no `tailwind.config.js`; configure via CSS.
- Newer pages mix daisyUI tokens (`bg-base-100`, `border-base-300`, `text-base-content`) with hardcoded slate/red palettes; match the file you are editing.
- UI text is Bangla; body font is `Noto_Serif_Bengali` loaded in `src/app/layout.tsx` via `next/font`.
