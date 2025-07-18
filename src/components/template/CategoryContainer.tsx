import React, { ReactNode } from 'react';

const CategoryContainer = ({ children }: { children: ReactNode }) => {
  return (
    <section className="container grid grid-cols-2 grid-rows-4 place-items-center pb-12 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5  lg:gap-5">
      {children}
    </section>
  );
};

export default CategoryContainer;
