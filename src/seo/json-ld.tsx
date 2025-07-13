// components/JsonLd.tsx
import Script from 'next/script';

// 首頁最重要的
export const LocalBusinessJsonLd = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: '神龍變裝西門町最齊全的服裝出租店',
    image: 'https://www.wuwish.com.tw/logo.png',
    url: 'https://www.wuwish.com.tw/',
    telephone: '+886-968-270-178',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '萬華區漢中街150號2樓',
      addressLocality: '台北市',
      postalCode: '108',
      addressCountry: 'TW'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.041682169438786,
      longitude: 121.50667589815379
    },
    priceRange: '$$',
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
      reviewCount: '566'
    },
    sameAs: [
      'https://www.facebook.com/Wu.wish88/?locale=zh_TW',
      'https://www.instagram.com/wu_wish88'
    ]
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '1：租借流程為何？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '瀏覽與選擇：您可在網站瀏覽或使用搜尋功能，亦可參考 IG 社群上的穿搭範例與獨家服裝。 預約與確認：記錄您喜歡的款式名稱／代號，並與我們聯繫確認租借日期、時間與訂金金額。 付款與取件：支付租金尾款與押金（或提供有效證件）後，即可取走預訂的服裝／道具。 歸還與點交：依約定時間歸還商品，點交確認無誤後退還押金（或歸還證件）。'
        }
      },
      {
        '@type': 'Question',
        name: '2：如何租借服裝／道具？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '您可透過網站底部連結進行檔期詢問、費用查詢與預約。訂單確認後，每套服裝需預繳 50% 訂金；如取消訂單，訂金將不予退還。'
        }
      },
      {
        '@type': 'Question',
        name: '3：租借費用如何計算？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '租金依款式與天數而定，一般款式約 NT$300–900，精緻款式 NT$1,000 起。詳細費用請洽詢客服人員。'
        }
      },
      {
        '@type': 'Question',
        name: '4：現場是否可以試穿？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '我們提供限量試穿服務，歡迎有租借意願的客人洽詢現場工作人員協助。為維持服務品質與流程順暢，恕不提供純試穿服務，敬請見諒。繁忙期間（如萬聖節、春酒旺季）將暫停現場試穿服務。部分高價或特殊款式試穿需收取 NT$100 意向金，成功租借可全額折抵。'
        }
      },
      {
        '@type': 'Question',
        name: '5：服裝可以修改尺寸嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '我們可提供簡易調整（如肩帶長度、腰帶綁法），無法進行大幅修改。若有特殊需求，請提前告知。'
        }
      },
      {
        '@type': 'Question',
        name: '6：租借時間多久？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '一般租期為 3 天，如需延長請提前聯繫。延租每一天加收原租金的 30%。'
        }
      },
      {
        '@type': 'Question',
        name: '7：可以提前預約嗎？最晚什麼時候預約？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '建議提早預約，特別是熱門時段（如萬聖節、聖誕節、尾牙、春酒等），活動前 1 個月預約為佳。'
        }
      },
      {
        '@type': 'Question',
        name: '8：可以取消或更改訂單嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '以下為訂單取消與異動的規定：部分取消：因人為因素取消部分商品，將扣除該商品訂金（租金 50%）。整筆取消：因人為因素取消整筆訂單，所有訂金不予退還。未取件視同取消：若已逾取件時間未到場，系統將視為取消，不另行通知，訂金不退還。訂金不得轉讓或挪用至他人或其他訂單。若遇 天災或不可抗力因素（依政府公告為準）取消活動，可選擇：全額退還訂金，或更改一次租借日期（更改後不得再退費）。'
        }
      },
      {
        '@type': 'Question',
        name: '9：有哪些付款方式？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '提供 現金、銀行轉帳兩種方式。'
        }
      },
      {
        '@type': 'Question',
        name: '10：租借需要支付押金嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '是的。每件服裝道具皆需收取押金，押金為租金的 2 倍，或提供 有效證件（身分證／駕照／健保卡）作為擔保。歸還時確認無損壞與遺失後將全額退還。'
        }
      },
      {
        '@type': 'Question',
        name: '11：是否能開立發票或收據？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '可以。如有需求，請於付款時提供 公司抬頭與統編，我們將開立收據或發票。'
        }
      },
      {
        '@type': 'Question',
        name: '12：租借的服裝道具需要清洗嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '您無需自行清洗，我們將進行專業清潔。但請保持道具基本清潔與乾燥，避免嚴重污損或潮濕。'
        }
      },
      {
        '@type': 'Question',
        name: '13：商品歸還後若有嚴重破損或污漬，會如何處理？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '方式一：自行處理（建議）可將商品送至專業洗衣／修補店處理後再歸還，避免爭議與額外費用。※ 若因污損或破損影響後續使用，將比照逾期費用計算至修復完成為止。方式二：由我們代處理若無法自行處理，我們可協助送洗／修補，所有費用由租借人負擔，恕不接受異議。'
        }
      },
      {
        '@type': 'Question',
        name: '14：如果不小心損壞或遺失道具怎麼辦？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '請立即聯繫我們，依損壞程度或道具原價酌收維修費／賠償金。'
        }
      },
      {
        '@type': 'Question',
        name: '15：若逾期不歸還如何處理？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '將依《刑法第335條》普通侵占罪處理，並協請警方介入。同時求償營業損失。'
        }
      },
      {
        '@type': 'Question',
        name: '16：道具服有什麼需要特別注意？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '所有商品未經同意不得改造或破壞，亦禁止使用膠類（如雙面膠、泡棉膠）與釘書針。表演／道具服多為特殊材質，遇水、淋雨或流汗易產生退色或染色。請務必於使用完後立即晾乾通風。潮濕狀態下請勿將深淺色服裝混放，避免染色。若因未妥善處理導致服裝損壞或他人物品染色，須依情況賠償，本店概不負責。'
        }
      },
      {
        '@type': 'Question',
        name: '17：可以訂製服裝道具嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '我們主要提供現有商品租借服務。如有訂製需求，歡迎聯繫，我們將協助評估或轉介合作單位。'
        }
      },
      {
        '@type': 'Question',
        name: '18：你們有提供配送服務嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '目前以店面取還為主。如需配送，請提前與我們聯繫，將視情況討論配送方式與費用。'
        }
      },
      {
        '@type': 'Question',
        name: '19：你們有提供兒童變裝嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '目前尚未提供 150cm 以下身高之兒童變裝服務，敬請見諒。'
        }
      }
    ]
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '神龍變裝',
    url: 'https://www.wuwish.com.tw/about',
    logo: 'https://www.wuwish.com.tw/logo.png',
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
