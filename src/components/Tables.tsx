import React from 'react';
import { Table as TableAntd, TableProps as TablePropsAntd } from 'antd';

interface DataTableProps extends TablePropsAntd<any> {
  loading: boolean;
  totalAmount: number;
  defaultPageSize: number;
}

const DataTable = ({
  dataSource,
  columns,
  loading,
  onChange,
  defaultPageSize,
  totalAmount,
  rowSelection,
  size = 'small'
}: DataTableProps) => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
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
        defaultCurrent: page ? parseInt(page) : 1
      }}
      rowSelection={rowSelection}
    />
  );
};

export default DataTable;
