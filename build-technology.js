import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataPath = path.join(root, 'articles-technology.json');
const outRoot = path.join(root, 'articles');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const articles = Array.isArray(data) ? data : (data.articles || []);

const slugify = (value) => String(value || '')
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 100) || 'article';

const esc = (value) => String(value ?? '')
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;');

for (const article of articles) {
  const title = article.title || article.headline || 'Untitled';
  const slug = article.slug || slugify(title);
  const summary = article.summary || article.excerpt || article.description || '';
  const content = article.content || article.body || '<p>Content unavailable.</p>';
  const dir = path.join(outRoot, slug);
  fs.mkdirSync(dir, { recursive: true });

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: String(summary).slice(0, 160),
    datePublished: article.date || article.publishedAt || article.published_at || undefined,
    author: { '@type': 'Organization', name: article.author || 'HelloInsights Technology Desk' },
    publisher: { '@type': 'Organization', name: 'HelloInsights' }
  });

  const html = `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} | HelloInsights Technology</title>
<meta name="description" content="${esc(String(summary).slice(0,160))}">
<link rel="canonical" href="https://technology.helloinsights.online/articles/${slug}/">
<script type="application/ld+json">${jsonLd}</script>
</head><body>
<main><article>
<header><div>${esc(article.category || 'Technology')}</div><h1>${esc(title)}</h1>
${summary ? `<p>${esc(summary)}</p>` : ''}
<div>${esc(article.author || 'HelloInsights Technology Desk')}${article.date ? ` · ${esc(article.date)}` : ''}</div>
</header>
${article.image ? `<img src="${esc(article.image)}" alt="${esc(title)}">` : ''}
<section class="article-body">${content}</section>
</article></main>
</body></html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html);
}
console.log(`Generated ${articles.length} static technology articles.`);
