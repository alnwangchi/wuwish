import React, { ReactNode } from 'react';

const Hexagon = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="relative hexagon lg:w-[275px] lg:h-[235px] sm:w-[235px] sm:h-[205px] w-[160px] h-[125px] bg-deco-blue">
      <div className="ab-center font-cubic text-center lg:text-2xl sm:text-xl text-sm">
        {children}
      </div>
    </div>
  );
};

export default Hexagon;
