/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import { Col, Row, Input, Tabs, PaginationProps, TabsProps, Button, Select, Space } from 'antd';
import { ColumnsType } from 'antd/es/table/interface';
import useAuthenticate from '@/hooks/useAuthenticate';
import { useRouter } from 'next/navigation';
import { deleteProductApi, queryApi } from '@/server';
import DataTable from '@/components/Tables';
import { BusinessType, TableResponse } from '@/interface';
import { Image, Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { Search } = Input;
const { confirm } = Modal;

interface ListType {
  image: any;
  business_type: string;
  category: string;
  name: string;
  title: string;
  number?: string;
  content?: string;
  price?: number;
  status?: string;
  delete: any;
}

interface DefaultParamType {
  current: number;
  pagesize: number;
  business_type: BusinessType;
  loading: boolean;
  activeKey: string;
  pagination: PaginationProps;
  searchItem: string | undefined;
  selectOption: string;
}

const List = () => {
  const isCanViewAdmin = useAuthenticate();
  const router = useRouter();
   const options = [
  {
    value: 'title',
    label: '劇名',
  },
  {
    value: 'name',
    label: '名稱',
  },
];
  const defaultParam = {
    current: 1,
    pagesize: 10,
    business_type: BusinessType.Sell,
    loading: true,
    activeKey: BusinessType.Sell,
    pagination: {},
    searchItem: undefined,
    selectOption: options[0].value
  };
 

  const [filterParams, setFilterParams] = useState<DefaultParamType>(defaultParam);
  const [filterData, setFilterData] = useState<TableResponse>({
    results: [],
    total_count: 0
  });

  const showDeleteConfirm = (image_id: string) => {
    confirm({
      title: '確認是否要刪除',
      icon: <ExclamationCircleFilled />,
      content: '',
      okText: '確認',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteProductApi(image_id);
      },
      onCancel() {
        console.log('取消');
      },
    });
  }; 

  const sellColumns: ColumnsType<ListType> = [
    {
      title: '  圖片',
      dataIndex: 'image',
      key: 'image',
      width: '40',
      render: (image) => <Image width={40} src={`http://127.0.0.1:9527/${image}`} alt="imageUrl" />
    },
    {
      title: '類別',
      dataIndex: 'category',
      key: 'category'
    },
    { title: '劇名', dataIndex: 'title', key: 'title' },
    { title: '名稱', dataIndex: 'name', key: 'name' },
    { title: '內容', dataIndex: 'content', key: 'content' },
    { title: '價格', dataIndex: 'price', key: 'price' },
    { title: '狀態', dataIndex: 'status', key: 'status' },
    { title: '編碼', dataIndex: 'number', key: 'number' },
    {
      title: '功能',
      dataIndex: 'delete',
      key: 'delete',
      render: (image_id) => (
        <Button
          type="primary"
          danger
          onClick={() => showDeleteConfirm(image_id)}
        >
          刪除
        </Button>
      )
    }
  ];

  const rentColumns: ColumnsType<ListType> = [
    {
      title: '  圖片',
      dataIndex: 'image',
      key: 'image',
      width: '40',
      render: (image) => <Image width={40} src={`http://127.0.0.1:9527/${image}`} alt="imageUrl" />
    },
    {
      title: '類別',
      dataIndex: 'category',
      key: 'category'
    },
    { title: '劇名', dataIndex: 'title', key: 'title' },
    { title: '名稱', dataIndex: 'name', key: 'name' },
    { title: '編碼', dataIndex: 'number', key: 'number' },
    {
      title: '刪除',
      dataIndex: 'delete',
      key: 'delete',
      render: (image_id) => (
        <Button
          type="primary"
          danger
          onClick={() => showDeleteConfirm(image_id)}
        >
          刪除
        </Button>
      )
    }
  ];

  const dataSource = filterData.results.map((list) => {
    const {
      image_path,
      image_id,
      info: { business_type, category, name, title, content, price, status, number }
    } = list;
    if (business_type === BusinessType.Sell) {
      return {
        image: image_path,
        category,
        name,
        title,
        content,
        price,
        status,
        number,
        delete: image_id
      };
    } else {
      return {
        image: image_path,
        category,
        name,
        title,
        number,
        delete: image_id
      };
    }
  });


  const onSearch = (value: string | undefined) => {
    setFilterParams({
      ...filterParams,
      loading: false
    });
    // fetch api
    queryApi({
      page_size: filterParams.pagesize,
      page_number: filterParams.current,
      business_type: filterParams.business_type,
      title: filterParams.selectOption === 'title' ? value: undefined ,
      name: filterParams.selectOption === 'name' ? value: undefined,
    }).then((result) => {
      if (result) {
        setFilterData(result);
      }
    });
  };

  useEffect(() => {
    if (filterParams.loading) {
      onSearch(filterParams.searchItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);

  useEffect(() => {
    if (!isCanViewAdmin) {
      router.push('/login');
    }
  }, [isCanViewAdmin, router]);

  const changeTab = (activeKey: string) => {
    console.log(activeKey);
    setFilterParams({
      ...filterParams,
      business_type: activeKey as BusinessType,
      current: 1,
      loading: true
    });
  };

  const items: TabsProps['items'] = [
     {
      key: BusinessType.Rent,
      label: '租借',
      children: (
        <DataTable
          dataSource={dataSource || []}
          columns={rentColumns}
          loading={filterParams.loading}
          onChange={(pagination, _filters, sorter, extra) => {
            if (extra.action === 'paginate') {
              const { current } = pagination;
              setFilterParams({
                ...filterParams,
                current: current || 1
              });
            }
          }}
        />
      )
    },
    {
      key: BusinessType.Sell,
      label: '販售',
      children: (
        <DataTable
          dataSource={dataSource || []}
          columns={sellColumns}
          loading={filterParams.loading}
          onChange={(pagination, _filters, sorter, extra) => {
            if (extra.action === 'paginate') {
              const { current } = pagination;
              setFilterParams({
                ...filterParams,
                current: current || 1
              });
            }
          }}
        />
      )
    }
  ];

  return (
    <div className="p-4 container">
      <Space.Compact className='w-full'>
        <Select className="w-24" defaultValue={filterParams.selectOption} options={options} onSelect={(value) => setFilterParams({
        ...filterParams,
        selectOption: value
      })}/>
      <Search placeholder="請輸入查詢" allowClear className="pb-4" onSearch={onSearch} />
      </Space.Compact>
      <Row justify="center" gutter={[16, 16]}>
        <Col md={24}>
          <Tabs
            type="card"
            defaultActiveKey={BusinessType.Rent}
            onChange={changeTab}
            items={items}
            className='bg-white'
          />
        </Col>
      </Row>
    </div>
  );
};

export default List;
