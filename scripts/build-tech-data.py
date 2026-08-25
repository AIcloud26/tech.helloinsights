#!/usr/bin/env python3
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data"
INDEX = ROOT / "technology-index.json"
FULL = ROOT / "articles-technology.json"
OPINIONS = ROOT / "opinions.json"

def load(path):
    if not path.exists():
        return {"articles":[]}
    return json.loads(path.read_text(encoding="utf-8"))

index = load(INDEX)
full = load(FULL)
opinions = load(OPINIONS)

index_articles = index.get("articles", [])
full_articles = full.get("articles", [])
op_map = {str(x.get("id")): x for x in opinions.get("articles", [])}

# Index is the source for card metadata; full dataset is the source for body content.
full_map = {str(x.get("id")): x for x in full_articles}

OUT.mkdir(exist_ok=True)
(OUT / "categories").mkdir(exist_ok=True)
(OUT / "articles").mkdir(exist_ok=True)

def clean_id(value):
    return re.sub(r"[^A-Za-z0-9_-]", "_", str(value))

def article_payload(card):
    full_item = full_map.get(str(card.get("id")), {})
    payload = dict(card)
    for key in ("content", "editorNote"):
        if key in full_item:
            payload[key] = full_item[key]
    op = op_map.get(str(card.get("id")))
    if op and op.get("note"):
        payload["editorNote"] = op["note"]
    return payload

articles = [article_payload(a) for a in index_articles]

# Home only needs a compact working set.
home = sorted(
    [
        {k:v for k,v in a.items() if k not in ("content", "editorNote")}
        for a in articles
    ],
    key=lambda x: x.get("date",""),
    reverse=True
)
(OUT / "technology-home.json").write_text(
    json.dumps({"articles": home}, ensure_ascii=False, separators=(",",":")),
    encoding="utf-8"
)

cats = {}
for a in home:
    cats.setdefault(a.get("subcategory",""), []).append(a)

for cat, items in cats.items():
    (OUT/"categories"/f"{clean_id(cat)}.json").write_text(
        json.dumps({"category":cat,"articles":items}, ensure_ascii=False, separators=(",",":")),
        encoding="utf-8"
    )

for a in articles:
    aid = clean_id(a.get("id"))
    related = [
        x for x in home
        if str(x.get("id")) != str(a.get("id"))
        and x.get("subcategory") == a.get("subcategory")
    ][:3]
    (OUT/"articles"/f"{aid}.json").write_text(
        json.dumps({"article":a,"related":related}, ensure_ascii=False, separators=(",",":")),
        encoding="utf-8"
    )

print(f"Generated {len(articles)} article payloads and {len(cats)} category payloads.")
