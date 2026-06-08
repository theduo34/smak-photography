# Smak Photography - AGENTS.md

## Project overview

Smak Photography is the website for a photography studio based in Koforidua, Ghana. It showcases the studio's work, lists service packages with pricing, and lets visitors send an enquiry or reach the studio directly by WhatsApp or phone.

Current scope is the public site. An authenticated admin dashboard for managing content comes later, so every data path is built through Convex now so the admin slots in without a rewrite.

Most visitors are on mobile and on metered data, so performance and responsiveness are not optional.

## Tech stack

- Next.js 16 (App Router), TypeScript
- Tailwind CSS v4
- shadcn/ui, Lucide React
- Motion (`motion/react`) for animation
- Lenis for smooth scroll
- Convex for data, file storage, and auth (`@convex-dev/auth`, Password provider — backs the admin dashboard)
- TanStack Query for any non-Convex data fetching
- next-themes for theming
- sonner for toasts, shadcn TooltipProvider for tooltips
- Bun as package manager and runtime
- yet-another-react-lightbox for the album lightbox

## Providers

`providers/` holds client-side context providers composed once in the root layout (`app/layout.tsx`):
`ConvexAuthNextjsServerProvider` (server) wraps `ConvexClientProvider` (Convex + auth client) wraps
`ThemeProvider` (next-themes) wraps `QueryProvider` (TanStack Query) wraps shadcn `TooltipProvider`,
with the `Toaster` mounted alongside. `proxy.ts` (the Next.js 16 successor to `middleware.ts`) wires
`convexAuthNextjsMiddleware` for session handling; route-level auth gating is added once the admin
routes exist.

## Architecture

Three top-level layers with a strict one-way dependency direction:
`app` to `components/pages` to `features` and `components/{layout,ui,shared}`. Nothing points upward.

```

  app/                  routes only
    (public)/ ...
    (admin)/            reserved, built later
  features/<domain>/    smallest broken-down parts, grouped by domain
  components/
    pages/              assemble feature parts into full page components
    layout/             SiteHeader, SiteFooter
    ui/                 shadcn primitives
    shared/             cross-page primitives (SocialLinks, SectionHeading, EmptyState)
  config/site.ts        brand constants
  lib/                  convex client, utils
  convex/               schema and queries/mutations
```

Layer rules:

- `app/*` route files do two things only: fetch data from Convex and render the assembled page. No markup, no logic. `generateMetadata` and `generateStaticParams` live here.
- `components/pages/*` assemble feature parts into a full page (HomePage, PortfolioPage, AlbumPage, ServicesPage, ContactPage). Composition only, no business logic.
- `features/<domain>/*` are presentational. Data comes in via props. A feature component never fetches data itself.
- Data fetching happens only at the route boundary, then flows down as props.

Feature folders:

- `home` - Hero, FeaturedAlbums, ServicesTeaser, AboutSnippet, BookingCTA
- `portfolio` - CategoryFilter, AlbumCard, AlbumGrid, PhotoGrid, PhotoItem, Lightbox
- `pricing` - PackageCard, PackageGrid, PriceTag, FeatureList
- `enquiry` - EnquiryDialog, EnquiryForm, WhatsAppButton, CallButton (shared by pricing and contact)
- `contact` - ContactChannels, ContactForm, MapEmbed, BusinessHours

## Data and backend

- Convex is the single source of truth for content. No hardcoded content in components.
- Until the admin dashboard exists, records are seeded manually (Convex dashboard or a seed script). Same schema, same functions, just a different way of getting data in.
- Brand constants that only a developer would change live in `config/site.ts`, not Convex: studio name, tagline, nav items, the category taxonomy, social platform list, default SEO.
- Everything the studio would plausibly change after launch lives in Convex.

## Schema

A reusable image shape is used by hero, album cover, and photos: storage ref (or url), width, height, blur, alt. Always store width, height, and blur at insert time.

- `siteSettings` (singleton): hero {image, headline, subtext}, aboutSnippet, aboutFull, phone, whatsapp, email, address, hours, mapsUrl, socials.
- `albums`: title, slug, category, description, cover (denormalized image), photoCount (denormalized), shootDate, published, featured, order. Indexes: by_slug, by_published, by_category, by_featured.
- `photos`: albumId, image, caption, order. Index: by_album (ordered).
- `packages`: name, category, price, currency (GHS), priceType (fixed | from | custom), duration, description, features[], popular, active, order. Indexes: by_active, by_category.
- `enquiries`: name, phone, email, message, packageId, packageName (snapshot), source (services | contact), status (new | contacted | booked | closed). Indexes: by_status, by_creation.

Two deliberate rules: denormalize the album cover image and photoCount so the portfolio grid renders without per-card lookups, and snapshot packageName onto enquiries so records survive a package being renamed or deleted.

## Pages

- `/` Home: hero, featured albums, services teaser, about snippet, booking CTA.
- `/portfolio`: category filter and album grid.
- `/portfolio/[slug]`: album header, photo grid, lightbox. Uses generateStaticParams over published slugs plus revalidate.
- `/services`: package cards, each opens the enquiry dialog prefilled with that package.
- `/contact`: enquiry form, WhatsApp, call, address, map.
- `/about` (optional): story, team.

## Enquiry flow

One shared `features/enquiry` is used by both Services and Contact. EnquiryDialog holds a short form that writes to Convex (`enquiries.create`) plus two instant actions: a `wa.me` WhatsApp link with prefilled text and a `tel:` call link. WhatsApp is the primary channel. On Services the dialog is prefilled with the selected package; on Contact the packageId is null.

## Styling and code rules

- Colors come only from globals.css semantic tokens. Use names like `primary`, `text-secondary`, and similar. Never hardcode hex, rgb, or OKLCH values anywhere.
- No gradients. No drop shadows.
- When a className combination repeats across several places, extract it into a named class in globals.css so a single change updates everywhere it is used.
- Layout is image-led, not a reading column. Portfolio, album, and hero sections go wide or full-bleed. Reserve a narrow column only for prose such as the about text.
- No unnecessary comments. Code should read clearly on its own. Comment only genuinely non-obvious logic.
- Use single hyphens in text, never double.

## Theming

- Light and dark, via next-themes.
- The default follows the user's system preference. A toggle lets the user override it, and the choice is persisted.
- Use one ThemeProvider configuration to avoid a hydration mismatch. The Tailwind v4 dark variant uses the class strategy.

## Images and performance

Performance is a top priority. Assume mobile and metered connections.

- Every image uses next/image with correct `sizes` and the stored blur placeholder for blur-up.
- Show a loading state for any fetched content: skeletons for layout, blur-up for images. Never leave blank space that shifts when content arrives.
- Store width and height to prevent layout shift.
- Lazy-load below-the-fold galleries.
- Keep payloads light.

## Non-negotiables

- SEO friendly: per-page metadata, semantic HTML, Open Graph tags, a sitemap, and alt text on every image.
- Fully responsive, mobile first.
- Speed and performance are the top priority.

## Context

The studio is in Koforidua, Ghana. Prices are in GHS. Phone Call and WhatsApp is the primary contact channel.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
