/* eslint-disable @next/next/no-img-element */
'use client';
import { Button, Card } from 'antd';
import axios from 'axios';

const sitemapUrls: string[] = [
  // 靜態頁面
  'https://www.wuwish.com.tw/',
  'https://www.wuwish.com.tw/search',
  'https://www.wuwish.com.tw/faq',
  'https://www.wuwish.com.tw/product-rent',
  'https://www.wuwish.com.tw/rent-process',

  // product-rent/[category] 分類頁
  'https://www.wuwish.com.tw/product-rent/custom-clothing',
  'https://www.wuwish.com.tw/product-rent/halloween',
  'https://www.wuwish.com.tw/product-rent/christmas',
  'https://www.wuwish.com.tw/product-rent/festivals-and-celebrations',
  'https://www.wuwish.com.tw/product-rent/special',
  'https://www.wuwish.com.tw/product-rent/disney',
  'https://www.wuwish.com.tw/product-rent/marvel',
  'https://www.wuwish.com.tw/product-rent/dc-heroes',
  'https://www.wuwish.com.tw/product-rent/movies-tv-series',
  'https://www.wuwish.com.tw/product-rent/cartoons-animations',
  'https://www.wuwish.com.tw/product-rent/occupation',
  'https://www.wuwish.com.tw/product-rent/fashion-performance',
  'https://www.wuwish.com.tw/product-rent/animals',
  'https://www.wuwish.com.tw/product-rent/food',
  'https://www.wuwish.com.tw/product-rent/men-traditional-chinese',
  'https://www.wuwish.com.tw/product-rent/women-traditional-chinese',
  'https://www.wuwish.com.tw/product-rent/japanese-traditional',
  'https://www.wuwish.com.tw/product-rent/korean-traditional',
  'https://www.wuwish.com.tw/product-rent/european-traditional',
  'https://www.wuwish.com.tw/product-rent/traditional-from-various-countries',
  'https://www.wuwish.com.tw/product-rent/viking-pirates',
  'https://www.wuwish.com.tw/product-rent/doll-costume',
  'https://www.wuwish.com.tw/product-rent/accessories',
  'https://www.wuwish.com.tw/product-rent/large-props',
  'https://www.wuwish.com.tw/product-rent/barbie-series'
];

const IndexNowPage = () => {
  const notifyIndexNow = async (urls: string[]) => {
    try {
      const res = await axios.post('/api/indexnow', { urls });
      console.log('IndexNow submitted successfully.', res);
    } catch (error) {
      console.error('IndexNow submission failed:', error);
    }
  };

  return (
    <div className="container grid items-center">
      <Card bordered={false} className="w-full">
        <Button
          onClick={() => {
            notifyIndexNow(sitemapUrls);
          }}
          className="self-end"
          type="primary"
        >
          IndexNow
        </Button>
      </Card>
    </div>
  );
};

export default IndexNowPage;
