# Site expansion: contract for parallel workers

Two repos, both on branch `feature/site-expansion`:
- `~/projects/itacate` (Next.js 13 app router, Tailwind): the public website
- `~/projects/itcate-backend` (NestJS + Prisma + Postgres): API + admin dashboard (static, `public/admin`)

Each worker has its OWN git worktree of both repos and its OWN local database. Never touch another worker's files.

## Brand
Cream `#F3EABF` / soft `#FBF5DC` / card `#FFFBEA`, orange `#E5902C`, ink `#4A3412`, muted brown `#8A4F0E`.
Everything is bilingual (Khmer + English). Mobile first. Accessible (labels, focus rings, alt text, keyboard).

## Frontend rules (itacate)
- New public pages live in `app/(site)/<route>/page.tsx` so they get the shared header/footer (`app/(site)/layout.tsx`).
- Server component fetches data with `apiGet(path, fallback)` from `lib/api.ts` (never throws, always has a fallback so the page renders with the backend down).
- Language is client-side state, so bilingual text renders in client components:
  `<L en="Hello" kh="សួស្តី" />`, `useLang()`, `usePick()` / `pick(item, "title", lang)` for `title_en` / `title_kh` columns (`ui/site/L.tsx`).
- Layout building blocks: `ui/site/kit.tsx` (`PageHero`, `Section`, `Container`, `Card`, `ButtonLink`, `inputClass`, `labelClass`, `submitClass`, `errorClass`, `successClass`).
- Forms POST from the browser with `apiSend()` (`lib/api.ts`): same-origin `/api/...` in production. Show a friendly error with `errorText()`.
- Page-specific strings and components go in your own files: `app/(site)/<route>/`, `ui/<feature>/`, `lib/<feature>.ts`.
- Do NOT edit: `lib/nav.ts`, `lib/api.ts`, `lib/settings.ts`, `ui/site/*`, `app/(site)/layout.tsx`, `styles/globals.css` (add feature CSS in a CSS module or Tailwind classes). If a shared file needs a change, say so in your final report instead.
- Placeholder content: realistic, clearly sample (restaurant "Itacate", Mexican cuisine in Phnom Penh). Khmer text: write the English, translate with Google Translate (`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=km&dt=t&q=...`), then proof-read; strip trailing "។" and zero-width chars.

## Backend rules (itcate-backend)
- Your feature module already exists and is registered in `src/app.module.ts`: edit only `src/<feature>/` (module, controller, service, dto). Do NOT edit `app.module.ts`, `prisma/schema.prisma` or migrations. All tables you need already exist (see schema, "Site expansion" section). If you truly need a schema change, stop and report it.
- Public endpoints: no guard, strict validation (trim, length caps, types), return generic errors. Admin endpoints: `@UseGuards(AdminGuard)` from `src/auth/admin.guard`.
- Use `PrismaService` (`src/prisma.service`, `extends PrismaClient`) in your module's providers.
- Admin screens are plug-in files: `public/admin/sections/<id>.js` (already stubbed, already loaded by index.html). Use the `kit` argument (`api, h, notify, guard, openModal, closeModal, confirmModal, cancelBtn, sortable, saveOrder, grip, plural, imgUrl, money, when`). Build DOM with `h()` only, never innerHTML with user data. Look at the existing screens in `public/admin/admin.js` (Categories, Menu) for the patterns and match their look. File uploads: `POST /uploads` (FormData `file`) returns `{ url }`.
- Placeholder content: an idempotent seed script `prisma/seeds/<feature>.ts` run with `npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seeds/<feature>.ts` (only fills when the table is empty).

## Workflow
1. Work ONLY in your worktree (paths in your brief). `node_modules` is symlinked; the Prisma client is generated.
2. Backend: `DATABASE_URL=postgresql://phanne@localhost:5432/<your db> yarn build` and run the server (`PORT=<your port> node dist/src/main`) to test endpoints with curl. Frontend: `npm run build` must pass, and run `npx next dev -p <port>` with `NEXT_PUBLIC_BACKEND_URL=http://localhost:<backend port>` to check pages.
3. Screenshot-check pages with headless Chrome: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1280,900 --virtual-time-budget=10000 --screenshot=FILE URL`. Check mobile (390 wide) too.
4. Commit on your branch in each repo (`git add -A && git commit`). NEVER push, never touch production/the VPS, never run migrations on any DB other than yours.
5. Final report: files added/changed per repo, endpoints, how to seed, anything shared that needs changing, anything not done.
