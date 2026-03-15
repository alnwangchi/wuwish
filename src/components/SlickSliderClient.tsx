'use client';

import React, { useEffect, useRef } from 'react';
import SlickSlider from 'react-slick';

type SlickSliderClientProps = React.ComponentProps<typeof SlickSlider> & {
  onInstance?: (instance: SlickSlider | null) => void;
};

export default function SlickSliderClient({ onInstance, ...props }: SlickSliderClientProps) {
  const sliderRef = useRef<SlickSlider | null>(null);

  useEffect(() => {
    onInstance?.(sliderRef.current);

    return () => {
      onInstance?.(null);
    };
  }, [onInstance]);

  return <SlickSlider ref={sliderRef} {...props} />;
}
