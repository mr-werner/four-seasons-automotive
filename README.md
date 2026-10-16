# Four Seasons Automotive — Blueprint WebStudio Concept

Independent, non-official redesign concept for https://www.fourseasonsautomotive.com/ (Lakewood, CO).
Preview: https://fsa.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Vercel project `four-seasons-automotive` (framework: Vite). The first production deploy was created from this repo's `main`. Connect the repo under Vercel → Settings → Git so later pushes to `main` deploy automatically.
Domain `fsa.blueprintwebstudio.com` is a CNAME at Porkbun pointing to the target Vercel shows for this project.

Environment variables (all optional):

| Variable | Purpose |
|---|---|
| `VITE_CONCEPT_END_DATE` | Countdown end date in the concept widget (defaults to 2026-11-15) |
| `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` | Live Google rating and review excerpts (`api/google-reviews.js`). Place ID: `ChIJx69ifwCBa4cR0x0WQF-4qUU` |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Appointment request emails (`api/contact.js`). Without them the form shows a demo message |

The "I'm Interested" form posts to `api/demo-interest.js`, which proxies to the main studio site.

## What changed from the current site

- Real Four Seasons logo (from the current site) in the header and footer; favicon cropped from its snowflake.
- Palette built from the logo: blue #3d56cc and orange #fe8e4c, with a deeper navy (#15205a, matching the shop's own promo flyers) for contrast. Saira Condensed headings echo the logo's condensed lettering; Barlow for body text.
- Signature motifs: the logo's six-armed snowflake redrawn as line art, and a four-color "season stripe" (winter, spring, summer, fall) under the hero, on service photos and above the footer.
- Hero uses the shop's tagline from its flyers ("Here for every season of your life"), the real storefront photo, hours, phone and Google rating within the first screen.
- Credentials strip with every badge from the current site: NAPA AutoCare Gold Certified, NAPA AutoCare Center, AAA Approved Auto Repair, ASA, NAPA Peace of Mind 36/36 warranty.
- Services: the six photo tiles from the current homepage plus all 16 categories from the Auto Repair page as a scannable list.
- Current offers (new-driver free safety inspection, teachers 10% off labor) moved out of an auto-rotating slider into readable cards with their fine print.
- Warranty (24/24, 36/36 with NAPA card), NAPA EasyPay financing, amenities (Wi-Fi, coffee, waiting room, shuttle within 5 mi) and payment types condensed into the "Our shop" section.
- Reviews: Google rating and link, plus the customer quotes shown on the current homepage, quoted verbatim and labelled as from the current website.
- Removed the broken template tokens ([GEOTITLE], [GEOPHONE], [GEOHOURSWEDNSDAY] …), "Twitter Not Configured", the empty "Offers & Coupons" and Rebates pages, and the store locator for a single-location shop.
- Added an online appointment request form (the current site only offers "Call for Appointment") and kept the seasonal care guide that plays on the business name.

## Before client presentation

- Confirm the Google rating and count. 4.9 / 351 is a fallback from a third-party listing on 2026-10-14; live data replaces it once the Places env vars are set.
- Reviews: the current "Read Our Reviews" page loads its reviews through a widget that the site mirror did not capture, so the concept uses the homepage quotes. Kathy Ferriola's is complete; the Damian & Jackie Wicks quote is cut off on the current site too (shown as an excerpt). A third homepage quote ("Rob from Curbside…", Joanne Conboy) was left out because it names a different business. Get full review text (or turn on the Places API) before launch.
- Confirm the email address fourseasonsinlakewood@gmail.com (decoded from the current site's protected link) and where appointment requests should go.
- Confirm the two offers are still running (new-driver inspection is marked good through the 2026–27 school year; teachers' discount up to $75) and whether the winter check-up is a paid service or a promotion.
- Confirm credentials and wording: NAPA AutoCare Gold, AAA Approved, ASA membership, NAPA Peace of Mind warranty terms and NAPA EasyPay financing.
- Photos are the shop's own storefront and front-counter photos plus the service tiles from the current site (likely stock). Higher-resolution shop and team photos would help the hero most.
- The seasonal checklists are general guidance written for the concept; have the shop review them.
- Keep the independent-concept disclaimer visible; do not imply this is the company's official site.
- The countdown is display-only, not access control. The subdomain is public to anyone with the URL.
