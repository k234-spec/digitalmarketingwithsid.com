# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Public Audience:** Ambitious business founders, marketing directors, and growth leads across B2B, Manufacturing, E-commerce, Professional Services, and Tech/SaaS seeking high-performing web platforms and data-driven marketing systems.
- **Internal Operators:** Content managers and agency administrators who need to manage, publish, update, and reorder public-facing service offerings quickly without touching frontend code.

## Product Purpose

Provide an authoritative digital marketing agency platform that converts visitor traffic into qualified client inquiries, backed by an intuitive, secure administrator dashboard for dynamic service catalog management.

## Positioning

"Engineering Precision + Data-Driven Growth": Bridging high-performance custom web development (sub-second load times, accessible design, modern typography) with commercial marketing systems focused on verified conversions and business pipeline rather than vanity metrics.

## Operating Context

- Public web interface viewed on modern desktop and mobile browsers, delivering interactive service overviews, case studies, and contact inquiry funnels.
- Authenticated admin dashboard (`/admin/services`) accessed by internal team members for service authoring, status toggles (Draft vs. Published), image asset uploads, and catalog reordering.

## Capabilities and Constraints

- **Architecture:** Next.js 15 App Router, React 19, Tailwind CSS v4, Lucide icons, Three.js / Drei / GSAP canvas interactions.
- **Service Management:** Relational/file-backed database layer with Prisma schema ready for PostgreSQL, Zod validation schemas, and soft-delete capabilities.
- **Media Pipeline:** Secure multipart image upload handling with MIME and magic-byte inspection, size limits (<= 5MB), and local/cloud storage abstraction.
- **Security:** HMAC-SHA256 signed session cookie authentication, strict server-side authorization guards, and sanitized error boundaries.

## Brand Commitments

- **Name:** Digital Marketing with Sid (Digital Growth Studio).
- **Tagline:** "Turn Your Digital Presence Into Business Growth."
- **Aesthetic Palette:** Dark surface `#111318` / `#181A20`, light background `#F7F6F2`, primary accent `#7657FF`, secondary accent `#B8A7FF`, electric highlight `#D9FF70`, subtle dark borders `#303139`.
- **Typography:** Space Grotesk (display), Manrope (body), IBM Plex Mono (eyebrows & labels).
- **Voice:** Direct, authoritative, commercial, and engineering-grounded.

## Evidence on Hand

- Active codebase with working components, interactive Three.js 3D hero canvas, Lenis smooth scroll, dynamic Services Grid, and complete `/admin/services` dashboard.
- Initial curated database seed records in `src/data/services.db.json` and relational schema in `prisma/schema.prisma`.
- 18-point automated integration test suite in `scripts/test-services-module.mjs`.

## Product Principles

1. **Truth in Data:** Prioritize verified business conversions and clear metrics over superficial vanity numbers.
2. **Sub-second Speed & Craft:** Never sacrifice performance or responsiveness for visual flair; maintain sub-second load times and accessible contrast.
3. **Zero Code for Content:** Content operators must have complete autonomy to create, edit, reorder, and publish services dynamically without frontend developer intervention.
4. **Resilient Security & State:** All mutations are validated and guarded on the server; public visitors never see unvetted drafts or soft-deleted records.

## Accessibility & Inclusion

- WCAG AA compliant contrast ratios across dark and light surfaces.
- Semantic HTML5 structure with keyboard navigation (`focus-visible` styling), prefers-reduced-motion overrides, and meaningful image alt descriptions.
