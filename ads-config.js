/*
 * Production ad configuration.
 * Replace placeholder values only when the real IDs are available.
 */
window.AD_CONFIG = {
  enabled: true,
  adsense: {
    client: "ca-pub-XXXXXXXXXXXXXXXX",
    enabled: false
  },
  mgid: {
    siteId: "",
    enabled: false
  },
  slots: {
    "banner-mid-1": {network:"adsense", enabled:false, slot:"XXXXXXXXXX"},
    "banner-mid-2": {network:"adsense", enabled:false, slot:"XXXXXXXXXX"},
    "banner-bottom": {network:"adsense", enabled:false, slot:"XXXXXXXXXX"},
    "article-banner-top": {network:"adsense", enabled:false, slot:"XXXXXXXXXX"},
    "article-banner-mid": {network:"adsense", enabled:false, slot:"XXXXXXXXXX"}
  }
};
