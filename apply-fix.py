#!/usr/bin/env python3
from pathlib import Path
import re, shutil

ROOT = Path(__file__).resolve().parent.parent

# 1) GitHub Pages does not use Cloudflare Pages _redirects.
redirects = ROOT / "_redirects"
if redirects.exists():
    redirects.unlink()
    print("Removed _redirects")

# 2) Fix the site configuration used by the current homepage.
src = Path(__file__).resolve().parent / "site-config.js"
shutil.copy2(src, ROOT / "site-config.js")
print("Updated site-config.js")

# 3) Change homepage navigation from query-string categories to real directories.
index = ROOT / "index.html"
if index.exists():
    text = index.read_text(encoding="utf-8")
    replacements = {
        'href="index.html?cat=ai"': 'href="/ai/"',
        'href="index.html?cat=software"': 'href="/software/"',
        'href="index.html?cat=cybersecurity"': 'href="/cybersecurity/"',
        'href="index.html?cat=gadgets"': 'href="/gadgets/"',
        'href="index.html?cat=developer"': 'href="/developer/"',
        'href="index.html?cat=future-tech"': 'href="/future-tech/"',
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    index.write_text(text, encoding="utf-8")
    print("Updated homepage category navigation")

# 4) Copy static category pages.
for cid in ["ai","software","cybersecurity","gadgets","developer","future-tech"]:
    src_dir = Path(__file__).resolve().parent / cid
    dst_dir = ROOT / cid
    dst_dir.mkdir(exist_ok=True)
    shutil.copy2(src_dir / "index.html", dst_dir / "index.html")
    print("Installed", cid + "/index.html")

print("\\nDone. Commit the changes and let GitHub Pages deploy.")
