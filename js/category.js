(function(){
  "use strict";

  var path = location.pathname.replace(/\/+$/, "");
  var id = path.split("/").filter(Boolean).pop() || new URLSearchParams(location.search).get("cat") || "";
  var cfg = SITE_CONFIG.subcategories.find(function(s){ return s.id === id; });

  if (!cfg) { location.replace(HI.url("")); return; }

  var url = HI.url(SITE_CONFIG.json.categoryDir + id + ".json");
  document.title = cfg.name + " | HelloInsights Technology";
  document.getElementById("metaDesc").content = cfg.desc;
  document.getElementById("canonicalUrl").href = SITE_CONFIG.baseUrl + "/" + id + "/";
  document.getElementById("catTitle").textContent = cfg.name;
  document.getElementById("catDesc").textContent = cfg.desc;
  document.getElementById("breadcrumbCat").textContent = cfg.name;

  HI.fetchJSON(url).then(function(data){
    var articles = (data.articles || []).sort(function(a,b){return new Date(b.date)-new Date(a.date);});
    var grid = document.getElementById("articleGrid");
    var page = 1, perPage = 9;

    function render(){
      var start = (page-1)*perPage;
      var items = articles.slice(start,start+perPage);
      grid.innerHTML = items.map(function(a){
        return '<article class="cat-card"><a href="' + HI.url("article.html?id=" + encodeURIComponent(a.id)) + '">' +
          '<img src="' + HI.image(a.image,480,270) + '" alt="' + HI.esc(a.title) + '" width="480" height="270" loading="lazy" decoding="async">' +
          '<div class="cat-card-body"><h2>' + HI.esc(a.title) + '</h2><p>' + HI.esc(a.excerpt || "") + '</p>' +
          '<time datetime="' + HI.esc(a.date || "") + '">' + HI.date(a.date) + '</time></div></a></article>';
      }).join("") || '<p class="no-articles">No stories in this topic yet.</p>';

      var total = Math.ceil(articles.length/perPage);
      document.getElementById("pagination").innerHTML = total <= 1 ? "" :
        '<button ' + (page===1?"disabled":"") + ' data-p="' + (page-1) + '">← Prev</button>' +
        '<span>Page ' + page + ' of ' + total + '</span>' +
        '<button ' + (page===total?"disabled":"") + ' data-p="' + (page+1) + '">Next →</button>';
    }

    document.getElementById("pagination").addEventListener("click",function(e){
      var p = Number(e.target.dataset.p);
      if (p) { page=p; render(); scrollTo(0,document.getElementById("articleGrid").offsetTop-80); }
    });

    render();
  }).catch(function(){
    document.getElementById("articleGrid").innerHTML =
      '<p class="no-articles">Unable to load this topic right now.</p>';
  });

  HI.setupMenu();
  HI.footer();
})();
