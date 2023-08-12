import React, { FC } from 'react';
import Image from 'next/image';

// TODO define data type
interface DetailCardProps {
  src: any;
}

const DetailCard: FC<DetailCardProps> = (props) => {
  const { src } = props;
  return (
    <>
      <div className="w-full sm:w-2/4 f-center">
        <Image src={src} alt="TBC" />
      </div>
      <div className="space-y-3 pt-5 text-white font-cubic text-3xl text-center sm:text-left">
        <p>
          <span className="">編號 : </span>
          <span className="">xxxxx</span>
        </p>
        <p>
          <span className="">類別 : </span>
          <span className="">xxxxx</span>
        </p>
        <p>
          <span className="">劇名 : </span>
          <span className="">xxxxx</span>
        </p>
        <p>
          <span className="">名稱 : </span>
          <span className="">xxxxx</span>
        </p>
        <p className="!mb-20">
          <span className="">內容 : </span>
          <span className="">xxxxx</span>
        </p>
        <p>
          <span className="">價格 : </span>
          <span className="">xxxxx</span>
        </p>
        <p>
          <span className="">狀態 : </span>
          <span className="">xxxxx</span>
        </p>
        <p>
          <span className="">情境: : </span>
          <span className="">xxxxx</span>
        </p>
      </div>
    </>
  );
};

export default DetailCard;
