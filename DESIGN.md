---
name: Digital Marketing with Sid
description: The Kinetic Digital Lab design system combining editorial typography, obsidian dark surfaces, and high-voltage accents.
colors:
  primary: "#7657FF"
  secondary: "#B8A7FF"
  highlight: "#D9FF70"
  dark: "#111318"
  dark-surface: "#181A20"
  dark-border: "#303139"
  bg-base: "#F7F6F2"
  surface: "#FFFFFF"
  border: "#E5E4E0"
  text-primary: "#17181C"
  text-secondary: "#686B73"
  text-muted: "#8E9199"
typography:
  display:
    fontFamily: "Space Grotesk, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Space Grotesk, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Space Grotesk, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#6242EC"
  button-lime:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.dark}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-dark:
    backgroundColor: "{colors.dark}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  card-default:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "24px"
  card-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "#FFFFFF"
    rounded: "{rounded.xl}"
    padding: "24px"
  input-field:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: Digital Marketing with Sid

## Overview

**Creative North Star: "The Kinetic Digital Lab"**

The Kinetic Digital Lab is an engineered design environment engineered for high-growth commercial impact. The visual language marries the tactile authority of an editorial broadsheet with the surgical responsiveness of a modern digital operations console. Clean architectural structures balance two distinct canvases: an obsidian dark void (`#111318`) engineered for immersion, showcase hero moments, and administrator tooling, alongside a warm cream background (`#F7F6F2`) calibrated for daylight readability, editorial credibility, and long-form retention.

The atmosphere is sophisticated, calculated, and architectural. Rather than relying on generic corporate stock visuals or trendy gradient blobs, the system projects quiet authority through tight typographic geometry, micro-spaced monospace metadata badges, and high-frequency electric accents (`#7657FF` Editorial Indigo and `#D9FF70` Neon Citrus) that only ignite to signify active states, conversion pathways, and confirmed performance metrics.

**Key Characteristics:**
- **Calculated Dual Canvas:** High-contrast interplay between obsidian dark modules and warm tactile paper foundations.
- **Architectural Typography:** Expressive geometric display headings paired with high-legibility sans body and industrial monospace indicators.
- **Sculpted Tonal Layering:** Interfaces remain flat and calm at rest, igniting diffuse radiant ambient glows strictly upon interaction.
- **Engineering Rigor:** Hairline precision dividers, sub-second responsive physics, and zero decorative noise.

## Colors

The palette balances warm organic neutrality with deep mineral darks and unexpected fluorescent digital surges.

### Primary
- **Editorial Indigo** (`#7657FF`): The foundational brand anchor. Deployed on primary interactive calls-to-action, section focus rings, active indicator badges, and brand identity signatures.
- **Indigo Hover Shift** (`#6242EC`): The compressed active state for primary interactions.

### Secondary
- **Lavender Glow** (`#B8A7FF`): Soft atmospheric companion to Editorial Indigo. Used for secondary gradient stops, subtle badge fills, and ambient backlight halos.

### Tertiary
- **Neon Citrus** (`#D9FF70`): High-voltage electric highlight. Reserved exclusively for high-value conversion signals, primary metrics, pill badges, and decisive secondary actions.

### Neutral
- **Obsidian Void** (`#111318`): Deep mineral dark ground. The normative canvas for the hero canvas, admin navigation, dark cards, and high-contrast callouts.
- **Deep Slate Surface** (`#181A20`): Tonal elevated card fill on dark canvases.
- **Hairline Dark Border** (`#303139`): Structural 1px boundary dividing dark containers and interactive admin rows.
- **Warm Paper** (`#F7F6F2`): Normative public body canvas providing tactile editorial warmth without optical glare.
- **Pure White Surface** (`#FFFFFF`): Elevated card and form container ground on light pages.
- **Warm Cream Border** (`#E5E4E0`): Hairline boundary framing light containers and subtle dividers.
- **Carbon Black** (`#17181C`): Highest-contrast primary text on light canvases and button labels.
- **Muted Graphite** (`#686B73`): Informational secondary body text and supporting descriptions.
- **Cool Slate** (`#8E9199`): Tertiary metadata, timestamps, and placeholder copy.

