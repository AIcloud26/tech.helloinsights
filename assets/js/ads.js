(function(){
"use strict";
var loaded={};
function hasRealValue(v){return !!v && !/X{3,}|YOUR_|PLACEHOLDER/i.test(v)}
function load(src,attrs){if(!src||loaded[src])return Promise.resolve();loaded[src]=true;return new Promise(function(resolve){var s=document.createElement("script");s.src=src;s.async=true;Object.keys(attrs||{}).forEach(function(k){s.setAttribute(k,attrs[k])});s.onload=resolve;s.onerror=resolve;document.head.appendChild(s)})}
function consentReady(){
  if(window.__cmpReady && typeof window.__cmpReady.then==="function") return window.__cmpReady;
  if(typeof window.__tcfapi==="function") return new Promise(function(resolve){window.__tcfapi("addEventListener",2,function(){resolve()})});
  return Promise.resolve();
}
function activate(slot,el){
  if(!slot||!slot.enabled||!window.ADS||!window.ADS.enabled)return;
  if(slot.network==="adsense" && window.ADS.adsense.enabled && hasRealValue(window.ADS.adsense.client) && hasRealValue(slot.slot)){
    el.style.setProperty("--ad-reserve",(slot.reservePx||90)+"px");
    el.classList.add("is-active");
    load(window.ADS.adsense.script+"?client="+encodeURIComponent(window.ADS.adsense.client),{crossorigin:"anonymous"}).then(function(){
      if(el.querySelector(".adsbygoogle"))return;
      var ins=document.createElement("ins");ins.className="adsbygoogle";ins.style.display="block";
      ins.setAttribute("data-ad-client",window.ADS.adsense.client);ins.setAttribute("data-ad-slot",slot.slot);
      ins.setAttribute("data-ad-format","auto");ins.setAttribute("data-full-width-responsive","true");
      el.appendChild(ins);try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch(e){}
    });
  }
  // GAM/MGID hooks are intentionally isolated so each network can be enabled later.
  if(slot.network==="gam" && window.ADS.gam.enabled && hasRealValue(window.ADS.gam.script)){
    el.classList.add("is-active");el.style.setProperty("--ad-reserve",(slot.reservePx||90)+"px");load(window.ADS.gam.script);
  }
  if(slot.network==="mgid" && window.ADS.mgid.enabled && hasRealValue(window.ADS.mgid.script)){
    el.classList.add("is-active");el.style.setProperty("--ad-reserve",(slot.reservePx||90)+"px");load(window.ADS.mgid.script);
  }
}
function run(){
  document.querySelectorAll("[data-ad-slot]").forEach(function(el){
    var key=el.getAttribute("data-ad-slot"),slot=window.ADS.slots[key];activate(slot,el);
  });
}
HI.ready(function(){
  var delay=window.requestIdleCallback?function(f){requestIdleCallback(f,{timeout:2500})}:function(f){setTimeout(f,1200)};
  consentReady().then(function(){delay(run)});
});
})();
