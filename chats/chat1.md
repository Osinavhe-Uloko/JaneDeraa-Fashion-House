# JaneDeraa Fashion Website

_Started 2026-08-23 20:07 UTC_

---

## User

# JaneDeraa — Figma UI Design Prompt

Paste this whole prompt into your AI design tool. It specifies brand direction, design system, and every screen needed for a complete, professional fashion house website.

---

## 1. BRAND BRIEF

**Brand name:** JaneDeraa
**Industry:** Luxury fashion house — ready-to-wear, casual, custom-made, and bespoke garments for men and women.
**Positioning:** Timeless elegance, understated luxury, quiet sophistication. Not flashy or trend-chasing — the opposite of fast fashion.
**Brand voice:** Refined, minimal, confident, warm but reserved. Sentences are short and declarative. No exclamation marks. No slang.
**Core message:** "Timeless elegance in every stitch — classic lines, modern sensibility."
**Target customer:** Discerning men and women, 28–55, values craftsmanship over logos, appreciates tailoring and quality over quantity, has disposable income for custom/bespoke pieces.

**Design references / mood:** Think The Row, Loro Piana, Brunello Cucinelli, Khaite — generous white space, large editorial photography, quiet typography, no clutter, no bright colors, no stock-photo feel.

---

## 2. DESIGN SYSTEM

### 2.1 Color Palette
- **Primary background:** Ivory / off-white — `#F7F5F1`
- **Secondary background:** Warm stone — `#EDE8E0`
- **Primary text / near-black:** `#1A1815`
- **Accent (brand signature):** Deep espresso brown — `#3B2E27`
- **Secondary accent:** Muted gold / brass — `#B08D57` (used sparingly — CTAs, dividers, icons)
- **Neutral gray (supporting text):** `#6B6660`
- **Border/hairline:** `#DAD5CC`
- **Success/error states:** desaturated forest green `#5C6E52` / muted terracotta `#A85C4A` (never bright red/green)

Rule: color is used with restraint. 90% of every screen is ivory, stone, and near-black. Gold accent never covers more than 5% of any screen.

### 2.2 Typography
- **Display / Headline font:** A high-contrast serif (e.g., "Canela," "Playfair Display," or "Freight Big" style) — used for hero headlines, collection names, section titles. Large size, generous letter-spacing on all-caps labels.
- **Body font:** A clean humanist sans-serif (e.g., "Neue Haas Grotesk," "Söhne," or "Inter" as substitute) — used for body copy, navigation, buttons, forms.
- **Type scale (desktop):**
  - H1 / Hero: 64–80px, serif, line-height 1.05
  - H2 / Section title: 40–48px, serif
  - H3 / Subsection: 24–28px, serif or sans, medium weight
  - Body Large: 18px, sans, line-height 1.6
  - Body: 15–16px, sans, line-height 1.6
  - Caption / Label: 11–12px, sans, uppercase, letter-spacing 0.12em
- **Mobile scale:** reduce H1 to 36–44px, H2 to 28–32px; keep body sizes constant for readability.

### 2.3 Grid & Spacing
- **Desktop grid:** 12-column, 1440px max canvas width, 80px outer margins, 24px gutters.
- **Tablet:** 8-column, 48px margins.
- **Mobile:** 4-column, 20px margins.
- **Spacing scale (8pt system):** 8, 16, 24, 32, 48, 64, 96, 128px. Whitespace is a design element — never compress sections below 64px vertical padding on desktop.

### 2.4 Imagery Style
- Full-bleed, high-resolution editorial photography — natural light, muted tones, models in motion or quiet poses, minimal retouching feel.
- No busy backgrounds. Product shots on plain ivory/stone backdrops or in architectural/interior settings.
- Consistent aspect ratios: 4:5 for portrait editorial, 1:1 for product grid, 16:9 for hero banners.

### 2.5 Components (build as a shared Figma component library first)
- Buttons: Primary (solid espresso, ivory text, uppercase label, no border-radius or 2px max), Secondary (outline, 1px hairline border), Text-link (underline on hover, letter-spaced uppercase caption style)
- Navigation bar (transparent-over-hero variant + solid-on-scroll variant)
- Mega-menu dropdown for "Shop" and "Collections"
- Product card (image, hover-swap second image, name, price, quick-view icon)
- Filter/sort sidebar and mobile filter drawer
- Breadcrumbs
- Accordion (for size guides, FAQs, product details)
- Form fields (underline-style inputs, floating labels, minimal borders)
- Modal (quick view, size guide, newsletter signup)
- Footer (multi-column)
- Toast/notification (added to bag, form submitted)
- Tag/pill (New, Bespoke, Limited)
- Star/testimonial quote block
- Icon set: thin-line icons only (bag, heart/wishlist, search, account, menu, chevron) — 1.5px stroke weight

