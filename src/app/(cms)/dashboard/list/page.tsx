/* eslint-disable @next/next/no-img-element */
'use client';
import EditModal from '@/components/EditModal';
import DataTable from '@/components/Tables';
import useAuthenticate from '@/hooks/useAuthenticate';
import { BusinessType, ProductSearchResponse } from '@/interface';
import { deleteMultipleProductApi, deleteProductApi, queryApi } from '@/server';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  Button,
  Card,
  Image,
  Input,
  Modal,
  PaginationProps,
  Select,
  Space,
  Tabs,
  TabsProps
} from 'antd';
import { ColumnsType } from 'antd/es/table/interface';
import { useRouter } from 'next/navigation';
import React, { useEffect, useId, useRef, useState } from 'react';

const { Search } = Input;
const { confirm } = Modal;

export interface ListType {
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
  image_id?: string;
}

interface DefaultParamType {
  rentCurrent: number;
  sellCurrent: number;
  pagesize: number;
  business_type: BusinessType;
  loading: boolean;
  activeKey: string;
  pagination: PaginationProps;
  searchValue: string | undefined;
  selectOption: string;
}

enum DeleteType {
  Single = 'single',
  Multiple = 'multiple'
}

const options = [
  {
    value: 'title',
    label: '劇名'
  },
  {
    value: 'name',
    label: '名稱'
  },
  {
    value: 'number',
    label: '編號'
  }
];
const defaultParam = {
  rentCurrent: 1,
  sellCurrent: 1,
  pagesize: 10,
  business_type: BusinessType.Rent,
  loading: true,
  activeKey: BusinessType.Rent,
  pagination: {},
  searchValue: undefined,
  selectOption: options[0].value
};

