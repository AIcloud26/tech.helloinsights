/**
 * HelloInsights — Site Configuration
 * Matrix-ready: change SITE_CONFIG to deploy a new vertical subsite.
 *
 * Shared template files (index.html, article.html, style.css) read this config.
 * To launch a new subsite, copy the template directory and modify only this file.
 */
var SITE_CONFIG = {
    /* === Site Identity === */
    siteName: 'Technology',
    fullSiteName: 'HelloInsights Technology',
    tagline: 'Technology Insights for the Digital World',
    aboutText: 'Editorial-grade coverage of AI, software, cybersecurity, gadgets and emerging technology.',

    /* === Domain & URLs === */
    baseUrl: 'https://technology.helloinsights.online',
    mainSiteUrl: 'https://helloinsights.online',
    siblingSites: [
        { name: 'Finance', url: 'https://finance.helloinsights.online' },
        { name: 'Health', url: 'https://health.helloinsights.online' }
    ],

    /* === Data Files === */
    jsonFile: 'technology-index.json',
    fullArticleJson: 'articles-technology.json',
    opinionJson: 'opinions.json',

    /* === Fallbacks === */
    fallbackImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop&fm=webp&q=80',

    /* === Analytics (set per subsite) === */
    gaId: '',

    /* === SEO === */
    titleSuffix: 'Technology Insights on AI, Software, Cybersecurity & Gadgets | HelloInsights',
    metaDesc: 'Editorial coverage of AI, software, cybersecurity, gadgets, developer tools and emerging technology from HelloInsights.',

    /* === Hero / Editorial === */
    heroIntro: '<p>HelloInsights Technology covers the technologies reshaping how we work, build, and live &mdash; with reporting that cuts through vendor hype.</p><p>Our editors track artificial intelligence, software, cybersecurity, hardware, and the infrastructure behind modern computing. We focus on what changes, what it costs, and who it actually affects.</p>',

    /* === Subcategories === */
    subcategories: [
        { id: 'ai', name: 'Artificial Intelligence', desc: 'AI models, products, enterprise adoption, safety and the business of intelligent systems.' },
        { id: 'software', name: 'Software & Apps', desc: 'Cloud platforms, productivity tools, developer software and the SaaS economy.' },
        { id: 'cybersecurity', name: 'Cybersecurity', desc: 'Threats, defenses, regulation and the evolving security landscape.' },
        { id: 'gadgets', name: 'Gadgets', desc: 'Consumer hardware, wearables, smart home devices and the products people actually use.' },
        { id: 'developer', name: 'Developer Technology', desc: 'Infrastructure, edge computing, 5G and the tools builders rely on.' },
        { id: 'future-tech', name: 'Future Technology', desc: 'Quantum computing, robotics, blockchain and emerging research.' }
    ],

    /* === URL Mappings (relative for GitHub Pages) === */
    categoryUrlMap: {
        'ai': 'index.html?cat=ai',
        'software': 'index.html?cat=software',
        'cybersecurity': 'index.html?cat=cybersecurity',
        'gadgets': 'index.html?cat=gadgets',
        'developer': 'index.html?cat=developer',
        'future-tech': 'index.html?cat=future-tech'
    },

    /* === Article Type Length Guide (for content generation) === */
    lengthGuide: {
        news: { min: 500, max: 800, label: 'News / Update' },
        explainer: { min: 500, max: 800, label: 'Explainer' },
        standard: { min: 500, max: 800, label: 'Standard Article' },
        review: { min: 500, max: 800, label: 'Product Review' }
    }
};
