import React from 'react';
import { Breadcrumb as AntdBreadcrumb } from 'antd';

interface BreadcrumbProps {
  items: {
    title: React.ReactNode | string;
  }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <AntdBreadcrumb
      className="py-4"
      separator={<span className="text-white">/</span>}
      items={items}
    />
  );
};

export default Breadcrumb;
