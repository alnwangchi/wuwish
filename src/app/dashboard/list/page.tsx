/* eslint-disable @next/next/no-img-element */
"use client";
import React, {  useState } from "react";
import { Col, Row, Table } from "antd";
import { ColumnsType, SorterResult } from "antd/es/table/interface";
import { List } from "@/interface/I_List";

enum sort {
  asc = "asc",
  desc = "desc",
}

const List = () => {
  const MockData = [] as List[];
  const defaultPageParam = {
    current: 1,
    pagesize: 10,
    sort: sort.asc,
    sortField: "category",
  };

  const [filterParams, setFilterParams] = useState<any>(defaultPageParam);

  const columns: ColumnsType<any> = [
    {
      title: "category",
      dataIndex: "category",
      key: "category",
    },
    { title: "name", dataIndex: "name", key: "name" },
    { title: "title", dataIndex: "title", key: "title" },
    { title: "content", dataIndex: "content", key: "content" },
    { title: "price", dataIndex: "price", key: "price" },
    { title: "status", dataIndex: "status", key: "status" },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="imageUrl"/>,
    },
    { title: "situation", dataIndex: "situation", key: "situation" },
  ];

  const dataSource = MockData.map((list) => {
    const { category, name, title, price, status, image, situation } = list;
    return {
      category,
      name,
      title,
      price,
      status,
      image,
      situation,
    };
  });

  return (
    <div className="p-4">
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Table
            scroll={{ x: 800 }}
            rowKey={(record) => record.id}
            dataSource={dataSource}
            columns={columns}
            onChange={(pagination, filters, sorter, extra) => {
              if (extra.action === "sort") {
                const { field, order } = sorter as SorterResult<object>;
                setFilterParams({
                  ...filterParams,
                  sortType: order ? sort.asc : undefined,
                  sortField: order ? (field as string) : undefined,
                });
              }
              if (extra.action === "paginate") {
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
