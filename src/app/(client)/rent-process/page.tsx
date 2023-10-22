import Hexagon from '@/components/Hexagon';
import React from 'react';
import Image from 'next/image';
import step2 from '@/assets/img/step2.png';
import step3 from '@/assets/img/step3.png';
import step4 from '@/assets/img/step4.png';
import rental_bg from '@/assets/img/rental_bg.png';
import { FaInstagram } from 'react-icons/fa6';
import Arrows from '@/components/Arrows';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '神龍變裝租借流程說明',
  description: '歡迎來到神龍變裝，請詳閱以下租借的流程，歡迎隨時透過 FB IG LINE 聯繫我們哦'
};

const page = () => {
  return (
    <div>
      <div className="container f-center flex-col">
        {/* AB版 */}
        <div className="py-20 hidden sm:block">
          <div className="flex items-center lg:gap-5 gap-3">
            <a target="_blank" href="https://www.instagram.com/wu_wish88/">
              <Hexagon>
                <div>
                  <p>詢問估價</p>
                  <FaInstagram className="mx-auto text-4xl" />
                </div>
              </Hexagon>
            </a>
            <Arrows />
            <Link href="/">
              <Hexagon>
                <div>
                  <p>試裝</p>
                  <Image src={step2} alt="試裝" />
                </div>
              </Hexagon>
            </Link>
            <Arrows />
            <Hexagon>
              <div>
                <p>付訂金</p>
                <p className="mb-2">保留服裝</p>
                <Image src={step3} className="pl-2" width={80} alt="試裝" />
              </div>
            </Hexagon>
          </div>
          <div className="flex justify-center items-center lg:gap-5 gap-3">
            {/* 佔位置 workaround */}
            <div className="flex items-center lg:gap-5 gap-3 h-[100px] invisible">
              <Hexagon />
              <Arrows />
              <Hexagon />
              <Arrows />
            </div>
            <Arrows direction="down" />
          </div>
          <div className="flex items-center lg:gap-5 gap-3">
            <Hexagon>
              <div>
                <p>歸還檢查</p>
                <p>領回</p>
                <p>押金or證件</p>
              </div>
            </Hexagon>
            <Arrows direction="left" />
            <Hexagon>
              <div>
                <p>活動執行</p>
              </div>
            </Hexagon>
            <Arrows direction="left" />
            <Hexagon>
              <div>
                <p>領服裝</p>
                <p>付尾款</p>
                <p className="mb-2">押金or證件</p>
                <Image src={step4} className="pl-2" width={100} alt="試裝" />
              </div>
            </Hexagon>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:hidden">
          <a target="_blank" href="https://www.instagram.com/wu_wish88/">
            <Hexagon>
              <div>
                <p>詢問估價</p>
                <FaInstagram className="mx-auto text-4xl" />
              </div>
            </Hexagon>
          </a>
          <Link href="/">
            <Hexagon>
              <div>
                <p>試裝</p>
                <Image src={step2} alt="試裝" />
              </div>
            </Hexagon>
          </Link>
          <Hexagon>
            <div>
              <p>付訂金</p>
              <p className="mb-2">保留服裝</p>
              <Image src={step3} width={45} alt="試裝" />
            </div>
          </Hexagon>
          <Hexagon>
            <div>
              <p>領服裝</p>
              <p>付尾款</p>
              <p className="mb-2">押金or證件</p>
              <Image src={step4} className="pl-2" width={100} alt="試裝" />
            </div>
          </Hexagon>
          <Hexagon>
            <div>
              <p>活動執行</p>
            </div>
          </Hexagon>
          <Hexagon>
            <div>
              <p>歸還檢查</p>
              <p>領回</p>
              <p>押金or證件</p>
            </div>
          </Hexagon>
        </div>
        <div className="relative w-full sm:py-0">
          <Image src={rental_bg} className="w-full hidden sm:block" alt="deco" />
          <div className="mx-auto sm:ab-center w-3/4 font-cubic leading-loose text-white text-clamp2">
            <h2 className="text-center mb-10 clamp1">租借細則</h2>
            <p>
              1.訂單確認後，每套服裝需先預繳1/2之訂金，
              <span className="text-red-600">如訂單取消，訂金不退還。</span>
            </p>
            <p>2.務必在租借期限內歸還，每逾期一天加收原租金之30%。</p>
            <p>3.服裝經由客戶確認領取後，恕不退費或更換，本公司亦不負責其他相關責任。</p>
            <p>
              4.本公司所有商品未經同意切勿變更破壞更
              <span className="text-red-600">不可使用各種膠類</span> (例：雙面膠、
              泡棉膠)以及釘書針。 違者若無法將其還原，須賠償租金的2倍，若有破損遺失，
              按租金4倍賠償。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
