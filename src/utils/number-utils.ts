const formatter = new Intl.NumberFormat('de', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const getPercentage = (
  totalValue: number,
  partialValue: number
): [number, string] => {
  if (!partialValue || !totalValue) {
    return [0, '0%'];
  }

  const value = (100 * partialValue) / totalValue;
  // const widthClass = `width: ${getProgressPercentage(item)[1]}`
  return [value, formatter.format(value) + '%'];
};
