import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import tmp from '@/assets/img/tmp.png';

interface ClothesCardProps {
  href: string;
  alt?: string;
}

const ClothesCard: FC<ClothesCardProps> = ({ href, alt = '' }) => {
  return (
    <Link href={href}>
      <Image src={tmp} alt={alt} />
    </Link>
  );
};

export default ClothesCard;
