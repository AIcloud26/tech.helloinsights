window.CONTENT_CONFIG = {
  source: "data/source/articles.json",
  generatedHome: "data/generated/home.json",
  generatedCategoryDir: "data/generated/categories/",
  generatedArticleDir: "data/generated/articles/",

  // Keep the schema stable across every HelloInsights vertical.
  schemaVersion: 1,

  article: {
    defaultReadingSpeed: 220,
    relatedCount: 3,
    latestBatch: 8
  }
};
