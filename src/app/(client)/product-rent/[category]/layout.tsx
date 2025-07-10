import { enToNameMap } from '@/constance';
import { categoryMeta } from '@/seo/metaData';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { category: string } }) {
  const { title, desc } = categoryMeta[params.category as keyof typeof categoryMeta] || {};
  return {
    title,
    description: desc
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