---

## 3. SITE MAP / SCREENS TO DESIGN

Design each of the following as a distinct Figma frame, desktop (1440px) + mobile (375px) versions, unless noted otherwise.

### A. Core Pages
1. **Homepage**
   - Full-bleed hero (video-style still image, headline, one CTA "Discover the Collection")
   - Brand statement / manifesto strip (short paragraph, centered, serif)
   - "Shop by Category" — Men / Women / Custom & Bespoke (3 large image tiles)
   - Featured collection carousel (horizontal scroll, 4–5 product cards)
   - "The Atelier" teaser — image + copy linking to Bespoke/Custom page
   - Editorial lookbook strip (2–3 large lifestyle images, asymmetric layout)
   - Testimonial / press mentions (logos of publications, quiet gray, "As seen in")
   - Newsletter signup band (ivory-on-espresso inverted section)
   - Footer

2. **Shop / Collection Listing Page (PLP)**
   - Breadcrumb
   - Left sidebar filters (category, size, color, price, fabric) — desktop; bottom-sheet drawer on mobile
   - Top bar: result count, sort dropdown (Newest, Price, Popularity)
   - Product grid: 3-column desktop / 2-column tablet / 1–2 column mobile
   - Hover state showing second product image + quick-add
   - Pagination or "Load more"

3. **Product Detail Page (PDP)**
   - Image gallery (left, 60% width) — thumbnail rail + large image, zoom-on-hover
   - Right panel (40%): product name, price, short description, color swatches, size selector, size guide link, "Add to Bag," "Add to Wishlist," delivery/returns accordion, fabric & care accordion
   - "Complete the Look" cross-sell carousel
   - "You May Also Like" section
   - Sticky add-to-bag bar on mobile scroll

4. **Custom-Made Page**
   - Hero explaining the custom program (choose style + fabric + fit adjustments, faster turnaround than full bespoke)
   - "How it Works" 3–4 step process (numbered, serif numerals, icon or thin illustration each)
   - Fabric/material swatch gallery
   - Pricing/timeline note
   - CTA: "Start Your Custom Order" → inquiry form

5. **Bespoke Page** (highest luxury tier — most spacious, most editorial)
   - Full-bleed cinematic hero
   - Philosophy statement (long-form serif copy, generous line-height)
   - The Bespoke Journey — vertical timeline (Consultation → Measurement → Fabric Selection → Fittings → Delivery), each step with photography
   - Master tailor / atelier imagery and short bios
   - "Book a Consultation" CTA (form or calendar link)

6. **Inquiry / Consultation Form Page** (used by Custom + Bespoke)
   - Multi-step form: Contact info → Garment type & occasion → Fabric/style preference → Measurements/appointment preference → Review & submit
   - Progress indicator at top
   - Confirmation screen (Step 5): "Thank you" state with next-steps copy

7. **Lookbook / Editorial Page**
   - Full-width alternating image/text editorial layout, seasonal collection story
   - "Shop the Look" tags on images linking to PDPs

8. **About / Our Story Page**
   - Founder/brand history narrative
   - Craftsmanship section (materials, ateliers, sustainability/ethics if applicable)
   - Timeline of brand milestones
   - Team/artisans imagery

9. **Store Locator / Showroom Page**
   - Map + list of showroom locations
   - Each location card: address, hours, phone, "Book appointment" CTA

10. **Contact Page**
    - Simple form + direct contact details (email, phone, WhatsApp if relevant)
    - FAQ accordion

11. **Journal / Blog Listing + Article Page**
    - Grid of editorial articles (style guides, behind-the-scenes, care tips)
    - Article template: hero image, serif headline, byline, body copy in readable column width (max 680px), pull quotes, related articles

### B. Account & Transaction Flow
12. **Cart / Shopping Bag** (slide-over drawer + full page variant)
    - Line items with image, name, size, qty stepper, remove
    - Subtotal, estimated shipping note, promo code field
    - "Checkout" CTA, "Continue Shopping" link

13. **Checkout Flow** (3 steps)
    - Step 1: Shipping details
    - Step 2: Delivery method
    - Step 3: Payment (card fields, billing address, order summary sidebar sticky on desktop)
    - Order confirmation screen

