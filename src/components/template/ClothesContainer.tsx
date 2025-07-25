import clsx from 'clsx';
import React, { ReactNode } from 'react';

const ClothesContainer = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <section
      className={clsx(
        'mid-fill container grid grid-cols-2 place-items-center gap-2 pb-12 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5 lg:gap-5',
        className
      )}
    >
      {children}
    </section>
  );
};

export default ClothesContainer;
