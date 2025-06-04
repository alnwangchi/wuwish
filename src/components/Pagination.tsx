'use client';
import React, { FC, useState } from 'react';
import type { PaginationProps } from 'antd';
import { Pagination as AntdPagination } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import pagination_bg from '@/assets/img/pagination_bg.png';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { isNumber } from 'lodash';
interface PaginationPropsCustomize {
  current: number;
  total?: number;
  onChange: PaginationProps['onChange'];
}
const DEFAULT_SIZE = 25;

const Pagination: FC<PaginationPropsCustomize> = ({ current, total = 0, onChange }) => {
  const [jumpValue, setJumpValue] = useState('');

  const handleQuickJump = () => {
    const page = Number(jumpValue);
    if (page && page > 0 && onChange) {
      onChange(page, DEFAULT_SIZE);
      setJumpValue('');
    }
  };
  return (
    <div className="flex gap-2">
      <AntdPagination
        current={current}
        onChange={onChange}
        total={total}
        pageSize={DEFAULT_SIZE}
        showSizeChanger={false}
        // showQuickJumper={{
        //   goButton: <Image src={pagination_bg} width={53} height={61} alt="pagination" />
        // }}
        itemRender={(page, type) => {
          // type: 'page' | 'prev' | 'next' | 'jump-prev'| 'jump-next'
          if (type === 'jump-prev') {
            return (
              <div className="relative">
                <Image src={pagination_bg} width={53} height={61} alt="pagination" />
                <p className="ab-center font-timer text-xl font-bold">
                  <MdKeyboardDoubleArrowLeft />
                </p>
              </div>
            );
          }
          if (type === 'jump-next') {
            return (
              <div className="relative">
                <Image src={pagination_bg} width={53} height={61} alt="pagination" />
                <p className="ab-center font-timer text-xl font-bold">
                  <MdKeyboardDoubleArrowRight />
                </p>
              </div>
            );
          }
          // 尚不處理上下一頁按鈕
          if (type !== 'page') return null;
          return (
            <div className="relative">
              <Image src={pagination_bg} width={53} height={61} alt="pagination" />
              <p
                // page === 1 是為了 timer 這個爛字型佔位個別調整
                className={clsx(
                  'ab-center font-timer text-xl font-bold',
                  page === 1 && '!left-[43%]'
                )}
              >
                {page}
              </p>
            </div>
          );
        }}
      />
      {total > DEFAULT_SIZE * 5 && (
        <div className="custom-quick-jumper flex items-center justify-center gap-2 text-white">
          <span>跳至</span>
          <div className="relative">
            <Image
              src={pagination_bg}
              width={53}
              height={61}
              alt="pagination"
              className="hue-rotate-[45deg] saturate-200"
            />
            <input
              className="ab-center w-full border-none bg-transparent text-center font-timer text-xl font-bold outline-none"
              value={jumpValue}
              maxLength={2}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value) && Number(value) <= total) {
                  setJumpValue(value);
                }
              }}
            />
          </div>
          <span>頁</span>
          <button
            className="relative cursor-pointer"
            onClick={() => {
              if (Number(jumpValue) > 0) {
                handleQuickJump();
              }
            }}
          >
            <Image
              src={pagination_bg}
              width={53}
              height={61}
              alt="pagination"
              className="hue-rotate-[45deg] saturate-200"
            />
            <p className="ab-center font-timer text-xl font-bold">Go</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
