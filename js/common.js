(function(){
  "use strict";

  window.HI = window.HI || {};

  HI.esc = function(value) {
    var d = document.createElement("div");
    d.textContent = value == null ? "" : String(value);
    return d.innerHTML;
  };

  HI.date = function(value) {
    var d = new Date(value);
    if (isNaN(d.getTime())) return value || "";
    return d.toLocaleDateString("en-US", {year:"numeric", month:"short", day:"numeric"});
  };

  HI.image = function(url, width, height) {
    var fallback = SITE_CONFIG.fallbackImage;
    var src = url || fallback;
    try {
      var u = new URL(src);
      u.searchParams.set("w", width);
      u.searchParams.set("h", height);
      u.searchParams.set("fit", "crop");
      u.searchParams.set("fm", "webp");
      u.searchParams.set("q", "76");
      return u.toString();
    } catch (_) {
      return src;
    }
  };

  HI.url = function(path) {
    var base = SITE_CONFIG.basePath || "/";
    if (!path) return base;
    if (/^https?:\/\//i.test(path)) return path;
    return base.replace(/\/$/, "") + "/" + String(path).replace(/^\//, "");
  };

  HI.fetchJSON = function(url) {
    return fetch(url, {credentials:"same-origin", cache:"default"}).then(function(r){
      if (!r.ok) throw new Error("HTTP " + r.status + " for " + url);
      return r.json();
    });
  };

  HI.setupMenu = function() {
    var btn = document.getElementById("menuToggle");
    var nav = document.getElementById("mainNav");
    if (!btn || !nav) return;
    btn.addEventListener("click", function(){
      var open = nav.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  };

  HI.setupSearch = function() {
    var form = document.getElementById("searchForm");
    var input = document.getElementById("searchInput");
    if (!form || !input) return;
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var q = input.value.trim();
      if (q) location.href = HI.url("?q=" + encodeURIComponent(q));
    });
  };

  HI.footer = function() {
    var el = document.getElementById("footerTopics");
    if (!el) return;
    el.innerHTML = SITE_CONFIG.subcategories.map(function(s){
      return '<li><a href="' + HI.url(SITE_CONFIG.categoryUrlMap[s.id]) + '">' + HI.esc(s.name) + '</a></li>';
    }).join("");
  };
})();
