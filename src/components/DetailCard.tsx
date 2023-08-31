import React, { FC } from 'react';
import Image from 'next/image';

interface DetailCardProps {
  src: any;
  data: any;
}

const DetailCard: FC<DetailCardProps> = (props) => {
  const { src, data } = props;
  const { category, content, name, number, price, status, title } = data;
  return (
    <>
      <div className="w-full sm:w-2/4 f-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${src}`}
          alt="TBC"
          width={460}
          height={500}
        />
      </div>
      <div className="space-y-3 pt-5 text-white font-cubic text-3xl text-center sm:text-left">
        <p>
          <span>編號 : </span>
          <span>{number}</span>
        </p>
        <p>
          <span>類別 : </span>
          <span>{category}</span>
        </p>
        <p>
          <span>劇名 : </span>
          <span>{title}</span>
        </p>
        <p>
          <span>名稱 : </span>
          <span>{name}</span>
        </p>
        <p className="!mb-10">
          <span>內容 : </span>
          <span>{content}</span>
        </p>
        <p>
          <span>價格 : </span>
          <span>{price}</span>
        </p>
        <p>
          <span>狀態 : </span>
          <span>{status}</span>
        </p>
      </div>
    </>
  );
};

export default DetailCard;
