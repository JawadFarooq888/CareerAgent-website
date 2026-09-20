# CareerAgent Website

A Next.js website for a Career Agent / Reverse Recruiter business: marketing site, blog, pricing, lead-capture forms, and a custom admin panel.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** (navy + gold theme, see `app/globals.css`)
- **Prisma 7** + PostgreSQL (driver adapter via `@prisma/adapter-pg`) — works with [Neon](https://neon.tech)
- **NextAuth (Auth.js) v5** — Credentials login for the admin panel
- **Resend** — email notifications (optional; logs to console if unset)
- **Paddle Billing** — Pricing page checkout (optional; falls back to the consultation flow if unset)
- **Zod** — form validation on every Server Action

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the values (see below).

3. Run migrations and seed an admin user:

   ```bash
   npx prisma migrate dev
   npm run db:seed
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) for the site, and [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin panel.

## Environment Variables

See `.env.example` for the full list. Required to run anything beyond static pages:

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | Yes | Postgres connection string. A free [Neon](https://neon.tech) database works well with Vercel. |
| `AUTH_SECRET` | Yes | Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` |
| `RESEND_API_KEY` | No | Without it, lead notification emails are logged to the console instead of sent. |
| `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` | No | Without it, Pricing page CTAs fall back to "Book a Consultation" instead of a Paddle checkout. See **Payments** below. |
| `NEXT_PUBLIC_PADDLE_ENV` | No | `sandbox` (default, for testing) or `production`. |
| `NEXT_PUBLIC_PADDLE_PRICE_STARTER` / `NEXT_PUBLIC_PADDLE_PRICE_ACCELERATOR` | No | Paddle price IDs (`pri_...`) for the Starter and Accelerator packages. A package without a price ID always falls back to the consultation flow. |
| `NEXT_PUBLIC_CHAT_WIDGET_SRC` | No | Reserved for wiring in a real chat provider (Tawk.to, Crisp, etc.) later. |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 measurement ID. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | No | Google Search Console HTML verification code. |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | No | Used only by `npm run db:seed` to create/update the admin login. Defaults to `admin@example.com` / `changeme123` — **change the password before deploying**. |

## Admin Panel

The admin panel (`/admin`) manages:

- **Inquiries** — contact form + consultation requests
- **Blog** — create/edit/delete posts (the public blog currently reads from `lib/blog.ts` placeholder data — swap the data-access functions there for `prisma.blogPost` queries once you're ready to manage posts from the admin panel)
- **Testimonials**, **Pricing** — full CRUD, but the public Testimonials and Pricing pages currently render from `lib/placeholder-data.ts`; swap those for Prisma queries when ready
- **Content** — generic key/value overrides (`ContentBlock` model) for future use via `getContentBlock()` in `lib/content.ts`

Access is protected by `proxy.ts` (Next.js 16's replacement for `middleware.ts`), which redirects unauthenticated requests to `/admin/login`.

## Payments (Paddle)

The Pricing page (`components/marketing/PricingCard.tsx`) checks `isPaddleConfigured()` on
every render: if `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` is unset, or a specific package has no
matching price ID, that package's button always falls back to "Book a Consultation" — nothing
breaks if Paddle isn't set up yet.

To go live with real checkout:

1. **Create a Paddle account** at [paddle.com](https://paddle.com). Paddle acts as merchant of
   record (handles card processing, US sales tax, and refunds for you).
2. **Set up a payout method.** Paddle pays out via wire transfer or Payoneer. For a
   Pakistan-based seller, Payoneer is the practical route — Pakistan doesn't currently support
   direct payouts from most other processors (e.g. individual PayPal accounts can't receive
   funds in Pakistan). Create a free Payoneer account and link it in Paddle's payout settings.
3. **Get a client-side token**: Paddle dashboard → Developer Tools → Authentication.
4. **Create a product + price** for each paid package (Starter, Accelerator) under Catalog →
   Products. Copy each price's ID (`pri_...`).
5. Set `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`, `NEXT_PUBLIC_PADDLE_PRICE_STARTER`, and
   `NEXT_PUBLIC_PADDLE_PRICE_ACCELERATOR` in your environment (start with
   `NEXT_PUBLIC_PADDLE_ENV=sandbox` to test with fake cards before switching to `production`).

The "Executive" package is intentionally left without a price ID — it's custom-quoted, so it
always routes to the consultation/contact flow regardless of Paddle configuration.

Paddle's cut is roughly 5% + $0.50 per transaction, plus a currency-conversion margin on
non-USD cards — budget for ~7% effective fees, and note funds typically become payable to you
about 13 days after a sale (Paddle's standard hold period).

## Content To Replace Before Launch

Everything below is realistic **placeholder copy** — replace it with real information before going live:

- `lib/site-config.ts` — business name, owner name/title, email, phone, WhatsApp number, social links
- `lib/placeholder-data.ts` — services, FAQs, testimonials (fabricated), pricing packages
- `lib/blog.ts` — sample blog posts
- `app/(marketing)/privacy-policy` and `terms-conditions` — marked `[Placeholder content]`; have these reviewed by a legal professional
- `components/marketing/StatsSection.tsx` — fabricated stats (250+ clients, etc.) — replace with real numbers or remove

## Deployment (Vercel + Neon)

1. Create a Neon Postgres database and copy its connection string into `DATABASE_URL`.
2. Push this repo to GitHub and import it into Vercel.
3. Add all environment variables from `.env.example` in the Vercel project settings.
4. Run `npx prisma migrate deploy` against the production database (or set it up as a Vercel build step).
5. Run `npm run db:seed` (with production `ADMIN_EMAIL`/`ADMIN_PASSWORD` set) once against the production database to create your admin login.
6. Update `siteConfig.url` in `lib/site-config.ts` to your production domain — it feeds the sitemap, robots.txt, and Open Graph metadata.

## Security Notes

- All public forms (contact, consultation, newsletter) validate input with Zod and include a honeypot field; contact/consultation also check a minimum fill-time to deter bots.
- Admin passwords are hashed with bcrypt; sessions use NextAuth JWT strategy.
- `/admin/*` is gated by `proxy.ts` — verify this still applies after any Next.js upgrade (`middleware.ts` → `proxy.ts` was a breaking rename in Next.js 16).
- No secrets are exposed client-side — only `NEXT_PUBLIC_*` variables are sent to the browser.
