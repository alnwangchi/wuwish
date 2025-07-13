export const FAQ = [
  {
    category: '關於租借',
    items: [
      {
        question: '1：租借流程為何？',
        answer: (
          <>
            <p>
              瀏覽與選擇：您可在網站瀏覽或使用搜尋功能，亦可參考 IG 社群上的穿搭範例與獨家服裝。
            </p>
            <p>
              預約與確認：記錄您喜歡的款式名稱／代號，並與我們聯繫確認租借日期、時間與訂金金額。
            </p>
            <p>付款與取件：支付租金尾款與押金（或提供有效證件）後，即可取走預訂的服裝／道具。</p>
            <p>歸還與點交：依約定時間歸還商品，點交確認無誤後退還押金（或歸還證件）。</p>
          </>
        )
      },
      {
        question: '2：如何租借服裝／道具？',
        answer: (
          <p>
            您可透過網站底部連結進行檔期詢問、費用查詢與預約。訂單確認後，每套服裝需預繳{' '}
            <span className="text-red-700">50%</span> 訂金；如取消訂單，訂金將不予退還。
          </p>
        )
      },
      {
        question: '3：租借費用如何計算？',
        answer: (
          <p>
            租金依款式與天數而定，一般款式約 NT$300–900，精緻款式 NT$1,000
            起。詳細費用請洽詢客服人員。
          </p>
        )
      },
      {
        question: '4：現場是否可以試穿？',
        answer: (
          <>
            <p>
              我們提供<span className="text-red-700">限量試穿服務</span>
              ，歡迎有租借意願的客人洽詢現場工作人員協助。
            </p>
            <p>
              為維持服務品質與流程順暢，<span className="text-red-700">恕不提供純試穿服務</span>
              ，敬請見諒。
            </p>
            <p>
              <span className="text-red-700">繁忙期間</span>
              （如萬聖節、春酒旺季）<span className="text-red-700">將暫停</span>現場試穿服務。
            </p>
            <p>
              部分<span className="text-red-700">高價或特殊款式</span>試穿需收取 NT$100
              意向金，成功租借可全額折抵。
            </p>
          </>
        )
      },
      {
        question: '5：服裝可以修改尺寸嗎？',
        answer: (
          <p>
            我們可提供<span className="text-red-700">簡易調整</span>
            （如肩帶長度、腰帶綁法），無法進行大幅修改。若有特殊需求，請提前告知。
          </p>
        )
      },
      {
        question: '6：租借時間多久？',
        answer: (
          <p>
            一般租期為 <span className="text-red-700">3 天</span>
            ，如需延長請提前聯繫。延租每一天加收原租金的 <span className="text-red-700">30%</span>。
          </p>
        )
      },
      {
        question: '7：可以提前預約嗎？最晚什麼時候預約？',
        answer: (
          <p>
            建議提早預約，特別是熱門時段（如萬聖節、聖誕節、尾牙、春酒等），
            <span className="text-red-700">活動前 1 個月預約</span>為佳。
          </p>
        )
      },
      {
        question: '8：可以取消或更改訂單嗎？',
        answer: (
          <>
            <p>
              <strong>以下為訂單取消與異動的規定：</strong>
            </p>
            <p>
              <strong>部分取消：</strong> 因人為因素取消部分商品，將扣
              <span className="text-red-700">除該商品訂金（租金 50%）</span>。
            </p>
            <p>
              <strong>整筆取消：</strong> 因人為因素取消整筆訂單，
              <span className="text-red-700">所有訂金不予退還</span>。
            </p>
            <p>
              <strong>未取件視同取消：</strong> 若已逾取件時間未到場，系統將視為取消，
              <span className="text-red-700">不另行通知，訂金不退還</span>。
            </p>
            <p>訂金不得轉讓或挪用至他人或其他訂單。</p>
            <p>
              若遇 <strong>天災或不可抗力因素（依政府公告為準）</strong> 取消活動，可選擇：
            </p>
            <ul className="list-disc pl-6">
              <li>全額退還訂金</li>
              <li>更改一次租借日期（更改後不得再退費）</li>
            </ul>
          </>
        )
      }
    ]
  },
  {
    category: '付款與押金',
    items: [
      {
        question: '9：有哪些付款方式？',
        answer: <p>提供 現金、銀行轉帳兩種方式。</p>
      },
      {
        question: '10：租借需要支付押金嗎？',
        answer: (
          <p>
            是的。每件服裝道具皆需收取押金，押金為租金的 <span className="text-red-700">2 倍</span>
            ，或提供{' '}
            <strong>
              <span className="text-red-700">有效證件（身分證／駕照／健保卡</span>）
            </strong>{' '}
            作為擔保。歸還時確認無損壞與遺失後將全額退還。
          </p>
        )
      },
      {
        question: '11：是否能開立發票或收據？',
        answer: (
          <p>
            可以。如有需求，請於付款時提供 <span className="text-red-700">公司抬頭與統編</span>
            ，我們將開立收據或發票。
          </p>
        )
      }
    ]
  },
  {
    category: '清潔與賠償',
    items: [
      {
        question: '12：租借的服裝道具需要清洗嗎？',
        answer: (
          <p>
            您<span className="text-red-700">無需自行清洗</span>
            ，我們將進行專業清潔。但請保持道具基本清潔與乾燥，避免嚴重污損或潮濕。
          </p>
        )
      },
      {
        question: '13：商品歸還後若有嚴重破損或污漬，會如何處理？',
        answer: (
          <>
            <p>
              <strong>方式一：自行處理（建議）</strong>
            </p>
            <p>
              可將商品送至<span className="text-red-700">專業洗衣／修補店</span>
              處理後再歸還，避免爭議與額外費用。
            </p>
            <p>
              ※ 若因污損或破損影響後續使用，將<span className="text-red-700">比照逾期費用</span>
              計算至修復完成為止。
            </p>
            <p>
              <strong>方式二：由我們代處理</strong>
            </p>
            <p>
              若無法自行處理，我們可協助送洗／修補，
              <span className="text-red-700">所有費用由租借人負擔，恕不接受異議</span>。
            </p>
          </>
        )
      },
      {
        question: '14：如果不小心損壞或遺失道具怎麼辦？',
        answer: <p>請立即聯繫我們，依損壞程度或道具原價酌收維修費／賠償金。</p>
      },
      {
        question: '15：若逾期不歸還如何處理？',
        answer: (
          <p>
            將依《刑法第335條》普通侵占罪處理，
            <span className="text-red-700">並協請警方介入。同時求償營業損失</span>。
          </p>
        )
      },
      {
        question: '16：道具服有什麼需要特別注意？',
        answer: (
          <>
            <p>
              所有商品<span className="text-red-700">未經同意不得改造或破壞</span>，
              <span className="text-red-700">亦禁止使用膠類（如雙面膠、泡棉膠）與釘書針</span>。
            </p>
            <p>
              表演／道具服多為特殊材質，
              <span className="text-red-700">遇水、淋雨或流汗易產生退色或染色</span>
              。請務必於使用完後<span className="text-red-700">立即晾乾通風</span>。
            </p>
            <p>
              <span className="text-red-700">潮濕狀態下請勿將深淺色服裝混放</span>
              ，避免染色。若因未妥善處理導致服裝損壞或他人物品染色，須依情況賠償，本店概不負責。
            </p>
          </>
        )
      }
    ]
  },
  {
    category: '其他服務',
    items: [
      {
        question: '17：可以訂製服裝道具嗎？',
        answer: (
          <p>
            我們主要提供現有商品租借服務。如有訂製需求，歡迎聯繫，我們將協助評估或轉介合作單位。
          </p>
        )
      },
      {
        question: '18：你們有提供配送服務嗎？',
        answer: <p>目前以店面取還為主。如需配送，請提前與我們聯繫，將視情況討論配送方式與費用。</p>
      },
      {
        question: '19：你們有提供兒童變裝嗎？',
        answer: <p>目前尚未提供 150cm 以下身高之兒童變裝服務，敬請見諒。</p>
      }
    ]
  }
];
