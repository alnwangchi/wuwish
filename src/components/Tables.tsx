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
  ...props
}: DataTableProps) => {
  return (
    <TableAntd
      rowKey={() => `${Math.random()}`}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      onChange={onChange}
      pagination={{
        defaultPageSize,
        showQuickJumper: false,
        total: totalAmount,
        showSizeChanger: false
      }}
    />
  );
};

export default DataTable;
