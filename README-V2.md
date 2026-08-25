# HelloInsights Technology V2

This package upgrades article delivery to static, crawlable article pages.

## Key changes
- Static `/articles/<slug>/index.html` pages generated from `articles-technology.json`
- Article body is present in page HTML instead of depending on client-side fetch for the primary content
- Canonical URLs and NewsArticle JSON-LD added
- Sitemap regenerated for all generated articles
- Editorial content specification added under `content-engine/`
- `build-technology.js` added for repeatable article-page generation

## Build
Run:

```bash
node build-technology.js
```

Then deploy the repository to the existing GitHub Pages / Cloudflare Pages setup.

## Content quality
Use `content-engine/EDITORIAL_SPEC_V2.md` as the editorial generation and review standard. It is intentionally evidence-first and avoids repetitive AI-style templates.
