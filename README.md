# GitHub Pages Category Route Fix

This patch removes the Cloudflare Pages `_redirects` approach and uses real static directories:

- `/ai/`
- `/software/`
- `/cybersecurity/`
- `/gadgets/`
- `/developer/`
- `/future-tech/`

Each directory contains its own `index.html`, so GitHub Pages can serve the route as a real static page.

## Apply

1. Copy the `github-pages-category-fix` folder into the repository root.
2. Run:

```bash
python apply-fix.py
```

3. Check:

```bash
git status
```

4. Commit and push:

```bash
git add .
git commit -m "fix: use real GitHub Pages category directories"
git push origin main
```

## Important

Do not restore `_redirects`.

The category pages use `../style.css`, `../site-config.js`, `../technology-index.json`, and `../article.html`, so they work both on the custom domain and when previewed under a GitHub Pages project path.
