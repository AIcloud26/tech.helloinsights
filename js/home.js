(function(){
  "use strict";
  var all = [];
  var shown = 0;
  var batchSize = 8;

  function card(a, kind, eager) {
    var cls = kind || "";
    var image = HI.image(a.image, kind === "featured" ? 800 : 480, kind === "featured" ? 450 : 270);
    return '<article class="' + cls + '">' +
      '<a href="' + HI.url("article.html?id=" + encodeURIComponent(a.id)) + '">' +
      '<img src="' + image + '" alt="' + HI.esc(a.title) + '" width="' + (kind==="featured"?"800":"480") + '" height="' + (kind==="featured"?"450":"270") + '" ' +
      (eager ? 'fetchpriority="high"' : 'loading="lazy"') + ' decoding="async">' +
      '<div class="card-body">' +
      '<span class="eyebrow">' + HI.esc(a.category || "Technology") + '</span>' +
      '<h3>' + HI.esc(a.title) + '</h3>' +
      '<p>' + HI.esc(a.excerpt || "") + '</p>' +
      '<time datetime="' + HI.esc(a.date || "") + '">' + HI.date(a.date) + '</time>' +
      '</div></a></article>';
  }

  function render(data) {
    all = (data.articles || []).slice().sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    });

    var params = new URLSearchParams(location.search);
    var q = (params.get("q") || "").toLowerCase();

    var visible = q ? all.filter(function(a){
      return (a.title || "").toLowerCase().indexOf(q) !== -1 ||
             (a.excerpt || "").toLowerCase().indexOf(q) !== -1;
    }) : all;

    var used = {};
    var featured = visible.filter(function(a){ return a.featured; }).slice(0,4);
    if (!featured.length) featured = visible.slice(0,4);
    featured.forEach(function(a){ used[String(a.id)] = true; });

    document.getElementById("featuredGrid").innerHTML =
      featured.map(function(a,i){ return card(a, i===0 ? "featured-main" : "featured-side", i===0); }).join("");

    all = visible;
    shown = 0;
    renderLatest();

    var sections = document.getElementById("categorySections");
    sections.innerHTML = SITE_CONFIG.subcategories.map(function(s){
      var items = all.filter(function(a){ return a.subcategory === s.id && !used[String(a.id)]; }).slice(0,3);
      items.forEach(function(a){ used[String(a.id)] = true; });
      if (!items.length) return "";
      return '<section class="topic-section"><div class="container">' +
        '<div class="topic-header"><h2>' + HI.esc(s.name) + '</h2><a href="' + SITE_CONFIG.categoryUrlMap[s.id] + '">View all →</a></div>' +
        '<div class="topic-grid">' + items.map(function(a){return card(a,"topic-card",false);}).join("") + '</div>' +
        '</div></section>';
    }).join("");

    var most = document.getElementById("mostReadList");
    most.innerHTML = all.slice(0,5).map(function(a){
      return '<li><a href="' + HI.url("article.html?id=" + encodeURIComponent(a.id)) + '">' + HI.esc(a.title) + '</a></li>';
    }).join("");
  }

  function renderLatest(){
    var list = document.getElementById("latestList");
    var btn = document.getElementById("loadMoreBtn");
    var batch = all.slice(shown, shown + batchSize);

    list.insertAdjacentHTML("beforeend", batch.map(function(a){return card(a,"latest-card",false);}).join(""));
    shown += batch.length;
    btn.hidden = shown >= all.length;
  }

  HI.fetchJSON(SITE_CONFIG.json.home).then(render).catch(function(){
    document.getElementById("latestList").innerHTML =
      '<p class="load-error">We could not load the latest stories. Please try again.</p>';
  });

  document.getElementById("loadMoreBtn").addEventListener("click", renderLatest);
  HI.setupMenu();
  HI.setupSearch();
  HI.footer();
})();
