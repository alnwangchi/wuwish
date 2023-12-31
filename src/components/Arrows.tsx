import React, { FC } from 'react';
import { IoTriangleSharp } from 'react-icons/io5';
import clsx from 'clsx';

interface ArrowsProps {
  direction?: 'up' | 'down' | 'left' | 'right';
}

const Arrows: FC<ArrowsProps> = ({ direction = 'right' }) => {
  return (
    <div
      className={clsx(
        'flex',
        direction === 'left' && 'rotate-180',
        direction === 'down' && 'rotate-90'
      )}
    >
      <IoTriangleSharp className="rotate-90 text-deco-blue" />
      <IoTriangleSharp className="rotate-90 text-deco-blue" />
      <IoTriangleSharp className="rotate-90 text-deco-blue" />
    </div>
  );
};

export default Arrows;
