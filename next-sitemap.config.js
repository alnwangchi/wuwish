/** @type {import('next-sitemap').IConfig} */
const slugify = require('slugify');

const categoryList = [
  { name: '訂製服裝', en: 'Custom Clothing' },
  { name: '萬聖節', en: 'Halloween' },
  { name: '聖誕節', en: 'Christmas' },
  { name: '節日慶典', en: 'Festivals and Celebrations' },
  { name: '特殊', en: 'Special' },
  { name: 'Disney', en: 'Disney' },
  { name: 'MARVEL', en: 'MARVEL' },
  { name: 'DC英雄', en: 'DC Heroes' },
  { name: '電影/影集', en: 'Movies/TV Series' },
  { name: '卡通/動漫', en: 'Cartoons/Animations' },
  { name: '職業', en: 'Occupation' },
  { name: '時裝/表演', en: 'Fashion/Performance' },
  { name: '動物', en: 'Animals' },
  { name: '食物', en: 'Food' },
  { name: '男中式傳統', en: 'Men Traditional Chinese' },
  { name: '女中式傳統', en: 'Women Traditional Chinese' },
  { name: '日本傳統', en: 'Japanese Traditional' },
  { name: '韓國傳統', en: 'Korean Traditional' },
  { name: '歐式傳統', en: 'European Traditional' },
  { name: '各國傳統', en: 'Traditional from Various Countries' },
  { name: '維京海盜', en: 'Viking Pirates' },
  { name: '玩偶裝', en: 'Doll Costume' },
  { name: '配件', en: 'Accessories' },
  { name: '大型道具', en: 'Large Props' },
  { name: '芭比全系列', en: 'Barbie Series' }
];

// const saleCategoryList = [
//   { name: '萬聖節', en: 'Halloween' },
//   { name: '卡通/動漫', en: 'Cartoons/Animations' },
//   { name: '電影/影集', en: 'Movies/TV Series' }
// ];

module.exports = {
  siteUrl: 'https://www.wuwish.com.tw/',
  changefreq: 'weekly',
  priority: 0.7, //指示搜尋引擎爬蟲網頁重要性的值 但實際搜尋引擎不會嚴格遵循
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['/dashboard', '/dashboard/list', '/dashboard/upload', '/login'],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? []
    };
  },
  additionalPaths: async (config) => {
    const paths = [];

    // 1️⃣ 加回首頁 & 固定頁面
    const staticPaths = ['/', '/search', '/faq', '/product-rent', '/product-sell', '/rent-process'];
    for (const path of staticPaths) {
      paths.push(await config.transform(config, path));
    }

    // 2️⃣ 加入租借分類
    for (const category of categoryList) {
      const slug = slugify(category.en, { lower: true });
      paths.push(await config.transform(config, `/product-rent/${slug}`));
    }

    // 3️⃣ 加入出售分類
    // for (const category of saleCategoryList) {
    //   const slug = slugify(category.en, { lower: true });
    //   paths.push(await config.transform(config, `/product-sell/${slug}`));
    // }

    return paths;
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      },
      {
        userAgent: 'black-listed-bot',
        disallow: ['/dashboard', '/login']
      }
    ]
  }
};
