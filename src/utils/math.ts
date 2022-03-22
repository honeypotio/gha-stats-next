export const average = (arr: number[]) => {
  if (arr.length === 0) return arr;
  return arr.reduce((prev, curr) => prev + curr) / arr.length;
};

export const median = (arr: number[]) => {
  return arr.slice().sort((a, b) => a - b)[Math.floor(arr.length / 2)];
};

export const movingStat = (
  array: number[],
  countBefore: number,
  countAfter = 0,
  statFunc = average
) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const subArr = array.slice(
      Math.max(i - countBefore, 0),
      Math.min(i + countAfter + 1, array.length)
    );
    result.push(statFunc(subArr));
  }
  return result;
};
