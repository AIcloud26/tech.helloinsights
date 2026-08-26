(function(){
"use strict";
window.HI = window.HI || {};

HI.esc=function(v){var d=document.createElement("div");d.textContent=v==null?"":String(v);return d.innerHTML};
HI.date=function(v){var d=new Date(v);return isNaN(d)?"":d.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})};
HI.reading=function(text){var words=String(text||"").replace(/<[^>]+>/g," ").trim().split(/\s+/).length;return Math.max(1,Math.ceil(words/(window.CONTENT_CONFIG?.article?.defaultReadingSpeed||220)))+" min read"};
HI.img=function(url,w,h){var fallback="https://images.unsplash.com/photo-1518770660439-4636190af475";var s=url||fallback;try{var u=new URL(s);u.searchParams.set("w",w);u.searchParams.set("h",h);u.searchParams.set("fit","crop");u.searchParams.set("fm","webp");u.searchParams.set("q","76");return u.toString()}catch(e){return s}};
HI.getJSON=function(url){return fetch(url,{cache:"default",credentials:"same-origin"}).then(function(r){if(!r.ok)throw Error("HTTP "+r.status);return r.json()})};
HI.menu=function(){var b=document.querySelector(".menu"),n=document.querySelector(".main-nav");if(!b||!n)return;b.onclick=function(){var o=n.classList.toggle("nav-open");b.setAttribute("aria-expanded",o?"true":"false")}};
HI.search=function(){var f=document.querySelector("[data-search]");if(!f)return;f.addEventListener("submit",function(e){e.preventDefault();var q=f.querySelector("input").value.trim();if(q)location.href="/search.html?q="+encodeURIComponent(q)})};
HI.footer=function(){var el=document.querySelector("[data-footer-topics]");if(!el)return;el.innerHTML=SITE.categories.map(function(c){return '<li><a href="'+SITE.categoryUrlMap[c.id]+'">'+HI.esc(c.name)+'</a></li>'}).join("")};
HI.topics=function(){var el=document.querySelector("[data-topic-pills]");if(!el)return;el.innerHTML=SITE.categories.map(function(c){return '<a href="'+SITE.categoryUrlMap[c.id]+'">'+HI.esc(c.short)+'</a>'}).join("")};
HI.share=function(){var u=encodeURIComponent(location.href),t=encodeURIComponent(document.title);var x=document.querySelector("[data-share-x]"),f=document.querySelector("[data-share-fb]"),l=document.querySelector("[data-share-li]");if(x)x.href="https://twitter.com/intent/tweet?url="+u+"&text="+t;if(f)f.href="https://www.facebook.com/sharer/sharer.php?u="+u;if(l)l.href="https://www.linkedin.com/sharing/share-offsite/?url="+u};
HI.injectTOC=function(){var toc=document.querySelector("[data-toc]"),body=document.querySelector("[data-article-body]");if(!toc||!body)return;var hs=body.querySelectorAll("h2");if(!hs.length){toc.hidden=true;return}var html="<strong>On this page</strong>";hs.forEach(function(h,i){var id="section-"+i;h.id=id;html+='<a href="#'+id+'">'+HI.esc(h.textContent)+'</a>'});toc.innerHTML=html};
HI.lazyEnhance=function(){if("loading" in HTMLImageElement.prototype){document.querySelectorAll("img[data-lazy]").forEach(function(i){i.loading="lazy"})}};
HI.ready=function(fn){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",fn,{once:true});else fn()};
})();
