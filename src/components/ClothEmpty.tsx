import React from 'react';

interface ClothEmptyProps {
  message?: string; // 可選的自定義訊息
}

const ClothEmpty: React.FC<ClothEmptyProps> = ({ message = '目前無此類服裝' }) => {
  return (
    <div className="f-center mid-fill">
      <h3 className="text-center text-white">{message}</h3>
    </div>
  );
};

export default ClothEmpty;
