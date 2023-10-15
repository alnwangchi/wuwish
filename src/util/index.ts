export const getRandomItemsFromArray = (arr: any[] = [], count: number) => {
  const shuffledArr = arr.sort(() => 0.5 - Math.random());
  return shuffledArr.slice(0, count);
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 使用平滑捲動效果，如果不需要平滑捲動，可以省略這行
  });
};
