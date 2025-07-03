import React from 'react';
import { Spin } from 'antd';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="f-center min-h-[40vh] grow gap-4">
      <Spin size="large" />
      <p className="text-white">載入中...</p>
    </div>
  );
};

export default LoadingSpinner;
