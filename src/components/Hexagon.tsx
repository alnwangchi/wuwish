import React, { ReactNode } from 'react';

const Hexagon = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="hexagon relative h-[145px] w-[180px] bg-deco-blue sm:h-[205px] sm:w-[235px] lg:h-[235px] lg:w-[275px]">
      <div className="ab-center text-center font-cubic text-sm sm:text-xl lg:text-2xl">
        {children}
      </div>
    </div>
  );
};

export default Hexagon;
