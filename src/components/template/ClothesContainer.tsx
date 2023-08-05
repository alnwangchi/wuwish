import React, { ReactNode } from 'react'

const ClothesContainer = ({children}: {children: ReactNode}) => {
  return (
    <section className='container mx-auto py-10 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5 lg:gap-5 place-items-center'>
        {children}
      </section>
  )
}

export default ClothesContainer