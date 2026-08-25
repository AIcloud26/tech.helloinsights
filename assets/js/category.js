HI.ready(function(){
  var id=new URLSearchParams(location.search).get("cat")||"";
  var c=SITE.categories.find(function(x){return x.id===id});if(!c){location.replace("/");return}
  document.title=c.name+" | "+SITE.fullName;
  document.querySelector("#categoryTitle").textContent=c.name;
  document.querySelector("#categoryDesc").textContent=c.description;
  var page=1,per=9,items=[];
  HI.getJSON(CONTENT_CONFIG.generatedCategoryDir+id+".json").then(function(data){
    items=data.articles||[];
    function render(){var total=Math.ceil(items.length/per),slice=items.slice((page-1)*per,page*per);document.querySelector("#categoryGrid").innerHTML=slice.map(function(a){return '<article class="category-card"><a href="/article.html?id='+encodeURIComponent(a.id)+'"><img loading="lazy" data-lazy src="'+HI.img(a.image,480,270)+'" width="480" height="270" alt="'+HI.esc(a.title)+'" decoding="async"><div class="category-card-body"><span class="eyebrow">'+HI.esc(a.category||c.name)+'</span><h2>'+HI.esc(a.title)+'</h2><p>'+HI.esc(a.excerpt||"")+'</p><time>'+HI.date(a.date)+'</time></div></a></article>'}).join("")||"<p>No stories yet.</p>";document.querySelector("#pagination").innerHTML=total<=1?"":'<button '+(page===1?"disabled":"")+' data-p="'+(page-1)+'">← Prev</button><span>Page '+page+" of "+total+'</span><button '+(page===total?"disabled":"")+' data-p="'+(page+1)+'">Next →</button>'}
    document.querySelector("#pagination").onclick=function(e){var p=+e.target.dataset.p;if(p){page=p;render();scrollTo(0,0)}};render()
  });
  HI.menu();HI.search();HI.footer();
});
