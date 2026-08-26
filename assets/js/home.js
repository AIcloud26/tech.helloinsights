HI.ready(function(){
  var list=[],shown=0,per=CONTENT_CONFIG.article.latestBatch||8,used={};
  function card(a,kind,eager){return '<article class="card '+kind+'"><a href="/article.html?id='+encodeURIComponent(a.id)+'"><img '+(eager?'fetchpriority="high"':'loading="lazy"')+' data-lazy src="'+HI.img(a.image,kind==="featured-main"?800:480,kind==="featured-main"?450:270)+'" width="'+(kind==="featured-main"?800:480)+'" height="'+(kind==="featured-main"?450:270)+'" alt="'+HI.esc(a.title)+'" decoding="async"><div class="card-body"><span class="eyebrow">'+HI.esc(a.category||SITE.name)+'</span><h3>'+HI.esc(a.title)+'</h3><p>'+HI.esc(a.excerpt||"")+'</p><time>'+HI.date(a.date)+'</time></div></a></article>'}
  function latest(){var batch=list.filter(function(a){return !used[a.id]}).slice(0,per);batch.forEach(function(a){used[a.id]=1});document.querySelector("#latestList").insertAdjacentHTML("beforeend",batch.map(function(a){return '<article class="latest-item"><a href="/article.html?id='+encodeURIComponent(a.id)+'"><img data-lazy loading="lazy" src="'+HI.img(a.image,480,270)+'" width="480" height="270" alt="'+HI.esc(a.title)+'" decoding="async"></a><div><span class="eyebrow">'+HI.esc(a.category||SITE.name)+'</span><h3><a href="/article.html?id='+encodeURIComponent(a.id)+'">'+HI.esc(a.title)+'</a></h3><p>'+HI.esc(a.excerpt||"")+'</p><time>'+HI.date(a.date)+'</time></div></article>'}).join(""));shown+=batch.length;document.querySelector("#loadMore").hidden=shown>=list.length}
  HI.getJSON(CONTENT_CONFIG.generatedHome).then(function(data){
    list=(data.articles||[]).sort(function(a,b){return new Date(b.date)-new Date(a.date)});
    var featured=list.filter(function(a){return a.featured}).slice(0,4);if(!featured.length)featured=list.slice(0,4);
    document.querySelector("#featured").innerHTML=featured.map(function(a,i){used[a.id]=1;return card(a,i===0?"featured-main":"featured-side",i===0)}).join("");
    latest();
    document.querySelector("#loadMore").onclick=latest;
    SITE.categories.forEach(function(c){
      var items=list.filter(function(a){return a.subcategory===c.id}).slice(0,3);if(!items.length)return;
      document.querySelector("#topics").insertAdjacentHTML("beforeend",'<section class="section topic-section"><div class="container"><div class="topic-head"><h2>'+HI.esc(c.name)+'</h2><a href="'+SITE.categoryUrlMap[c.id]+'">View all →</a></div><div class="topic-grid">'+items.map(function(a){return card(a,"topic-card",false)}).join("")+'</div></div></section>');
    });
    document.querySelector("#mostRead").innerHTML=list.slice(0,5).map(function(a){return '<li><a href="/article.html?id='+encodeURIComponent(a.id)+'">'+HI.esc(a.title)+'</a></li>'}).join("");
    HI.lazyEnhance();
  }).catch(function(){document.querySelector("#latestList").innerHTML='<p>Stories are temporarily unavailable.</p>'});
  HI.menu();HI.search();HI.footer();
});
