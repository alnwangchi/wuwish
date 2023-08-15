import React from 'react';
import {  Table as TableAntd , TableProps as TablePropsAntd} from 'antd';


interface DataTableProps extends TablePropsAntd<any> {
    loading: boolean;
}

const DataTable = ({ dataSource, columns, loading, onChange, ...props }: DataTableProps) => {
  return (
    <TableAntd
      rowKey={() => `${Math.random()}`}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      onChange={onChange}
    />
  );
};

export default DataTable;
