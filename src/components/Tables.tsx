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
  rowSelection
}: DataTableProps) => {
  return (
    <TableAntd
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
      rowSelection={rowSelection}
    />
  );
};

export default DataTable;
