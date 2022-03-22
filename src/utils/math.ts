export const average = (arr: number[]) => {
  const flatArr = arr.flat();
  return flatArr.reduce((prev, curr) => prev + curr) / flatArr.length;
};

export const median = (arr: number[]) => {
  const flatArr = arr.flat();
  return flatArr.slice().sort((a, b) => a - b)[Math.floor(flatArr.length / 2)];
};

// Calculates moving statistic over `array`, e.g. moving average using `statFunc`
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
