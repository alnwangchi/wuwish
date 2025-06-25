import { enToNameMap } from '@/constance';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { category: string } }) {
  return {
    title: `神龍變裝 ${enToNameMap[params.category]} 販售專區`,
    description: `歡迎來到神龍變裝，這邊都是我們有在販售的服裝，${
      enToNameMap[params.category]
    } 服裝專區`
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
