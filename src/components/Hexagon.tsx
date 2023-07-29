import React, { ReactNode } from 'react';

const Hexagon = ({ children }: { children?: ReactNode }) => {
  return (
    <div className='relative hexagon lg:w-[275px] lg:h-[235px] w-[235px] h-[205px] bg-deco-blue'>
      <div className='ab-center font-cubic text-center lg:text-2xl text-xl'>{children}</div>
    </div>
  );
};

export default Hexagon;
