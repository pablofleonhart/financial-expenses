const toBRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const toEUR = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const converters: Record<string, any> = {
  real: toBRL,
  euro: toEUR,
};

export const formatCurrency = (
  value: number | null,
  currency = 'euro'
): string => {
  return converters[currency].format(value || 0);
};
