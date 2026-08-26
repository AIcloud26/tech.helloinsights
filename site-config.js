var SITE_CONFIG = {
  siteName: "Technology",
  fullSiteName: "HelloInsights Technology",
  baseUrl: "https://technology.helloinsights.online",
  basePath: "/",
  mainSiteUrl: "https://helloinsights.online",

  jsonFile: "technology-index.json",
  json: {
    home: "technology-index.json",
    categoryDir: "",
    articleDir: ""
  },

  fallbackImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop&fm=webp&q=75",

  heroIntro: "Technology is moving quickly, but not every launch deserves attention. HelloInsights looks beyond the release cycle to examine the products, platforms, security shifts and emerging ideas that are changing how people and businesses use technology.",

  subcategories: [
    {id:"ai", name:"Artificial Intelligence", short:"AI", desc:"Models, products, enterprise adoption, safety and the business of intelligent systems."},
    {id:"software", name:"Software & Apps", short:"Software", desc:"Cloud platforms, productivity tools, developer software and the SaaS economy."},
    {id:"cybersecurity", name:"Cybersecurity", short:"Cybersecurity", desc:"Threats, defenses, regulation and the evolving security landscape."},
    {id:"gadgets", name:"Gadgets", short:"Gadgets", desc:"Consumer hardware, wearables, smart home devices and products people actually use."},
    {id:"developer", name:"Developer Technology", short:"Developer", desc:"Infrastructure, developer tools, edge computing and the systems builders rely on."},
    {id:"future-tech", name:"Future Technology", short:"Future Tech", desc:"Quantum computing, robotics and emerging technologies moving toward real-world use."}
  ],

  categoryUrlMap: {
    "ai": "/ai/",
    "software": "/software/",
    "cybersecurity": "/cybersecurity/",
    "gadgets": "/gadgets/",
    "developer": "/developer/",
    "future-tech": "/future-tech/"
  }
};
