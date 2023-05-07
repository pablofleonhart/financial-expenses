const formatter = new Intl.NumberFormat('de', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const getPercentage = (
  totalValue: number,
  partialValue: number
): [number, string] => {
  // if (currency == '') {
  //   currency = 'euro';
  // }
  // return converters[currency].format(value || 0);

  const value = (100 * partialValue) / totalValue;
  return [value, formatter.format(value) + '%'];
};
