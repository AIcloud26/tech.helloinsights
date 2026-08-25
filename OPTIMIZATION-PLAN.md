# Senior PM + Senior Engineering Optimization Plan

## P0 — Fix data loading

### Current
- Home requests `technology-index.json`.
- Article requests:
  - `technology-index.json`
  - `articles-technology.json`
  - `opinions.json`
- Category requests the full technology index and filters in the browser.

### Target
- Home → `data/technology-home.json`
- Category → `data/categories/<id>.json`
- Article → `data/articles/<id>.json`

This removes unnecessary transfer and JSON parsing from the critical path.

## P0 — Fix SEO URL architecture

Use:

- `/`
- `/ai/`
- `/software/`
- `/cybersecurity/`
- `/gadgets/`
- `/developer/`
- `/future-tech/`
- `/article.html?id=<id>` initially, or migrate to `/article/<slug>/` when static article generation is introduced.

The current homepage still uses query-string category links such as `index.html?cat=ai`, while the category template already expects directory-style paths. This should be unified.

## P0 — Ad loading

Do not load third-party ad SDKs when:
- the slot is disabled;
- the site has placeholder IDs;
- the current page does not contain an eligible slot.

Do not reserve a giant blank ad area before fill. Use a modest minimum reserve only for known high-value slots.

## P1 — Image system

Recommended source image rules:

- hero desktop: 1200×675
- hero mobile: 800×450
- featured card: 800×450
- list card: 480×270
- category card: 480×270
- related card: 480×270

Always include:
- width
- height
- loading
- decoding
- meaningful alt text

Avoid requesting `1200px` images for 320–400px mobile cards.

## P1 — Rendering

Keep JS external:
- `js/home.js`
- `js/category.js`
- `js/article.js`

This makes caching possible and keeps HTML smaller.

## P1 — Editorial UX

The current hero is visually strong but should not dominate the first viewport. Target:
- desktop: 300–360px
- mobile: 260–320px

Move users into content quickly:
Hero → editorial point of view → featured → latest.

## P2 — Static generation

The next step is to generate:
- static category pages;
- static article pages;
- sitemap entries;
- WebSite / CollectionPage / Article JSON-LD.

That would reduce client-side rendering dependency and improve crawlability further.

## Acceptance criteria

### Performance
- No full article corpus on article/category critical path.
- No unnecessary third-party SDK before first content.
- Images have intrinsic dimensions.
- No obvious CLS caused by cards or ads.

### SEO
- One canonical URL per page.
- Category pages are indexable.
- Article pages expose Article JSON-LD.
- Sitemap contains only canonical URLs.

### UX
- Mobile menu works with keyboard/touch.
- Search is usable on desktop and mobile.
- First content appears without waiting for ads.
- No layout jump when ad slots fail to fill.
