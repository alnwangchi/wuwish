// components/JsonLd.tsx
import Script from 'next/script';
import type { FAQPage, LocalBusiness, WithContext, Organization, BreadcrumbList } from 'schema-dts';

// 首頁最重要的
export const LocalBusinessJsonLd = () => {
  const jsonLd: WithContext<LocalBusiness> = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: '神龍變裝西門町最齊全的服裝出租店',
    alternateName: '神龍變裝',
    description:
      '台北西門町專業服裝出租店，提供動漫角色、節慶造型、創意變裝等服裝租借服務，超過百款服裝道具，支援派對、拍攝、快閃等各式活動。',
    image: ['https://www.wuwish.com.tw/logo.png', 'https://www.wuwish.com.tw/og.jpg'],
    url: 'https://www.wuwish.com.tw/',
    telephone: '+886-968-270-178',
    email: 'wuwish88@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '萬華區漢中街150號2樓',
      addressLocality: '台北市',
      addressRegion: '台北市',
      postalCode: '108',
      addressCountry: 'TW'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.041682169438786,
      longitude: 121.50667589815379
    },
    priceRange: '$$',
    paymentAccepted: ['Cash', 'LINE Pay'],
    currenciesAccepted: 'TWD',
    areaServed: {
      '@type': 'City',
      name: '台北市'
    },
    serviceArea: {
      '@type': 'City',
      name: '台北市'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'https://schema.org/Monday',
          'https://schema.org/Tuesday',
          'https://schema.org/Wednesday',
          'https://schema.org/Thursday',
          'https://schema.org/Friday',
          'https://schema.org/Saturday',
          'https://schema.org/Sunday'
        ],
        opens: '12:00',
        closes: '21:00'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '566',
      bestRating: '5',
      worstRating: '1'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '服裝租借目錄',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '動漫角色服裝租借',
            description: '提供各種動漫角色服裝租借服務'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '節慶造型服裝租借',
            description: '萬聖節、聖誕節等節慶主題服裝租借'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '創意變裝服裝租借',
            description: '搞笑、創意主題服裝租借服務'
          }
        }
      ]
    },
    sameAs: [
      'https://www.facebook.com/Wu.wish88/?locale=zh_TW',
      'https://www.instagram.com/wu_wish88'
    ],
    foundingDate: '2022',
    slogan: '召喚神龍，實現變裝願望！'
  };

  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const FAQJsonLd = () => {
  // 因為 FAQ constants 是 JSX 所以這邊不參考統一來源 也不常更動
  const jsonLd: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '租借流程為何？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '您可先在網站瀏覽喜歡的服裝，記錄款式代碼後與我們聯繫預約，並支付訂金。於租借日到店付款取件，歸還後若商品無損壞，我們將退還押金或歸還證件。'
        }
      },
      {
        '@type': 'Question',
        name: '如何租借服裝／道具？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '透過網站底部連結洽詢與預約。訂單成立後每套需預繳 50% 訂金。若取消訂單，訂金將不予退還。'
        }
      },
      {
        '@type': 'Question',
        name: '租借費用如何計算？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '租金依款式與天數不同，普通款約 NT$300–900，精緻款 NT$1,000 起。實際價格請洽詢客服。'
        }
      },
      {
        '@type': 'Question',
        name: '現場是否可以試穿？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '租借意願者可洽詢現場試穿，繁忙時段（如萬聖節）可能暫停。高價款式試穿需付 NT$100 意向金，可折抵租金。'
        }
      },
      {
        '@type': 'Question',
        name: '服裝可以修改尺寸嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '可提供肩帶、腰帶等簡易調整，恕不提供大幅修改。若有特殊需求請提前告知。'
        }
      },
      {
        '@type': 'Question',
        name: '租借時間多久？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '一般租期為 3 天，逾期需補原租金 30%／日，請提前聯繫延長。'
        }
      },
      {
        '@type': 'Question',
        name: '可以取消或更改訂單嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '部分取消扣除該商品訂金（租金 50%）；整筆取消不退還任何訂金。未取件視為取消；訂金不得轉讓。若遇天災可選擇退訂金或改期一次。'
        }
      },
      {
        '@type': 'Question',
        name: '租借需要支付押金嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '每件商品需支付租金 2 倍押金，或提供有效證件擇一擔保。歸還時確認無損壞即退還押金或歸還證件。'
        }
      },
      {
        '@type': 'Question',
        name: '商品損壞或染色會怎麼處理？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '若商品遭改造、染色或損壞，將視情況要求賠償。特殊材質道具應保持乾燥與通風，避免退色情況發生。'
        }
      },
      {
        '@type': 'Question',
        name: '服裝是否已清潔？會不會不乾淨？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '所有服裝與道具皆會在每次租借後消毒清洗，包含內搭衣褲，使用抗菌洗劑與專業器材處理。'
        }
      },
      {
        '@type': 'Question',
        name: '需要自己洗衣嗎？清潔費用怎麼收？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '商品需由本店清洗，請勿自行水洗。髒污依程度酌收 NT$100–200 清潔費；血漬、油漬與嘔吐物等將酌收特殊處理費。'
        }
      },
      {
        '@type': 'Question',
        name: '服裝有損壞怎麼處理？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '若發生破損、掉件或飾品遺失，我們會依損壞程度判定是否收費，部分狀況會從押金中扣除。'
        }
      },
      {
        '@type': 'Question',
        name: '有拍攝服務嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '我們可協助推薦攝影師，並提供合作攝影棚資訊。請於租借前詢問，依需求收費。'
        }
      },
      {
        '@type': 'Question',
        name: '可以請朋友代租嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '可以，但需攜帶代租人雙證件與押金，並由對方簽署租借同意書。'
        }
      },
      {
        '@type': 'Question',
        name: '有哪些付款方式？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '現場付款可用現金或 LINE Pay，無刷卡服務；匯款／轉帳資訊請於預約時洽詢。'
        }
      },
      {
        '@type': 'Question',
        name: '可以刷卡嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '目前僅提供現金與 LINE Pay，恕無法刷卡，敬請見諒。'
        }
      },
      {
        '@type': 'Question',
        name: '要怎麼領取服裝？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '請至門市現場領取。若需宅配，請提前告知，並額外支付來回運費與保證金（由客服報價）。'
        }
      },
      {
        '@type': 'Question',
        name: '可以寄送／宅配嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '可提供宅配服務（黑貓／711），租金與押金先行匯款，運費由租借人負擔。收件當日視為租期開始。'
        }
      },
      {
        '@type': 'Question',
        name: '有提供更衣服務嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '店內設有更衣室可供更換服裝與整裝，無額外費用，歡迎多加利用。'
        }
      }
    ],
    dateModified: '2025-07-25'
  };
  return (
    <Script
      id="faq-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const AboutJsonLd = () => {
  const jsonLd: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '神龍變裝',
    alternateName: '神龍變裝西門町最齊全的服裝出租店',
    url: 'https://www.wuwish.com.tw/about',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.wuwish.com.tw/logo.png',
      width: '200',
      height: '200'
    },
    foundingDate: '2022',
    description:
      '神龍變裝成立於 2022 年，位於台北西門町，致力於提供高品質的服裝與道具租借服務，包含動漫角色、節慶造型與創意搞笑變裝，實現每位顧客的變裝願望。',
    brand: {
      '@type': 'Brand',
      name: '神龍變裝',
      slogan: '召喚神龍，實現變裝願望！',
      description:
        '提供超過百款動漫、節慶與搞笑主題服裝，支援派對、拍攝、快閃等各式活動的造型需求，是台北最具創意的變裝基地。'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+886-968-270-178',
      contactType: 'customer service',
      availableLanguage: 'Chinese'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '萬華區漢中街150號2樓',
      addressLocality: '台北市',
      addressRegion: '台北市',
      postalCode: '108',
      addressCountry: 'TW'
    },
    sameAs: [
      'https://www.facebook.com/Wu.wish88/?locale=zh_TW',
      'https://www.instagram.com/wu_wish88'
    ]
  };

  return (
    <Script
      id="about-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// 新增：麵包屑導航結構化資料
export const BreadcrumbJsonLd = ({ items }: { items: Array<{ name: string; url: string }> }) => {
  const jsonLd: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <Script
      id="breadcrumb-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// 新增：產品頁面結構化資料
export const ProductJsonLd = ({
  name,
  description,
  image,
  category,
  number
}: {
  name: string;
  description?: string;
  image: string;
  category: string;
  number?: string;
}) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description || `${name} - 專業服裝租借服務`,
    image: `https://www.wuwish.com.tw${image}`,
    category: category,
    brand: {
      '@type': 'Brand',
      name: '神龍變裝'
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'TWD',
      seller: {
        '@type': 'Organization',
        name: '神龍變裝'
      }
    },
    ...(number && { sku: number })
  };

  return (
    <Script
      id="product-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
