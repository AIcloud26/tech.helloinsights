# HelloInsights Matrix Template — Production Final

A maintainable static-content architecture for Technology, Finance, Health and future HelloInsights verticals.

## Design goals

- Fast first render
- Article pages do not download the full article corpus
- Category pages do not download the full article corpus
- Ads remain compatible with AdSense / GAM / MGID
- CMP can run before ad authorization without blocking editorial content
- One shared renderer can power multiple verticals
- Site identity, categories, editorial voice, theme and ad inventory are configuration-driven
- Static HTML is preferred for SEO; JS is enhancement, not the primary content dependency

## Recommended deployment

GitHub repository → GitHub Actions → static build → GitHub Pages or Cloudflare Pages.

The repository can be copied for each vertical. Change only:
- config/site.config.js
- config/content.config.js
- config/ads.config.js
- assets/css/theme.css
- data/

## Data flow

Source content:
`data/source/articles.json`

Build:
`python scripts/build.py`

Generated:
- `data/generated/home.json`
- `data/generated/categories/*.json`
- `data/generated/articles/*.json`
- `sitemap.xml`

Production pages:
- `/`
- `/category.html?cat=ai` (template fallback)
- `/article.html?id=...` (template fallback)

For maximum SEO, the same renderer can later emit static `/ai/index.html` and `/article/<slug>/index.html` without changing the content schema.

## Advertising

Do not put ad SDKs in the critical rendering path.

The ad loader:
1. waits for DOM readiness;
2. waits for consent/CMP when a consent hook exists;
3. checks whether a real network/client/slot is configured;
4. loads the required SDK once;
5. initializes only active slots;
6. leaves disabled/empty slots collapsed.

This does not disable ads. It avoids paying the performance cost for ads that are not actually configured.

## Matrix rule

Do not fork business logic between verticals.

Shared:
- renderer
- data builder
- image helper
- ad loader
- SEO helper
- navigation
- performance utilities

Per vertical:
- site config
- categories
- editorial copy
- theme variables
- ad slots
- source data
