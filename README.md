# HelloInsights Technology — Optimization Pack FINAL v2

Target: `https://aicloud26.github.io/tech.helloinsights/`

This package is a production-oriented optimization layer for the current Technology subsite. It keeps the existing vanilla HTML/CSS/JS approach and GitHub Pages deployment model, but changes the data-loading architecture, image loading, SEO URL handling, ad loading, and page rendering.

## Main changes

1. **Stop loading the full article corpus on every page**
   - Home: `data/technology-home.json`
   - Category: `data/categories/<category>.json`
   - Article: `data/articles/<id>.json`
   - Build script generates these files from the existing `articles-technology.json` and `technology-index.json`.

2. **Article page loads only one article**
   - Current implementation requests the index, full article JSON and opinions JSON in parallel.
   - New implementation identifies the article first, then requests only its article payload.

3. **Images**
   - `loading="lazy"` for below-the-fold images.
   - `fetchpriority="high"` only for the first/hero image.
   - Fixed `width` / `height` or aspect-ratio containers to reduce CLS.
   - Image URLs are normalized to reasonable widths instead of requesting oversized assets.

4. **SEO**
   - Category URLs use `/ai/`, `/software/`, etc.
   - Canonical URLs are generated consistently.
   - Article and category JSON-LD are updated at runtime.
   - `robots.txt`, sitemap and redirects are preserved as separate deployment concerns.

5. **Ads**
   - Ad network scripts are loaded only when an active slot actually needs them.
   - No placeholder AdSense client means no AdSense SDK request.
   - Empty ad containers are collapsed without causing large layout jumps.

6. **UX**
   - Smaller hero.
   - Faster first contentful paint.
   - More compact cards.
   - Mobile navigation is accessible.
   - Search no longer needs to download the full article body dataset.

## Install

Copy the files in this package over the matching files in the repository.

Then run:

```bash
python scripts/build-tech-data.py
```

Commit the generated `data/` directory.

If you use GitHub Actions, the supplied workflow can regenerate the data after content changes.

## Important

The existing article source remains the source of truth. Do not delete `articles-technology.json` until you have verified that the build script is generating the new per-article files correctly.

Replace the AdSense/MGID placeholders in `ads-config.js` only after your real IDs are available.

## Expected impact

The largest improvement is architectural: category and article pages stop downloading data they do not need. The current live implementation loads the technology index on the home page, and the current article implementation additionally requests the full article dataset and opinions dataset in parallel. The new build splits those payloads by page purpose.

This package does not claim a guaranteed Lighthouse score because actual performance depends on image origins, ad fill, network conditions and the final generated data size.


## FINAL v2 path compatibility

This revision fixes the GitHub Pages project-path issue that can make the CSS/JS appear missing when the repository is served from `/tech.helloinsights/` rather than the domain root. Asset and navigation paths are now project-path aware. The original data source JSON files are intentionally not replaced; the build workflow generates the lightweight `data/` payloads from the repository source data.