14. **Account Dashboard**
    - Order history, order detail/tracking, saved addresses, payment methods, wishlist, account settings, measurements profile (for repeat custom/bespoke clients)

15. **Login / Register / Forgot Password**
    - Clean centered card form, minimal branding, social login optional

### C. Utility States
16. **Search results / empty search state**
17. **Wishlist page**
18. **404 error page** (on-brand, minimal, "Return to homepage" CTA)
19. **Newsletter confirmation / thank-you modal**

---

## 4. RESPONSIVE REQUIREMENTS
Design each core page (Home, PLP, PDP, Bespoke, Cart, Checkout) at three breakpoints:
- Desktop: 1440px
- Tablet: 768px
- Mobile: 375px

Mobile nav collapses to hamburger + slide-in menu with accordion categories. Sticky mobile bottom bar on PDP for Add to Bag.

---

## 5. ACCESSIBILITY & POLISH NOTES
- Maintain WCAG AA contrast even within the muted palette (test espresso-on-ivory ratios).
- All interactive elements need visible focus states (thin gold outline).
- Form fields need clear error/success microcopy, not just color change.
- Include a components/style-guide cover page as the first Figma frame documenting colors, type, spacing, and components before the screen designs — this is standard practice for professional handoff.

---

## 6. DELIVERABLE STRUCTURE IN FIGMA
Organize the Figma file as:
1. Cover page (project name, brand summary)
2. Style Guide / Design System page
3. Component Library page
4. Desktop Screens (pages 1–19 above, in flow order)
5. Tablet Screens (core pages only)
6. Mobile Screens (all pages)
7. Prototype flow page (linking key user journeys: Browse → PDP → Cart → Checkout; and Bespoke inquiry flow)

---

**Instruction to the AI design tool:** Generate high-fidelity, production-ready Figma frames following the above brand system exactly — do not substitute bright colors, playful illustration styles, or generic SaaS-style UI patterns. Every screen should feel like it belongs to a quiet, expensive fashion house, not a tech startup.

## Assistant



## Assistant

Before I build: this spec is ~19 screens × 3 breakpoints, which is far more than one pass. A few calls to scope it well.

Two things worth flagging now: I can't generate photography, so all editorial imagery will be toned placeholder blocks labeled with what belongs there. And I'll build this as live HTML screens, not a Figma file.

_[tool: ask_user]_

Waiting on the form — mainly which screens to hit first and how many breakpoints.

## User

Answered — first_batch: Homepage, Bespoke, Account dashboard, Lookbook / Journal, Utility states (404, empty search, wishlist); breakpoints: All three; fidelity: Fully clickable flow; nav: All screens on one canvas; fonts: Playfair Display + Inter; copy: Keep it as visible placeholder; design_system: Picked a design system (now attached)

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

Design system attached (Classical) — near-identical direction to your brief: warm ground, single gold accent, hairlines, outlined buttons. I'll use its tokens and keep your Playfair + Inter pick.

_[tool: dc_write]_

_[tool: ready_for_verification]_

Board is up — pan/zoom canvas with five rows: Homepage (D/T/M), Bespoke (D/T/M), Account (D/M), Lookbook + Journal (D/M), and utility states (404 D/M, empty search, wishlist). Frames scroll internally at real breakpoint widths. Live: mobile hamburger menu, account tab switching, wishlist × removal into the empty state, search clear.

Two notes: the attached Classical system supplies all color and spacing tokens, but I kept your Playfair + Inter pick over its Cormorant/Lora — say the word and I'll switch. Remaining screens from your list (PLP, PDP, Custom, inquiry form, cart, checkout, about, store locator, contact, login) are unbuilt — tell me the next batch.

## User

Work on the remaining screens

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

## Assistant

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Board now covers the full site map, sections 01–15 top to bottom:

Homepage, Bespoke, Account, Lookbook/Journal, then the new ones — PLP (live filters + sort), PDP (gallery, size, accordions), Custom-Made, five-step inquiry with confirmation, Cart (full page + drawer + mobile, shared live quantities), three-step Checkout with confirmation, About, Showrooms, Contact with FAQ, sign-in/register, and the utility states.

The bag count is wired across every header, so changing quantity in the cart updates the whole board. Not built: standalone Journal article template, size-guide/quick-view modals, newsletter thank-you modal, and a dedicated style-guide cover page — say which you want next.

## User

These are the Logo Designs and Brand Guidelines for Jane Deraa. Study everything comprehensively and use the knowledge on the designs

## Assistant

