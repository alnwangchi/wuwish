import React, { FC } from 'react';
import type { PaginationProps } from 'antd';
import { Pagination as AntdPagination } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import pagination_bg from '@/assets/img/pagination_bg.png';

interface PaginationPropsCustomize {
  current: number;
  onChange: PaginationProps['onChange'];
}

const Pagination: FC<PaginationPropsCustomize> = ({ current, onChange }) => {
  return (
    <AntdPagination
      current={current}
      onChange={onChange}
      total={50}
      itemRender={(page, type) => {
        // console.log({ page, type });
        // type: 'page' | 'prev' | 'next' 暫只處理 page
        if (type !== 'page') return null;
        return (
          <div className='relative'>
            <Image src={pagination_bg} width={53} height={61} alt='pagination' />
            <p
              // page === 1 是為了 timer 這個爛字型佔位個別調整
              className={clsx(
                'ab-center font-timer font-bold text-xl',
                page === 1 && '!left-[43%]',
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
