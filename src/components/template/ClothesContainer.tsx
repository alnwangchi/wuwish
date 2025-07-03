import React, { ReactNode } from 'react';

const ClothesContainer = ({ children }: { children: ReactNode }) => {
  return (
    <section className="mid-fill container grid grid-cols-2 place-items-center gap-2 pb-12 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5 lg:gap-5">
      {children}
    </section>
  );
};

export default ClothesContainer;
