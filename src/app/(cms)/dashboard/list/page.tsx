/* eslint-disable @next/next/no-img-element */
'use client';
import EditModal from '@/components/EditModal';
import DataTable from '@/components/Tables';
import { categoryTransformer } from '@/constance';
import useAuthenticate from '@/hooks/useAuthenticate';
import { BusinessType, ProductSearchResponse } from '@/interface';
import { deleteMultipleProductApi, deleteProductApi, queryApi } from '@/server';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Card, Image, Input, Modal, PaginationProps, Select, Space } from 'antd';
import { ColumnsType } from 'antd/es/table/interface';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

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
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTargetData, setEditTargetData] = useState<ListType | undefined>();
  const [key, setKey] = useState('');

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('page');

  const selectedItemsManager = React.useMemo(
    () => ({
      getSelected: () => selectedImageIds,
      hasSelected: () => selectedImageIds.length > 0,
      updateSelected: (newSelectedIds: string[]) => {
        setSelectedImageIds(newSelectedIds);
      },
      clearSelected: () => {
        setSelectedImageIds([]);
      },
      removeItem: (imageId: string) => {
        setSelectedImageIds((prev) => prev.filter((id) => id !== imageId));
      },
      removeItems: (imageIds: string[]) => {
        setSelectedImageIds((prev) => prev.filter((id) => !imageIds.includes(id)));
      }
    }),
    [selectedImageIds]
  );

  const showDeleteConfirm = ({
    image_id,
    image_ids,
    type
  }: {
    image_id?: string;
    image_ids?: string[];
    type: DeleteType;
  }) => {
    const total = type === DeleteType.Single ? 1 : image_ids?.length || 0;
    const title = `請確認是否要刪除這 ${total} 筆`;
    confirm({
      title,
      icon: <ExclamationCircleFilled />,
      okText: '確認',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        if (type === DeleteType.Single && image_id) {
          deleteProductApi(image_id).then((result) => {
            if (result === 'success') {
              onSearch(filterParams.searchValue);
              selectedItemsManager.removeItem(image_id);
            }
          });
        }
        if (type === DeleteType.Multiple && image_ids?.length) {
          deleteMultipleProductApi(image_ids).then((result) => {
            if (result === 'success') {
              onSearch(filterParams.searchValue);
              selectedItemsManager.clearSelected();
            }
          });
        }
      }
    });
  };

  const rentColumns: ColumnsType<ListType> = [
    {
      title: '圖片',
      dataIndex: 'image',
      render: (image) => (
        <Image width={80} src={`${process.env.NEXT_PUBLIC_BASE_URL}/${image}`} alt="imageUrl" />
      )
    },
    {
      title: '類別',
      dataIndex: 'category',
      render: (category) => <span>{categoryTransformer(category)}</span>
    },
    { title: '劇名', dataIndex: 'title' },
    { title: '名稱', dataIndex: 'name' },
    { title: '編碼', dataIndex: 'number', width: '120px' },
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
              className="bg-blue-900 text-white"
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

  const dataSource = filterData.results.map((list) => {
    const {
      image_path,
      image_id,
      info: { business_type, category, name, title, content, price, status, number }
    } = list;
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
  });

  const onSearch = (value?: string) => {
    const searchValue = value ? value.trim() : undefined;

    setFilterParams({
      ...filterParams,
      searchValue,
      loading: false
    });
    // fetch api
    queryApi({
      page_size: filterParams.pagesize,
      page_number: searchValue ? 1 : filterParams.rentCurrent,
      business_type: filterParams.business_type,
      [filterParams.selectOption]: searchValue
    }).then((result) => {
      if (result) {
        setFilterData(result);
      }
    });
  };

  const handleRowSelection = useCallback(
    (selectedRowKeys: React.Key[]) => {
      const newSelectedIds = selectedRowKeys.map((item) => String(item));
      selectedItemsManager.updateSelected(newSelectedIds);
    },
    [selectedItemsManager]
  );

  const handleTableChange = useCallback(
    (pagination: any, _filters: any, _sorter: any, extra: any) => {
      if (extra.action === 'paginate') {
        const { current } = pagination;
        const page = current || 1;
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const newUrl = `${pathname}?${params.toString()}`;
          window.history.pushState({}, '', newUrl);
        }

        setFilterParams({
          ...filterParams,
          rentCurrent: page,
          loading: true
        });
        selectedItemsManager.clearSelected();
      }
    },
    [filterParams, pathname, selectedItemsManager]
  );

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
          {selectedItemsManager.hasSelected() ? (
            <Button
              type="primary"
              danger
              onClick={() =>
                showDeleteConfirm({
                  image_ids: selectedItemsManager.getSelected(),
                  type: DeleteType.Multiple
                })
              }
            >
              全部刪除
            </Button>
          ) : null}
        </div>
        <DataTable
          dataSource={dataSource || []}
          columns={rentColumns}
          loading={filterParams.loading}
          onChange={handleTableChange}
          totalAmount={filterData.total_count}
          defaultPageSize={filterParams.pagesize}
          rowSelection={{
            onChange: handleRowSelection,
            selectedRowKeys: selectedItemsManager.getSelected()
          }}
          queryPage={search || '1'}
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
