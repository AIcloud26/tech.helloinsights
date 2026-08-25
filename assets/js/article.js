HI.ready(function(){
  var id=new URLSearchParams(location.search).get("id");if(!id){location.replace("/");return}
  HI.getJSON(CONTENT_CONFIG.generatedArticleDir+encodeURIComponent(id)+".json").then(function(data){
    var a=data.article||data, related=data.related||[];
    var image=HI.img(a.image,1200,675),url=SITE.baseUrl+"/article.html?id="+encodeURIComponent(a.id);
    document.title=a.title+" | "+SITE.fullName;
    document.querySelector('meta[name="description"]').content=a.excerpt||a.title;
    document.querySelector("#canonical").href=url;
    document.querySelector("#heroImage").src=image;document.querySelector("#heroImage").alt=a.title;
    document.querySelector("#category").textContent=a.category||SITE.name;document.querySelector("#category").href="/category.html?cat="+encodeURIComponent(a.subcategory||"");
    document.querySelector("#date").textContent=HI.date(a.date);document.querySelector("#date").dateTime=a.date||"";
    document.querySelector("#title").textContent=a.title;document.querySelector("#dek").textContent=a.excerpt||"";
    document.querySelector("#reading").textContent=a.readingTime||HI.reading(a.content||"");
    document.querySelector("#body").innerHTML=a.content||"";
    if(a.keyTakeaways&&a.keyTakeaways.length){document.querySelector("#takeaways").hidden=false;document.querySelector("#takeaways ul").innerHTML=a.keyTakeaways.map(function(x){return "<li>"+HI.esc(x)+"</li>"}).join("")}
    if(a.editorNote){document.querySelector("#editorNote").hidden=false;document.querySelector("#editorNoteContent").innerHTML=a.editorNote}
    document.querySelector("#related").innerHTML=related.slice(0,3).map(function(x){return '<article class="related-card"><a href="/article.html?id='+encodeURIComponent(x.id)+'"><img loading="lazy" src="'+HI.img(x.image,480,270)+'" width="480" height="270" alt="'+HI.esc(x.title)+'"><h3>'+HI.esc(x.title)+'</h3></a></article>'}).join("");
    var ld={"@context":"https://schema.org","@type":"Article","headline":a.title,"description":a.excerpt||a.title,"datePublished":a.date,"image":[image],"author":{"@type":"Organization","name":"HelloInsights"},"publisher":{"@type":"Organization","name":"HelloInsights"},"mainEntityOfPage":{"@type":"WebPage","@id":url}};
    document.querySelector("#jsonld").textContent=JSON.stringify(ld);
    HI.injectTOC();HI.share();HI.topics();
  }).catch(function(){document.querySelector("#body").innerHTML="<p>This story could not be loaded.</p>"});
  HI.menu();HI.search();HI.footer();
});
