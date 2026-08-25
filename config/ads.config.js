window.ADS = {
  enabled: true,

  // Keep false until the real production client/slot IDs are configured.
  adsense: {
    enabled: false,
    client: "",
    script: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  },

  gam: {
    enabled: false,
    networkCode: "",
    script: ""
  },

  mgid: {
    enabled: false,
    script: ""
  },

  // Slots are independently switchable.
  // reservePx is deliberately modest to reduce CLS without creating giant blanks.
  slots: {
    "home-mid": {enabled:false, network:"adsense", slot:"", reservePx:90},
    "home-bottom": {enabled:false, network:"adsense", slot:"", reservePx:90},
    "article-top": {enabled:false, network:"adsense", slot:"", reservePx:90},
    "article-mid": {enabled:false, network:"adsense", slot:"", reservePx:180},
    "article-bottom": {enabled:false, network:"adsense", slot:"", reservePx:90}
  }
};