const List = () => {
  const isCanViewAdmin = useAuthenticate();
  const router = useRouter();

  const [filterParams, setFilterParams] = useState<DefaultParamType>(defaultParam);
  const [filterData, setFilterData] = useState<ProductSearchResponse>({
    results: [],
    total_count: 0
  });
  const [showBatchDeleteBtn, setShowBatchDeleteBtn] = useState(false);
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTargetData, setEditTargetData] = useState<ListType | undefined>();
  // to force rerender
  const [key, setKey] = useState('');

  const showDeleteConfirm = ({
    image_id,
    image_ids,
    type
  }: {
    image_id?: string;
    image_ids?: string[];
    type: DeleteType;
  }) => {
    confirm({
      title: '確認是否要刪除',
      icon: <ExclamationCircleFilled />,
      content: '',
      okText: '確認',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        if (type === DeleteType.Single && image_id) {
          deleteProductApi(image_id).then((result) => {
            if (result === 'success') {
              onSearch(filterParams.searchValue);
            }
          });
          removeSelectImageIds({ type: DeleteType.Single, image_id });
        }
        // batch delete
        if (type === DeleteType.Multiple && image_ids?.length) {
          deleteMultipleProductApi(image_ids).then((result) => {
            if (result === 'success') {
              onSearch(filterParams.searchValue);
            }
          });
          removeSelectImageIds({ type: DeleteType.Multiple });
        }
      },
      onCancel() {
        return;
      }
    });
  };

  // sell 有的欄位 rent 都會有
  const commonColumns: ColumnsType<ListType> = [
    {
      title: '圖片',
      dataIndex: 'image',
      render: (image) => (
        <Image width={80} src={`${process.env.NEXT_PUBLIC_BASE_URL}/${image}`} alt="imageUrl" />
      )
    },
    {
      title: '類別',
      dataIndex: 'category'
    },
    { title: '劇名', dataIndex: 'title' },
    { title: '名稱', dataIndex: 'name' },
    { title: '編碼', dataIndex: 'number', width: '120px' }
  ];

  const actionColumn: ColumnsType<ListType> = [
    {
      title: '操作',
      dataIndex: 'action',
      width: '160px',
      align: 'center',
      render: (image_id, record) => {
        return (
          <div className="f-center gap-3">
            <Button
              type="primary"
              danger
              onClick={() => showDeleteConfirm({ image_id, type: DeleteType.Single })}
            >
              刪除
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setEditTargetData({ ...record, image_id });
                setIsEditModalOpen(true);
              }}
            >
              編輯
            </Button>
          </div>
        );
      }
    }
  ];

  const rentColumns = commonColumns.concat(actionColumn);

  const sellColumns = commonColumns
    .concat([
      { title: '內容', dataIndex: 'content' },
      { title: '價格', dataIndex: 'price' },
      { title: '狀態', dataIndex: 'status' }
    ])
    .concat(actionColumn);

  const dataSource = filterData.results.map((list) => {
    const {
      image_path,
      image_id,
      info: { business_type, category, name, title, content, price, status, number }
    } = list;
    if (business_type === BusinessType.Sell) {
      return {
        business_type,
        key: image_id,
        image: image_path,
        category,
        name,
        title,
        content,
        price,
        status,
        number,
        action: image_id
      };
    } else {
      return {
        business_type,
        key: image_id,
        image: image_path,
        category,
        name,
        title,
        number,
        action: image_id
      };
    }
  });

  const onSearch = (value: string | undefined) => {
    const searchValue = value ? value.trim() : undefined;
    setFilterParams({
      ...filterParams,
      searchValue,
      loading: false
    });
    // fetch api
    queryApi({
      page_size: filterParams.pagesize,
      page_number:
        filterParams.business_type === BusinessType.Rent
          ? filterParams.rentCurrent
          : filterParams.sellCurrent,
      business_type: filterParams.business_type,
      [filterParams.selectOption]: searchValue
    }).then((result) => {
      if (result) {
        setFilterData(result);
      }
    });
  };

  const changeTab = (activeKey: string) => {
    setFilterParams({
      ...filterParams,
      business_type: activeKey as BusinessType,
      loading: true
    });
  };

  const onSelect = (selectedRowKeys: React.Key[]) => {
    if (selectedRowKeys.length) {
      setSelectedImageIds(selectedRowKeys.map((item) => String(item)));
    } else {
      setSelectedImageIds([]);
    }
  };

  const removeSelectImageIds = ({ type, image_id }: { type: DeleteType; image_id?: string }) => {
    if (type === DeleteType.Single) {
      setSelectedImageIds(selectedImageIds.filter((item) => item !== image_id));
    } else {
      setSelectedImageIds([]);
    }
  };

  useEffect(() => {
    if (filterParams.loading) {
      onSearch(filterParams.searchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);

  useEffect(() => {
    if (!isCanViewAdmin) {
      router.push('/login');
    }
  }, [isCanViewAdmin, router]);

  // handle batch delete button status
  useEffect(() => {
    if (selectedImageIds.length) {
      setShowBatchDeleteBtn(true);
    } else setShowBatchDeleteBtn(false);
  }, [selectedImageIds]);

  const items: TabsProps['items'] = [
    {
      key: BusinessType.Rent,
      label: '租借',
      children: (
        <DataTable
          dataSource={dataSource || []}
          columns={rentColumns}
          loading={filterParams.loading}
          onChange={(pagination, _filters, _sorter, extra) => {
            if (extra.action === 'paginate') {
              const { current } = pagination;
              setFilterParams({
                ...filterParams,
                rentCurrent: current || 1,
                loading: true
              });
              setSelectedImageIds([]);
            }
          }}
          totalAmount={filterData.total_count}
          defaultPageSize={filterParams.pagesize}
          rowSelection={{ onChange: onSelect, selectedRowKeys: selectedImageIds }}
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
          onChange={(pagination, _filters, _sorter, extra) => {
            if (extra.action === 'paginate') {
              const { current } = pagination;
              setFilterParams({
                ...filterParams,
                sellCurrent: current || 1,
                loading: true
              });
              setSelectedImageIds([]);
            }
          }}
          totalAmount={filterData.total_count}
          defaultPageSize={filterParams.pagesize}
          rowSelection={{ onChange: onSelect, selectedRowKeys: selectedImageIds }}
        />
      )
    }
  ];

  return (
    <div className="container py-10">
      <Card bordered={false} className="w-full">
        <Space.Compact className="w-full">
          <Select
            className="w-24"
            defaultValue={filterParams.selectOption}
            options={options}
            onSelect={(value) =>
              setFilterParams({
                ...filterParams,
                selectOption: value
              })
            }
          />
          <Search placeholder="請輸入查詢" allowClear className="pb-4" onSearch={onSearch} />
        </Space.Compact>
        <div className="mb-4 ml-auto w-fit">
          {showBatchDeleteBtn ? (
            <Button
              type="primary"
              danger
              onClick={() =>
                showDeleteConfirm({ image_ids: selectedImageIds, type: DeleteType.Multiple })
              }
            >
              全部刪除
            </Button>
          ) : null}
        </div>
        <Tabs
          type="card"
          defaultActiveKey={BusinessType.Rent}
          onChange={changeTab}
          items={items}
          className="bg-white"
          key={key}
        />
      </Card>
      <EditModal
        key={key}
        open={isEditModalOpen}
        setOpen={setIsEditModalOpen}
        data={editTargetData}
        filterParams={filterParams}
        onSearch={onSearch}
        setKey={setKey}
      />
    </div>
  );
};

export default List;
