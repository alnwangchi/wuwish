import Image from 'next/image';

import icon1 from '@/assets/img/faq_icon-1.png';
import icon2 from '@/assets/img/faq_icon-2.png';
import icon3 from '@/assets/img/faq_icon-3.png';
import icon4 from '@/assets/img/faq_icon-4.png';

export const FAQ = [
  {
    icon: <Image src={icon1} alt="關於租借 icon" />,
    category: '關於租借',
    items: [
      {
        question: '1：租借流程為何？',
        answer: (
          <>
            <p>
              <span className="font-bold underline underline-offset-4">瀏覽與選擇</span>
              ：您可在網站瀏覽或使用搜尋功能，亦可參考 IG 社群上的穿搭範例與獨家服裝。
            </p>
            <p>
              <span className="font-bold underline underline-offset-4">預約與確認</span>
              ：記錄您喜歡的款式名稱／代號，並與我們聯繫確認租借日期、時間與訂金金額。
            </p>
            <p>
              <span className="font-bold underline underline-offset-4">付款與取件</span>
              ：支付租金尾款與押金（或提供有效證件）後，即可取走預訂的服裝／道具。
            </p>
            <p>
              <span className="font-bold underline underline-offset-4">歸還與點交</span>
              ：依約定時間歸還商品，點交確認無誤後退還押金（或歸還證件）。
            </p>
          </>
        )
      },
      {
        question: '2：如何租借服裝／道具？',
        answer: (
          <p>
            您可透過網站底部連結進行檔期詢問、費用查詢與預約。訂單確認後，每套服裝需預繳
            <span className="text-primary-orange">50% 訂金</span>
            ；如<span className="text-primary-orange">取消訂單，訂金將不予退還</span>。
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
              <span className="font-bold underline underline-offset-4">限量試穿服務</span>
              ：歡迎有租借意願的客人洽詢現場工作人員，我們將依現場狀況提供協助。
            </p>
            <p>
              <span className="font-bold underline underline-offset-4">純試穿服務</span>
              ：為維持服務品質與流程順暢，恕不提供「僅試穿不租借」的服務，敬請見諒。
            </p>
            <p>
              <span className="font-bold underline underline-offset-4">繁忙期間調整</span>
              ：在萬聖節、尾牙表演等旺季期間，將視情況暫停現場試穿服務，敬請理解。
            </p>
            <p>
              <span className="font-bold underline underline-offset-4">特殊款式規範</span>
              ：部分<span className="text-primary-orange">高價或特殊款式</span>試穿需收取 NT$100
              意向金，成功租借可全額折抵租金。
            </p>
          </>
        )
      },
      {
        question: '5：服裝可以修改尺寸嗎？',
        answer: (
          <p>
            神龍變裝可提供
            <span className="text-primary-orange">簡易調整</span>
            (如肩帶長度、腰帶綁法)，無法進行大幅修改。若有特殊需求，請提前告知。
          </p>
        )
      },
      {
        question: '6：租借時間多久？',
        answer: (
          <p>
            一般租期為 <span className="text-primary-orange">3 天</span>
            ，如需延長請提前聯繫。延租每一天加收原租金的{' '}
            <span className="text-primary-orange">30%</span>。
          </p>
        )
      },
      {
        question: '7：可以提前預約嗎？',
        answer: (
          <p>
            建議提早預約，特別是熱門時段(如萬聖節裝扮、聖誕節裝扮、 尾牙裝扮、尾牙春酒等)，
            <span className="text-primary-orange">活動前 1 個月預約</span>
            為佳。
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
              <span className="font-bold underline underline-offset-4">部分取消</span>
              ：因人為因素取消部分商品，將<span className="text-primary-orange">扣除</span>
              該商品<span className="text-primary-orange">訂金（租金 50%）</span>。
            </p>
            <p>
              <span className="font-bold underline underline-offset-4">整筆取消</span>
              ：因人為因素取消整筆訂單，
              <span className="text-primary-orange">所有訂金不予退還</span>。
            </p>
            <p>
              <span className="font-bold underline underline-offset-4">未取件視同取消</span>
              ：若已<span className="text-primary-orange">逾取件時間</span>
              未到場，系統將視為取消，
              <span className="text-primary-orange">不另行通知，訂金不退還</span>。
            </p>
            <p>
              <span className="font-bold underline underline-offset-4">訂金不得轉讓或挪用</span>
              ：訂金不得轉讓給他人或挪用至其他訂單。
            </p>
            <p>
              <span className="font-bold underline underline-offset-4">不可抗力因素</span>
              ：若因天災或不可抗力因素（依政府公告為準）導致活動取消，您可選擇以下任一方案。
            </p>

            <ul className="list-disc pl-5">
              <li>1. 全額退還訂金</li>
              <li>2. 更改一次租借日期（更改後不得再退費）</li>
            </ul>
          </>
        )
      }
    ]
  },
  {
    icon: <Image src={icon2} alt="付款與押金 icon" />,
    category: '付款與押金',
    items: [
      {
        question: '9：有哪些付款方式？',
        answer: (
          <p>
            提供<span className="text-primary-orange"> 現金、銀行轉帳</span>兩種方式。
          </p>
        )
      },
      {
        question: '10：租借需要支付押金嗎？',
        answer: (
          <>
            <p>
              <span className="font-bold underline underline-offset-4">押金金額</span>
              ：每件商品需支付「租金的 2
              倍」作為押金；或提供有效證件（身分證／駕照／健保卡）作為擔保，二擇一即可。
            </p>
            <p>
              <span className="font-bold underline underline-offset-4">押品替代</span>
              ：可提供一份有效證件（身分證／駕照／健保卡）作為擔保，免收押金。
            </p>
            <p>
              <span className="font-bold underline underline-offset-4">退還規則</span>
              ：歸還時經現場確認商品無損壞或遺失，押金將全額退還。
            </p>
          </>
        )
      },
      {
        question: '11：是否能開立發票或收據？',
        answer: (
          <p>
            可以。如果需要發票或收據，請在付款時提供
            <span className="text-primary-orange">公司抬頭與統編</span>
            我們會幫您開立。
          </p>
        )
      }
    ]
  },
  {
    icon: <Image src={icon3} alt="清潔與賠償 icon" />,
    category: '清潔與賠償',
    items: [
      {
        question: '12：租借的服裝道具需要清洗嗎？',
        answer: (
          <p>
            不需自行清洗。神龍變裝會於每次租借後進行專業
            <span className="text-primary-orange">服裝清潔與 道具消毒</span>，讓您安心使用 Cosplay
            與派對服裝。請協助保持 <span className="text-primary-orange">基本整潔與乾燥</span>
            ，避免嚴重污損或異味，以確保下㇐位租借人 同樣有良好體驗。
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
            <p>您可將商品送至專業洗衣或修補店處理後再歸還，以避免爭議 與額外費用。</p>
            <p>※ 若污損/破損影響商品後續使用，將比照逾期計費方式， 計算至修復完成為止。</p>
            <p>
              <strong>方式二：由我們代處理</strong>
            </p>
            <p>
              若無法自行清洗或修補，我們可代為送洗或修復，
              <span className="text-primary-orange">相關費用將 由租借人全額負擔</span>
              ，恕不接受異議。
            </p>
          </>
        )
      },
      {
        question: '14：如果不小心損壞或遺失道具怎麼辦？',
        answer: (
          <>
            <p>
              若租借期間不慎發生<span className="text-primary-orange">損壞或遺失</span>，請
              <span className="text-primary-orange">立即聯繫我們</span>。
            </p>
            <p>
              我們將依道具的<span className="text-primary-orange">損壞情況或原價</span>酌情收取
              <span className="text-primary-orange">維修費或賠償金</span>，以維護雙方權益。
            </p>
          </>
        )
      },
      {
        question: '15：若逾期不歸還如何處理？',
        answer: (
          <>
            <p>若未於約定時間內歸還商品且無事先通知，我們將視情況啟動以下處理程序:</p>
            <ul className="emoji-list">
              <li>依實際逾期天數計算租金與營業損失費用</li>
              <li>
                多次聯繫無回應或故意不還者，將依《刑法第 335 條》普通侵占罪報警處理，並協請警方介入
              </li>
              <li>同時保留求償相關損失(包含道具成本與營業損失)之法律權利</li>
            </ul>
          </>
        )
      },
      {
        question: '16：道具服有什麼需要特別注意？',
        answer: (
          <>
            <p>
              <span className="font-bold underline underline-offset-4">🚫 禁止改造或破壞</span>
              ：所有商品未經同意不得自行修改、剪裁或破壞。
              <span className="text-primary-orange">嚴禁使用膠類</span>
              （如雙面膠、泡棉膠）及釘書針等會造成損傷的物品。
            </p>
            <p>
              <span className="font-bold underline underline-offset-4">🚫 避免染色損壞</span>
              ：潮濕狀態下請<span className="text-primary-orange">勿將深色與淺色服裝混放</span>
              ，以免發生染色問題。若因未妥善處理導致服裝損壞或染色至他人物品，須依情況賠償，本店不負責相關損失。
            </p>
            <p>
              <span className="font-bold underline underline-offset-4">⚠️ 特殊材質須小心保養</span>
              ：部分表演服與道具服為特殊材質，易因
              <span className="text-primary-orange">流汗、淋雨或接觸水分</span>
              造成退色或染色。請於使用後
              <span className="text-primary-orange">盡速晾乾並保持通風</span>，以延長使用壽命。
            </p>
          </>
        )
      }
    ]
  },
  {
    icon: <Image src={icon4} alt="其他服務 icon" />,
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
        answer: (
          <p>
            目前尚<span className="text-primary-orange">未提供 150cm 以下身高</span>
            之兒童變裝服務，敬請見諒。
          </p>
        )
      }
    ]
  }
];
