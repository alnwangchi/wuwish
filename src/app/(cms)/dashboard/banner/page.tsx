/* eslint-disable @next/next/no-img-element */
'use client';

import { db } from '@/lib/firebase';
import { CheckOutlined, HolderOutlined, UploadOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TableColumnsType } from 'antd';
import { Button, Card, Input, message, Skeleton, Table, Upload } from 'antd';
import {
  createContext,
  CSSProperties,
  FC,
  HTMLAttributes,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { uploadMultipleImages } from '@/lib/utils/uploadImage';
import { collection, getDocs } from 'firebase/firestore';
import { cloneDeep, uniqBy } from 'lodash';

interface DataType {
  key: string;
  order: number;
  image: string;
  imageAlt?: string;
}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

function findChangedOrder(arr1: any, arr2: any) {
  const map1 = new Map(arr1.map((item: any) => [item.key, item.order]));

  return arr2.filter((item: any) => {
    const originalOrder = map1.get(item.key);
    return originalOrder !== undefined && originalOrder !== item.order;
  });
}

const RowContext = createContext<RowContextProps>({});

const DragHandle: FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const initialData: DataType[] = [
  {
    key: 'banner-1',
    order: 1,
    image: '111111'
  },
  {
    key: 'banner-2',
    order: 2,
    image: '222222'
  },
  {
    key: 'banner-3',
    order: 3,
    image: '333333'
  },
  {
    key: 'banner-4',
    order: 4,
    image: ''
  },
  {
    key: 'banner-5',
    order: 5,
    image: ''
  },
  {
    key: 'banner-6',
    order: 6,
    image: ''
  },
  {
    key: 'banner-7',
    order: 7,
    image: ''
  }
];

interface RowProps extends HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row: FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props['data-row-key'] });

  const style: CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {})
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const UploadBannerPage: FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(initialData);
  const originalDataSource = useRef<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Map<string, File>>(new Map());
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'banners'));
        const banners: DataType[] = querySnapshot.docs.map((doc) => {
          return {
            key: doc.id,
            order: doc.data().order || 0,
            image: doc.data().downloadURL || ''
          };
        });

        // 按照 order 排序
        banners.sort((a, b) => a.order - b.order);

        // 與預設資料合併，維持 7 筆資料
        const mergedData = initialData.map((defaultItem) => {
          const existingBanner = banners.find((banner) => banner.order === defaultItem.order);
          return existingBanner || defaultItem;
        });

        setDataSource(mergedData);
        originalDataSource.current = cloneDeep(mergedData);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex((record) => record.key === active?.id);
        const overIndex = prevState.findIndex((record) => record.key === over?.id);
        const newData = arrayMove(prevState, activeIndex, overIndex);

        // 更新 order 順序
        return newData.map((item, index) => ({
          ...item,
          order: index + 1
        }));
      });
    }
  };

  const handleConfirmUpdate = async () => {
    setIsUpdating(true);

    try {
      const bannerData = dataSource.map((data, idx) => {
        const uploadedFile = uploadedFiles.get(data.key);
        const result = {
          ...data,
          uploadedFile: uploadedFile || null
        };
        return result;
      });

      const fileData = bannerData.filter((data) => !!data.uploadedFile);
      const changeOrderData = findChangedOrder(originalDataSource.current, bannerData);

      const uploadData = uniqBy(fileData.concat(changeOrderData), 'key');

      const res = await uploadMultipleImages(uploadData);

      message.success('更新成功');

      setUploadedFiles(new Map()); // 清空已上傳的檔案

      await new Promise((resolve) => setTimeout(resolve, 1500));

      return bannerData;
    } finally {
      setIsUpdating(false);
    }
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Order',
      key: 'order',
      align: 'center',
      width: 120,
      render: (_, record) => (
        <div className="flex items-center justify-center gap-2">
          <DragHandle />
          {record.order}
        </div>
      )
    },
    {
      title: 'OriginOrder',
      key: 'originOrder',
      align: 'center',
      width: 120,
      render: (_, record) => <div className="flex items-center justify-center">{record.key}</div>
    },
    {
      title: 'Image',
      key: 'image',
      align: 'center',
      width: 460,
      render: (_, record) => (
        <div className="flex flex-col items-center justify-center gap-3">
          {!!record.image ? (
            <img
              src={record.image}
              alt={''}
              style={{
                width: 340,
                height: 150,
                objectFit: 'cover',
                borderRadius: '6px',
                border: '1px solid #d9d9d9'
              }}
            />
          ) : (
            <Skeleton.Image style={{ width: 340, height: 150 }} active={false} />
          )}
          {/* <Input
            placeholder="請輸入圖片 Alt 文字"
            value={record.imageAlt || ''}
            style={{ width: 340 }}
            onChange={(e) => updateRecordAlt(record.key, e.target.value, setDataSource)}
          /> */}
        </div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 120,
      render: (_, record) => (
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={(file) => {
            const imageUrl = URL.createObjectURL(file);

            setUploadedFiles((prev) => new Map(prev.set(record.key, file)));

            setDataSource((prevData) =>
              prevData.map((item) =>
                item.key === record.key ? { ...item, image: imageUrl } : item
              )
            );

            return false;
          }}
        >
          <Button type="primary" size="small" icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
      )
    }
  ];

  return (
    <div className="p-6">
      <Card bordered={false} className="w-full">
        <div className="mb-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Banner 管理</h2>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleConfirmUpdate}
              size="middle"
              loading={isUpdating}
              disabled={isUpdating}
            >
              確認更新
            </Button>
          </div>
        </div>

        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            items={dataSource.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <Table<DataType>
              rowKey="key"
              components={{
                body: { row: Row }
              }}
              columns={columns}
              dataSource={dataSource.slice(0, 7)}
              pagination={false}
              size="middle"
              className="rounded-lg bg-white shadow-md"
            />
          </SortableContext>
        </DndContext>
      </Card>
    </div>
  );
};

export default UploadBannerPage;
