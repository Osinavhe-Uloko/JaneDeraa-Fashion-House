# JaneDeraa — full-stack build

A luxury fashion house site implemented from the `JaneDeraa Screens.dc.html` design handoff
in `project/` (see `chats/chat1.md` for the design history). Two independent apps:

```
web/     Next.js 14 (App Router) + TypeScript + Tailwind CSS — the storefront
server/  Node.js + Express — REST API for products, collections, orders, inquiries
project/ Original Claude Design handoff bundle (reference only, not part of the app)
```

## Design notes

The design screens (Montserrat + Clash Display, deep green `#1D4429` / gold `#AF8A2F` /
black / grey / white) supersede the generic brand-brief text that mentioned Fraunces +
Jost and an ivory/espresso palette — the attached `.dc.html` file went through several
rounds of revision in `chats/chat1.md` and is the authoritative source. All tokens in
`web/tailwind.config.js` are taken from that file's final `<style>` block.

Two scope decisions were made explicitly for this build:
- **Product/editorial imagery** is sourced from loremflickr.com (a free placeholder photo
  service) and re-uploaded into your own Supabase Storage bucket by `server/scripts/seed.js`
  — swap in real photography by re-running the seed with different source URLs, or by
  uploading directly to the `product-images` bucket and updating `products.images`.
- **Checkout is a UI-only mock.** The payment step collects card fields and the flow
  writes a real order row via the API, but no payment gateway is called and no card is
  charged. Wiring up Stripe (or similar) would mean adding a `/api/checkout/intent`
  route in `server/` and swapping the payment step in `web/components/CheckoutClient.tsx`
  for Stripe Elements.

## Prerequisites

- Node.js 18+
- A free [Supabase](https://supabase.com) account

## 1. Create a Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**. The
   free tier is enough for this.
2. Once it's provisioned, open **Project Settings → API** and note down:
   - **Project URL**
   - **anon public** key
   - **service_role** key (keep this one secret — server-side only)
3. Open the **SQL Editor** and run the contents of `server/supabase/schema.sql`. This
   creates all tables (`categories`, `products`, `collections`, `orders`, `inquiries`,
   `stores`, `journal_articles`, `newsletter_subscribers`) and their RLS policies.

## 2. Configure and run the backend

```bash
cd server
cp .env.example .env
# fill in SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from step 1
npm install
npm run seed   # downloads placeholder images, uploads them to Supabase Storage,
                # and inserts ~20 products, categories, stores and journal articles
npm run dev     # starts the API on http://localhost:4000
```

`npm run seed` is idempotent — safe to re-run after editing `server/scripts/seedData.js`.

## 3. Configure and run the frontend

In a separate terminal:

```bash
cd web
cp .env.example .env.local
# NEXT_PUBLIC_API_BASE_URL already points at the server above
# fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from step 1
npm install
npm run dev     # starts the storefront on http://localhost:3000
```

The two apps are independent — the frontend just needs `NEXT_PUBLIC_API_BASE_URL`
pointed at wherever the Express API is running (locally or deployed), and its own
Supabase anon key for Auth.

### Enabling Sign in / Create account

Supabase Auth is on by default once you have a project — `/login` and `/register` will
work as soon as `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set. By
default Supabase requires email confirmation for new accounts; you can turn that off
under **Authentication → Providers → Email** in the dashboard for faster local testing.

## What's implemented

**Pages** (mobile-first, tested at 375 / 768 / 1440): Home, Shop (`/shop`, live
filter/sort), Product detail, Custom-Made, Bespoke, Inquiry (5-step form + confirmation,
shared by Custom + Bespoke), Lookbook, About, Store locator, Contact (+ FAQ accordion),
Journal listing + article template, Cart (drawer + full page), Checkout (3-step + mock
payment + confirmation), Account dashboard (Orders / Measurements / Wishlist / Addresses
/ Settings), Login/Register, 404.

**Components**: `Nav` (overlay + solid variants, mobile drawer, inline search),
`Footer`, `ProductCard` (hover-swap image, wishlist toggle), `Accordion`, `Button`
(primary/secondary/text), `FormField`, `Tag`, `CartDrawer`, `QuantityStepper`,
`Breadcrumb`.

**State**: cart and wishlist are React context + `localStorage` (persist across
reloads, no backend account needed to use them); Supabase Auth session drives the
Account dashboard and gates order history (matched by the signed-in user's email).

**Backend routes**: `GET/POST /api/products`, `/api/categories`, `/api/collections`,
`/api/orders` (create + list-by-email + lookup-by-order-number), `/api/inquiries`,
`/api/stores`, `/api/journal`, `/api/newsletter`.

## Testing

```bash
cd web && npm run build && npm run lint   # type-checks + lints cleanly
```

The frontend renders gracefully even before the API/Supabase are configured — data
fetches fail soft to empty states rather than crashing the page (see `web/lib/safe.ts`).
