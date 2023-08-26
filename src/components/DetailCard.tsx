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
        <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/${src}`} alt="TBC" width={460} height={500} />
      </div>
      <div className="space-y-3 pt-5 text-white font-cubic text-3xl text-center sm:text-left">
        <p>
          <span className="">編號 : </span>
          <span className="">{number}</span>
        </p>
        <p>
          <span className="">類別 : </span>
          <span className="">{category}</span>
        </p>
        <p>
          <span className="">劇名 : </span>
          <span className="">{title}</span>
        </p>
        <p>
          <span className="">名稱 : </span>
          <span className="">{name}</span>
        </p>
        <p className="!mb-20">
          <span className="">內容 : </span>
          <span className="">{content}</span>
        </p>
        <p>
          <span className="">價格 : </span>
          <span className="">{price}</span>
        </p>
        <p>
          <span className="">狀態 : </span>
          <span className="">{status}</span>
        </p>
      </div>
    </>
  );
};

export default DetailCard;
