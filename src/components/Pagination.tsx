'use client';
import React, { FC } from 'react';
import type { PaginationProps } from 'antd';
import { Pagination as AntdPagination } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import pagination_bg from '@/assets/img/pagination_bg.png';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
interface PaginationPropsCustomize {
  current: number;
  total?: number;
  onChange: PaginationProps['onChange'];
}

const Pagination: FC<PaginationPropsCustomize> = ({ current, total, onChange }) => {
  return (
    <AntdPagination
      current={current}
      onChange={onChange}
      total={total}
      pageSize={25}
      showSizeChanger={false}
      itemRender={(page, type) => {
        // type: 'page' | 'prev' | 'next' | 'jump-prev'| 'jump-next'
        if (type === 'jump-prev') {
          return (
            <div className="relative">
              <Image src={pagination_bg} width={53} height={61} alt="pagination" />
              <p className="ab-center font-timer font-bold text-xl">
                <MdKeyboardDoubleArrowLeft />
              </p>
            </div>
          );
        }
        if (type === 'jump-next') {
          return (
            <div className="relative">
              <Image src={pagination_bg} width={53} height={61} alt="pagination" />
              <p className="ab-center font-timer font-bold text-xl">
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
                'ab-center font-timer font-bold text-xl',
                page === 1 && '!left-[43%]'
              )}
            >
              {page}
            </p>
          </div>
        );
      }}
    />
  );
};

export default Pagination;