### Named Rules
**The Dual-Canvas Rule.** Dark obsidian surfaces (`#111318`) and warm paper surfaces (`#F7F6F2`) may co-exist across the page flow, but individual components must strictly adhere to their native container's tonal contract. Dark cards live on dark or neutral canvases; light cards live on light canvases. Never mix dark text on dark surfaces or inverted borders without explicit contrast verification.

**The 10% High-Voltage Rule.** Neon Citrus (`#D9FF70`) is a precision surgical instrument, never a wallpaper. It must occupy no more than 10% of any given viewport, strictly reserved for key conversion buttons, high-impact statistics, or live status pills.

## Typography

**Display Font:** Space Grotesk (with fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
**Body Font:** Manrope (with fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
**Label/Mono Font:** IBM Plex Mono (with fallback: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`)

**Character:** A deliberate synthesis of geometric display architecture and humanistic editorial flow. Space Grotesk lends bold technical intentionality to titles, Manrope ensures effortless long-form scanning, and IBM Plex Mono roots section intros in scientific data culture.

### Hierarchy
- **Display** (700 weight, `clamp(2rem, 5vw, 3.5rem)`, line-height 1.1, tracking `-0.03em`): Hero page headlines, major section anchors, and flagship agency statements.
- **Headline** (700 weight, `clamp(1.5rem, 3vw, 2.25rem)`, line-height 1.2, tracking `-0.02em`): Section headings, modal titles, and case study hero banners.
- **Title** (600 weight, `1.25rem` / 20px, line-height 1.3, tracking `-0.01em`): Card titles, service names, and feature callouts.
- **Body** (400 weight, `1rem` / 16px, line-height 1.65, tracking `normal`): General body copy, descriptions, and article text. Max line length constrained to `65ch–75ch`.
- **Label** (600 weight, `0.75rem` / 12px, line-height 1.4, tracking `0.12em`, uppercase): Eyebrows, module tags, category pills, status indicators, and form field headers.

### Named Rules
**The Monospace Eyebrow Rule.** Every major section title and feature block must be introduced by an uppercase IBM Plex Mono eyebrow tag (e.g. `// 01 / SERVICES`, `// ADMIN / CONSOLE`). This establishes instant structural context and technical discipline.

## Layout

The spatial model relies on a responsive fluid container (`max-width: 1320px`, horizontal padding `clamp(1rem, 4vw, 2.5rem)`). Grid layouts leverage 12-column responsive frameworks:
- **Mobile (<640px):** Single-column stack, compact vertical rhythm (16px–24px gaps).
- **Tablet (640px–1024px):** 2-column service card and feature matrices.
- **Desktop (1024px+):** 3-column service catalog grids, asymmetrical hero splits (7/5 proportion), and sticky admin side-panels.

Vertical rhythm follows a 4px base unit, scaling through standard intervals (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`). Section vertical padding maintains generous breathability (`clamp(4rem, 8vw, 8rem)`).

## Elevation & Depth

The system rejects artificial skeuomorphic drop-shadows and multi-tiered z-axis stacking. Depth is achieved primarily through tonal layering and hairline structural strokes (`1px solid #303139` on dark, `1px solid #E5E4E0` on light). Surfaces remain flat and disciplined at rest; shadows appear strictly as luminous radiant halos in response to state transitions.

### Shadow Vocabulary
- **Resting Flat** (`none` or `0 1px 2px rgba(0,0,0,0.05)`): Default baseline for cards, inputs, and containers.
- **Primary Ambient Glow** (`0 4px 16px rgba(118, 87, 255, 0.25)`): Applied to primary Indigo buttons and focused cards on hover.
- **Lime High-Voltage Glow** (`0 4px 16px rgba(217, 255, 112, 0.30)`): Applied to Neon Citrus buttons to enhance visual vibrancy.
- **Interactive Card Lift** (`0 12px 32px rgba(118, 87, 255, 0.08)`): Diffuse atmospheric rise applied to interactive public service cards upon hover.

### Named Rules
**The Flat-At-Rest Rule.** Surfaces and cards are completely flat at rest, bounded purely by 1px hairline borders. Elevation manifests solely as a reactive state (hover, focus, or modal overlay).

## Shapes

- **Buttons & Tags:** Fully rounded pill silhouette (`border-radius: 9999px`) creating distinct, click-inviting targets.
- **Cards & Modals:** Soft modern corners (`border-radius: 24px` / `rounded-2xl` on public cards, `border-radius: 16px` / `rounded-xl` on admin containers).
- **Inputs & Form Controls:** Balanced corner radius (`border-radius: 12px` / `rounded-xl` with `1px` crisp hairline borders).
- **Borders:** Constant 1px thickness; borders never expand or shift element geometry on focus or hover.

## Components

### Buttons
- **Shape:** Pill silhouette (`border-radius: 9999px`), inline-flex alignment, display font.
- **Primary:** Editorial Indigo background (`#7657FF`), white text (`#FFFFFF`), `12px 24px` padding (`h-11`). On hover, transitions to `#6242EC` with `0 4px 16px rgba(118,87,255,0.25)` shadow.
- **Lime Accent:** Neon Citrus background (`#D9FF70`), obsidian dark text (`#111318`), bold 600 weight. On hover, shifts to `#C8F552` with radiant lime glow.
- **Dark / Inverted:** Obsidian dark background (`#111318`), white text, hairline `#303139` border. On hover, shifts to `#1F2128`.
- **Secondary / Ghost:** Transparent background, carbon text (`#17181C`), 1px border. Hover introduces subtle fill (`rgba(23,24,28,0.05)`).

### Cards / Containers
- **Public Service Card:** White surface (`#FFFFFF`) or dark slate (`#181A20`), `24px` rounded corners, `24px–32px` internal padding. Features top module badge, bold title, aspect-ratio calibrated media frame, and interactive hover lift.
- **Admin Record Card:** Dark slate surface (`#181A20`), `16px` rounded corners, `1px solid #303139` border, flex row layout with status pill, thumbnail preview, metadata, and quick action toolbar.

### Inputs / Form Fields
- **Light Input:** White background (`#FFFFFF`), `1px solid #E5E4E0` border, `12px` corner radius, `12px 16px` padding. Focus shifts border to `#7657FF` with `1px` ring glow.
- **Dark / Admin Input:** Deep slate background (`#1F2128`), `1px solid #303139` border, white text (`#FFFFFF`). Focus shifts border to `#7657FF`.

### Status Badges & Pills
- **Published:** Green emerald fill (`rgba(16, 185, 129, 0.1)`), emerald text (`#10B981`), `1px solid rgba(16, 185, 129, 0.2)` border.
- **Draft:** Amber fill (`rgba(245, 158, 11, 0.1)`), amber text (`#F59E0B`), `1px solid rgba(245, 158, 11, 0.2)` border.
- **Module Eyebrow:** Monospace pill (`#7657FF` or `#D9FF70`), uppercase with `0.12em` tracking.

## Do's and Don'ts

### Do:
- **Do** wrap all section headings with an uppercase monospace eyebrow tag (`IBM Plex Mono`).
- **Do** enforce `border-radius: 9999px` (pill) on all interactive buttons and chip toggles.
- **Do** preserve 1px hairline borders (`#303139` or `#E5E4E0`) around cards and container boundaries.
- **Do** limit Neon Citrus (`#D9FF70`) to high-priority conversion signals and stat callouts.
- **Do** ensure all interactive elements display visible focus outlines (`2px solid #7657FF`, `outline-offset: 3px`).

### Don't:
- **Don't** use generic unbranded blue (`#0000FF`) or plain red/green without system-aligned hex values.
- **Don't** add heavy drop-shadows to resting cards; maintain flat-at-rest discipline.
- **Don't** use pastel blob illustrations or stock SaaS vector art.
- **Don't** mix low-contrast gray text on dark backgrounds; maintain minimum WCAG AA contrast (4.5:1).
- **Don't** alter button border thickness on focus (prevents layout reflow).
