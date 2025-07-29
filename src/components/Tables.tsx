'use client';
import React from 'react';
import { Table as TableAntd, TableProps as TablePropsAntd } from 'antd';

interface DataTableProps extends TablePropsAntd<any> {
  loading: boolean;
  totalAmount: number;
  defaultPageSize: number;
  queryPage?: string;
}

const DataTable = ({
  dataSource,
  columns,
  loading,
  onChange,
  defaultPageSize,
  totalAmount,
  rowSelection,
  size = 'small',
  queryPage = '1'
}: DataTableProps) => {
  return (
    <TableAntd
      size={size}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      onChange={onChange}
      pagination={{
        defaultPageSize,
        showQuickJumper: true,
        total: totalAmount,
        showSizeChanger: false,
        defaultCurrent: queryPage ? parseInt(queryPage) : 1
      }}
      rowSelection={rowSelection}
    />
  );
};

export default DataTable;
