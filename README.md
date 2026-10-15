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

- Removed the broken template tokens shown on the live site ([GEOTITLE], [GEOPHONE], [GEOHOURSWEDNSDAY] …) and the "Twitter Not Configured" footer text.
- Added an online appointment request form (the current site only offers "Call for Appointment").
- Mobile-first responsive layout with hours, address and the Google rating up front.
- New seasonal care guide that plays on the business name.

## Before client presentation

- Confirm the Google rating and count. 4.9 / 351 is a fallback from a third-party listing on 2026-10-14; live data replaces it once the Places env vars are set.
- Confirm credentials and wording: NAPA AutoCare Center, NAPA Peace of Mind Warranty (terms), AAA Approved, ASA member.
- Confirm the services list (especially "Tires" and "Seasonal Check-ups") and the process copy ("you approve all work before it starts").
- Add the shop's email (the current site hides it behind Cloudflare) and decide where appointment requests go.
- Replace the CSS wordmark with the shop's real logo, and add real shop photos with permission.
- The seasonal checklists are general guidance written for the concept; have the shop review them.
- Keep the independent-concept disclaimer visible; do not imply this is the company's official site.
- The countdown is display-only, not access control. The subdomain is public to anyone with the URL.
