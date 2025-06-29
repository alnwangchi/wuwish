import React, { FC } from 'react';
import Image from 'next/image';
import { enToNameMap } from '@/constance';
import { generateImgAlt } from '@/util';

interface DetailCardProps {
  src: any;
  data: any;
}

const DetailCard: FC<DetailCardProps> = (props) => {
  const { src, data } = props;
  const { category, content, name, number, price, status, title } = data;

  return (
    <>
      <div className="f-center w-full sm:w-2/4">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${src}`}
          alt={generateImgAlt('服裝租借 ', category, title, name)}
          width={460}
          height={500}
        />
      </div>
      <div className="space-y-3 pt-5 text-center font-cubic text-2xl text-white sm:text-left sm:text-3xl">
        <p>
          <span>編號 : </span>
          <span>{number}</span>
        </p>
        <p>
          <span>類別 : </span>
          <span>{enToNameMap[category]}</span>
        </p>
        <p>
          <span>劇名 : </span>
          <span>{title}</span>
        </p>
        <p>
          <span>名稱 : </span>
          <span>{name}</span>
        </p>
        {content && (
          <p className="!mb-10">
            <span>內容 : </span>
            <span>{content}</span>
          </p>
        )}
        {price && (
          <p>
            <span>價格 : </span>
            <span>{price}</span>
          </p>
        )}
        {status && (
          <p>
            <span>狀態 : </span>
            <span>{status}</span>
          </p>
        )}
      </div>
    </>
  );
};

export default DetailCard;
