import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ClothesCardProps {
  href: string;
  src: string;
  alt?: string;
}

const ClothesCard: FC<ClothesCardProps> = ({ href, src, alt = '' }) => {
  return (
    <Link href={href}>
      <Image width={237} height={315} src={src} alt={alt} />
    </Link>
  );
};

export default ClothesCard;
