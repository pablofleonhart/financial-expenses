const formatter = new Intl.NumberFormat('de', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const getPercentage = (
  totalValue: number,
  partialValue: number
): number => {
  if (!partialValue || !totalValue) {
    return 0;
  }

  return (100 * partialValue) / totalValue;
  // const widthClass = `width: ${getProgressPercentage(item)[1]}`
  // return [value, formatter.format(value) + '%'];
};

export const formatPercentage = (value?: number): string => {
  return !value ? '0%' : formatter.format(value) + '%';
  // const widthClass = `width: ${getProgressPercentage(item)[1]}`
  // return [value, formatter.format(value) + '%'];
};
