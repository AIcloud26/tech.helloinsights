# Matrix Maintenance Rules

## Never edit generated files

Do not manually edit:
`data/generated/**`

Edit:
`data/source/articles.json`

Then run:
`python scripts/build.py`

## Add a new vertical

Copy the repository/template.

Change:
1. `config/site.config.js`
2. `config/content.config.js`
3. `config/ads.config.js`
4. `assets/css/theme.css`
5. `data/source/articles.json`

Do not fork:
- `assets/js/core.js`
- `assets/js/ads.js`
- `assets/js/home.js`
- `assets/js/category.js`
- `assets/js/article.js`
- `scripts/build.py`

Only fork shared code when a real product requirement differs.

## Article content standard

Recommended article fields:

- id
- title
- excerpt
- category
- subcategory
- date
- image
- featured
- keyTakeaways
- content
- editorNote
- author
- updatedAt

The renderer accepts normal HTML in `content` so existing content can migrate without rewriting every article. Future versions can move to structured block JSON without changing the page shell.

## Performance rules

1. Do not load the full article corpus on article pages.
2. Do not load the full article corpus on category pages.
3. Keep third-party scripts out of the critical path unless legally/technically required.
4. Hero image: eager + fetchpriority high.
5. Below-fold images: lazy.
6. Always specify intrinsic image dimensions.
7. Avoid duplicate image requests.
8. Keep ad reserves modest and only activate configured slots.
9. Never load an ad SDK twice.
10. Keep CSS and shared JS cacheable.

## Advertising rule

Advertising is not removed.

The architecture separates:
- editorial rendering
- consent
- ad SDK loading
- ad slot activation

This allows AdSense, GAM or MGID to be turned on per slot without rewriting page logic.

## SEO rule

For the current template, canonical URLs remain stable while query-string templates are used for compatibility.

Phase 2 should generate static:
- `/ai/index.html`
- `/software/index.html`
- `/article/<slug>/index.html`

The same data and renderer can be used for both.
