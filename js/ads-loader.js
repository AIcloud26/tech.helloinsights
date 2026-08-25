(function () {
  "use strict";

  var cfg = window.AD_CONFIG || {};
  if (!cfg.enabled) return;

  function validClient(client) {
    return client && client.indexOf("XXXX") === -1;
  }

  function loadScript(src, attrs) {
    if (document.querySelector('script[src="' + src + '"]')) return;
    var s = document.createElement("script");
    s.src = src;
    s.async = true;
    Object.keys(attrs || {}).forEach(function(k){ s.setAttribute(k, attrs[k]); });
    document.head.appendChild(s);
  }

  function loadAdSense() {
    if (!cfg.adsense || !cfg.adsense.enabled || !validClient(cfg.adsense.client)) return;
    loadScript(
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
      encodeURIComponent(cfg.adsense.client),
      {crossorigin:"anonymous"}
    );
  }

  function render() {
    document.querySelectorAll("[data-ad-slot]").forEach(function(el) {
      var key = el.getAttribute("data-ad-slot");
      var slot = cfg.slots && cfg.slots[key];
      if (!slot || !slot.enabled) {
        el.hidden = true;
        return;
      }

      el.hidden = false;

      if (slot.network === "adsense") {
        loadAdSense();

        if (el.querySelector(".adsbygoogle")) return;

        var ins = document.createElement("ins");
        ins.className = "adsbygoogle";
        ins.style.display = "block";
        ins.setAttribute("data-ad-client", cfg.adsense.client);
        ins.setAttribute("data-ad-slot", slot.slot);
        ins.setAttribute("data-ad-format", "auto");
        ins.setAttribute("data-full-width-responsive", "true");
        el.appendChild(ins);

        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (_) {}
      }
    });
  }

  if ("requestIdleCallback" in window) {
    requestIdleCallback(render, {timeout: 2500});
  } else {
    setTimeout(render, 1200);
  }
})();