_[tool: read_skill_prompt]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

One page at a time works. Extracting the rest.

_[tool: run_script]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: run_script]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: view_image]_

_[tool: run_script]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: run_script]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: run_script]_

_[tool: view_image]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: delete_file]_

_[tool: ready_for_verification]_

Rebuilt the whole board on the actual brand rather than the ivory/espresso palette in the original written spec.

What I pulled from the guidelines and applied across all 15 sections: deep green #1D4429 for inverted bands and photographic grounds, gold #AF8A2F as stroke and rule only, black/grey/white for everything else; Montserrat for navigation, labels and body, Clash Display for hero lines and product names. I also lifted the main horizontal lockup out of the PDF as transparent PNGs (`assets/logo-black.png`, `assets/logo-white.png`) and it now sits in every header, footer and checkout bar.

New section 00 at the top documents the lockup on both grounds, the five-colour palette with hex values, and the two typefaces.

Two notes: the circular sub-mark crops badly out of the PDF, so I left it out — send it as a PNG or SVG and I'll add it for social/watermark use. And this now diverges from the attached Classical design system on colour and type; the brand guidelines took precedence, though the structural discipline (hairlines, outlined buttons, no filled accent) still follows it.

## User

These are the logos

## Assistant

_[tool: image_metadata]_

_[tool: image_metadata]_

_[tool: image_metadata]_

Real transparent assets — swapping in the official files and generating white versions from them.

_[tool: run_script]_

_[tool: copy_files]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Official files swapped in everywhere — every header, footer and checkout bar now uses the real horizontal lockup, with white versions generated from your transparent PNGs for the green and black grounds. Section 00 gained the vertical lockup and the sub-mark alongside it.

## User

These are the white logos

## Assistant

_[tool: copy_files]_

_[tool: snip]_

_[tool: ready_for_verification]_

Official white files replaced my generated ones — same paths, so every dark-ground placement picked them up (hero navs, brand foundations header, black lockup panel).

## User

Won't it be better for the logo to be by the left hand side instead of the center?

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Agreed — a centred lockup reads as a legacy house, and a left one gives the nav somewhere to sit.

Logo now leads every header: on desktop it sits first with the category nav beside it and account/bag pushed right; on mobile and tablet it sits immediately after the hamburger with the bag on the right. The sign-in card keeps its centred logo, since that one's a standalone panel rather than a nav bar.

## User

Found issues — fixing…

## Assistant

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

Both stragglers fixed — the homepage hero nav (its four links are now one flex row after the logo) and the checkout header. All 15 desktop headers now lead with the logo at x=80.

## User

The logo is not aligned well with the nav items on larger screens

## Assistant

_[tool: grep]_

_[tool: run_script]_

_[tool: ready_for_verification]_

Across all 15 desktop headers: gap from the lockup to the first nav item widened from 8px to 48px, logo height trimmed to 22px so its cap-height matches the 12px uppercase nav, and a 1px optical nudge to sit the wordmark on the nav's centre line.

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Added `align-self: flex-start` to the two footer lockups sitting in column flex containers — they were being stretched to the column width. Aspect ratio is correct now.

## User

See what I'm talking about

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Two fixes: 16px of separation between the hamburger and the lockup on all 16 mobile/tablet headers — they were touching — and the desktop lockup up from 22px to 28px so the "TAILORS OF MEN" line under the wordmark is legible rather than a smudge.

## User

It's not only the hamburger menu. It's shifted slightly below the nav items

## Assistant

_[tool: run_script]_

_[tool: run_script]_

_[tool: ready_for_verification]_

Measured the logo file: the wordmark band sits at 56.5% down the image, not 50% — the crown above and tagline below are lighter, so centring the box puts the wordmark low. Shifted it up ~2px on all 15 desktop headers so the wordmark centres on the nav row instead of the bounding box.

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Both fixed. Added `flex-shrink: 0` to every logo image sitting in a flex row — the vertical lockup and sub-mark in section 00 were being squeezed 4.5% narrower than their natural ratio. Mobile and tablet headers went from 16px/21px to 22px/24px so the strapline actually reads, with the same 1px optical nudge as desktop.

## User

Why is the logo slightly below the hamburger menu?

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Two causes, both fixed across 15 mobile/tablet headers. The ☰ glyph sits high inside its line box, so centring the text node put the glyph above true centre — it's now a fixed 24px flex box with `line-height: 1`. And the logo's wordmark band sits at 56.5% down the artwork, so I widened its upward nudge to 2px to match.

