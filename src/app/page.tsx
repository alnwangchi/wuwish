import Carousel from '@/components/Carousel';
import CategoryItem from '@/components/CategoryItem';
import Image from 'next/image';

const tmp = [
  '訂製服裝',
  '萬聖節',
  '聖誕節',
  '節日慶典',
  '特殊',
  'Disney',
  'MARVEL',
  'DC英雄',
  '電影/影集',
  '卡通/動漫',
  '職業',
  '時裝/表演',
  '動物',
  '食物',
  '男中式傳統',
  '女中式傳統',
  '日本傳統',
  '韓國傳統',
  '歐式傳統',
  '各國傳統',
  '維京海盜',
  '玩偶裝',
  '配件',
  '大型道具',
];

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Carousel />
      <section className='container mx-auto py-10 grid grid-cols-5 gap-5 place-items-center'>
        {tmp.map((c) => (
          <CategoryItem text={c} key={c} />
        ))}
      </section>
    </main>
  );
}
