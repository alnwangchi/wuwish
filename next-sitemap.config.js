/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://www.wuwish.com.tw/',
  changefreq: 'weekly',
  priority: 0.7, //指示搜尋引擎爬蟲網頁重要性的值 但實際搜尋引擎不會嚴格遵循
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['/dashboard', '/dashboard/list', '/dashboard/upload', '/login'],
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? []
    };
  },
  additionalPaths: async (config) => [await config.transform(config, '/additional-page')],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: 'test-bot',
        allow: ['/']
      },
      {
        userAgent: 'black-listed-bot',
        disallow: ['/dashboard', '/login']
      }
    ],
    additionalSitemaps: []
  }
};
