# Digital Marketing with Sid

A production-ready digital marketing agency website engineered for high commercial conversion, sub-second Core Web Vitals, accessible interactions, and real-time 3D experiences.

## Core Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Runtime:** React 19
- **Type Safety:** TypeScript 5.8 (Strict Mode enabled)
- **Styling:** Tailwind CSS v4 using `@tailwindcss/postcss` with centralized `@theme` design tokens
- **3D Engine:** Three.js 0.174 + React Three Fiber 9 + `@react-three/drei` with tiered fallbacks
- **Motion & Smooth Scroll:** Lenis 1.1 + GSAP 3.12 (ScrollTrigger)
- **Icons:** Lucide React
- **Forms & Validation:** React Hook Form + Zod
- **Typography:** `next/font/google` (Space Grotesk, Manrope, IBM Plex Mono)

---

## Route Architecture

| Route | Description |
|---|---|
| `/` | Homepage with 8-stage conversion journey & 3D hero engine |
| `/services` | Capabilities index & deliverable comparison |
| `/services/website-development` | Next.js & TypeScript web engineering service |
| `/services/social-media-marketing` | Authority content & editorial systems |
| `/services/performance-marketing` | Meta & Google paid acquisition with CAPI attribution |
| `/services/seo` | Technical audits, intent architecture & schema |
| `/services/branding-graphic-design` | Visual identities & design token systems |
| `/work` | Filterable case study portfolio |
| `/work/[slug]` | Dynamic deep-dive case study breakdowns |
| `/about` | Mission, engineering philosophy, and values |
| `/blog` | Growth intelligence & technical article index |
| `/blog/[slug]` | In-depth technical articles with Table of Contents |
| `/contact` | Strategic consultation booking form & coordinates |
| `/privacy-policy` | Data protection and non-disclosure commitments |
| `/terms` | Commercial terms & 100% code ownership |
| `/api/contact` | Zod-validated, rate-limited inquiry endpoint |
| `/api/newsletter` | Email subscription intake endpoint |

---

## Environment Variables Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### Supported Variables:

```env
# Production domain URL for canonical links, sitemaps, and OpenGraph
NEXT_PUBLIC_SITE_URL=https://digitalmarketingwithsid.com

# Agency notification email for contact inquiries
CONTACT_EMAIL=Siddhantshukla108@gmail.com

# Optional Email Provider API Key (e.g., Resend api key starting with re_)
# When left empty, inquiries will be logged server-side in mock development mode
EMAIL_PROVIDER_API_KEY=

# Agency WhatsApp number in international format (without '+' or spaces)
WHATSAPP_NUMBER=918447886310

# Optional Web Analytics ID (e.g. Google Analytics / Plausible)
ANALYTICS_ID=
```

---

## Scripts

```bash
# Start local development server with Turbopack
npm run dev

# Run TypeScript strict type verification
npm run typecheck

# Run ESLint validation
npm run lint

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 3D Quality Tier Architecture

The hero 3D experience adapts dynamically to client hardware using `useQualityTier`:

- **Tier 0:** WebGL disabled or `prefers-reduced-motion` enabled. Renders high-craft HTML/SVG dimensional code dashboard (`SceneFallback.tsx`).
- **Tier 1:** Mobile devices or low-memory systems. Renders simplified R3F scene with capped pixel ratio.
- **Tier 2:** High-performance desktops. Full Three.js canvas with ambient lighting, procedural geometry, and dynamic graph columns.

---

## Production Deployment

This application is ready for zero-config deployment on Vercel:

1. Push repository to GitHub/GitLab.
2. Import project into Vercel.
3. Configure environment variables (`NEXT_PUBLIC_SITE_URL`, `CONTACT_EMAIL`, `WHATSAPP_NUMBER`, `EMAIL_PROVIDER_API_KEY`).
4. Trigger production build.
