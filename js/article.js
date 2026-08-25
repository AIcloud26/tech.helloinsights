(function(){
  "use strict";

  var id = new URLSearchParams(location.search).get("id");
  if (!id) { location.replace(HI.url("")); return; }

  var url = HI.url(SITE_CONFIG.json.articleDir + encodeURIComponent(id) + ".json");

  HI.fetchJSON(url).then(function(payload){
    var a = payload.article || payload;
    if (!a || !a.id) throw new Error("Article not found");

    var image = HI.image(a.image,1200,675);
    var desc = a.excerpt || a.description || a.title;
    var articleUrl = SITE_CONFIG.baseUrl + "/article.html?id=" + encodeURIComponent(a.id);

    document.title = a.title + " | HelloInsights Technology";
    document.getElementById("metaDesc").content = desc;
    document.getElementById("canonicalUrl").href = articleUrl;
    document.getElementById("ogTitle").content = a.title;
    document.getElementById("ogDesc").content = desc;
    document.getElementById("ogUrl").content = articleUrl;
    document.getElementById("ogImage").content = image;

    var hero = document.getElementById("articleHeroImg");
    hero.src = image;
    hero.alt = a.title;

    document.getElementById("articleCatLink").textContent = a.category || "Technology";
    document.getElementById("articleCatLink").href = HI.url(SITE_CONFIG.categoryUrlMap[a.subcategory] || "");
    document.getElementById("articleDate").textContent = HI.date(a.date);
    document.getElementById("articleDate").dateTime = a.date || "";
    document.getElementById("articleTitle").textContent = a.title;
    document.getElementById("articleLead").textContent = desc;

    var body = document.getElementById("articleBody");
    body.innerHTML = a.content || "<p>Article content is not available.</p>";

    var jsonld = {
      "@context":"https://schema.org",
      "@type":"Article",
      "headline":a.title,
      "description":desc,
      "datePublished":a.date,
      "image":[image],
      "author":{"@type":"Organization","name":"HelloInsights"},
      "publisher":{"@type":"Organization","name":"HelloInsights"},
      "mainEntityOfPage":{"@type":"WebPage","@id":articleUrl}
    };
    document.getElementById("jsonldArticle").textContent = JSON.stringify(jsonld);

    if (a.editorNote) {
      document.getElementById("editorNoteContent").innerHTML = a.editorNote;
      document.getElementById("editorNote").hidden = false;
    }

    renderRelated(a, payload.related || []);
    renderTopics();
  }).catch(function(){
    document.getElementById("articleBody").innerHTML =
      '<p class="load-error">This story could not be loaded.</p>';
  });

  function renderRelated(current, related){
    var list = related.filter(function(a){return String(a.id)!==String(current.id);}).slice(0,3);
    document.getElementById("relatedGrid").innerHTML = list.map(function(a){
      return '<article class="related-card"><a href="' + HI.url("article.html?id=" + encodeURIComponent(a.id)) + '">' +
        '<img src="' + HI.image(a.image,480,270) + '" alt="' + HI.esc(a.title) + '" width="480" height="270" loading="lazy" decoding="async">' +
        '<h3>' + HI.esc(a.title) + '</h3></a></article>';
    }).join("");
  }

  function renderTopics(){
    document.getElementById("topicsPills").innerHTML = SITE_CONFIG.subcategories.map(function(s){
      return '<a href="' + HI.url(SITE_CONFIG.categoryUrlMap[s.id]) + '">' + HI.esc(s.short) + '</a>';
    }).join("");
  }

  HI.setupMenu();
  HI.setupSearch();
  HI.footer();
})();
