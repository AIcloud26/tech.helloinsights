#!/usr/bin/env python3
import json, re
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
src=ROOT/"data/source/articles.json"
out=ROOT/"data/generated"
cats=out/"categories"; arts=out/"articles"
cats.mkdir(parents=True,exist_ok=True); arts.mkdir(parents=True,exist_ok=True)

data=json.loads(src.read_text(encoding="utf-8"))
items=data.get("articles",[])
items=sorted(items,key=lambda x:x.get("date",""),reverse=True)

def compact(a):
    return {k:v for k,v in a.items() if k not in ("content","editorNote","keyTakeaways")}

(out/"home.json").write_text(json.dumps({"articles":[compact(a) for a in items]},ensure_ascii=False,separators=(",",":")),encoding="utf-8")

groups={}
for a in items: groups.setdefault(a.get("subcategory",""),[]).append(compact(a))
for cat,arr in groups.items():
    (cats/f"{re.sub(r'[^a-z0-9_-]','_',cat)}.json").write_text(json.dumps({"category":cat,"articles":arr},ensure_ascii=False,separators=(",",":")),encoding="utf-8")

for a in items:
    related=[compact(x) for x in items if x.get("id")!=a.get("id") and x.get("subcategory")==a.get("subcategory")][:3]
    (arts/f"{re.sub(r'[^A-Za-z0-9_-]','_',str(a['id']))}.json").write_text(json.dumps({"article":a,"related":related},ensure_ascii=False,separators=(",",":")),encoding="utf-8")

print(f"Generated {len(items)} articles.")
