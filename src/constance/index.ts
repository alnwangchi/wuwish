import { toLower } from 'lodash';
import slugify from 'slugify';

export const categoryList = [
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

export const enToNameMap = categoryList.reduce(
  (map, category) => {
    map[toLower(slugify(category.en))] = category.name;
    return map;
  },
  {} as Record<string, string>
);

export const saleCategoryList = [
  { name: '萬聖節', en: 'Halloween' },
  { name: '卡通/動漫', en: 'Cartoons/Animations' },
  { name: '電影/影集', en: 'Movies/TV Series' }
];

export const authorization = { account: 'admin', password: 'dragonpassword' };
