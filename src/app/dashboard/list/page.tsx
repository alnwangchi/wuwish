/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import { Col, Row, Table, Input } from 'antd';
import { ColumnsType, SorterResult } from 'antd/es/table/interface';
import useAuthenticate from '@/hooks/useAuthenticate';
import { useRouter } from 'next/navigation';

const { Search } = Input;

interface ListType {
  category: string;
  name: string;
  title: string;
  content: string;
  price: number;
  status: string;
  situation: string;
  image: string;
}

interface DefaultPageParamType {
  current?: number;
  pagesize?: number;
  sortField?: string;
  sortType?: string;
}

enum sort {
  asc = 'asc',
  desc = 'desc',
}

const List = () => {
  const isCanViewAdmin = useAuthenticate();
  const router = useRouter();
  const MockData = [] as ListType[];
  const defaultPageParam = {
    current: 1,
    pagesize: 10,
    sort: sort.asc,
    sortField: 'category',
  };

  const [filterParams, setFilterParams] =
    useState<DefaultPageParamType>(defaultPageParam);

  const columns: ColumnsType<ListType> = [
    {
      title: '類別',
      dataIndex: 'category',
      key: 'category',
    },
    { title: '劇名', dataIndex: 'name', key: 'name' },
    { title: '名稱', dataIndex: 'title', key: 'title' },
    { title: '內容', dataIndex: 'content', key: 'content' },
    { title: '價格', dataIndex: 'price', key: 'price' },
    { title: '狀態', dataIndex: 'status', key: 'status' },
    {
      title: '  圖片',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt='imageUrl' />,
    },
    { title: '情境', dataIndex: 'situation', key: 'situation' },
  ];

  const dataSource = MockData.map((list) => {
    const { category, name, title, content, price, status, image, situation } =
      list;
    return {
      category,
      name,
      title,
      content,
      price,
      status,
      image,
      situation,
    };
  });

  const onSearch = (value: string) => {
    console.log('search', value);
    // fetch api
  };

  useEffect(() => {
    if (!isCanViewAdmin) {
      router.push('/login');
    }
  }, [isCanViewAdmin, router]);

  return (
    <div className='p-4' style={{ minHeight: '50vh' }}>
      <Search
        placeholder='請輸入查詢'
        allowClear
        className='pb-4'
        onSearch={onSearch}
      />
      <Row justify='center' gutter={[16, 16]}>
        <Col md={24}>
          <Table
            rowKey={() => `${Math.random()}`}
            dataSource={dataSource}
            columns={columns}
            onChange={(pagination, filters, sorter, extra) => {
              if (extra.action === 'sort') {
                const { field, order } = sorter as SorterResult<object>;
                setFilterParams({
                  ...filterParams,
                  sortType: order ? sort.asc : undefined,
                  sortField: order ? (field as string) : undefined,
                });
              }
              if (extra.action === 'paginate') {
                const { current } = pagination;
                setFilterParams({
                  ...filterParams,
                  current,
                });
                // dispatch(getSearchList({query: router.query.id as string , page: current || 1}));
              }
            }}
            pagination={{
              current: filterParams.current,
              total: MockData.length,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              defaultPageSize: 10,
              showQuickJumper: false,
              showSizeChanger: false,
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default List;
