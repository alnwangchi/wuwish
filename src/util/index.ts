export const getRandomItemsFromArray = (arr: any[] = [], count: number) => {
  const shuffledArr = arr.sort(() => 0.5 - Math.random());
  return shuffledArr.slice(0, count);
};
