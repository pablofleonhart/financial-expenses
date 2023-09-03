export const getPaymentIcon = (card: boolean) => {
  return card ? 'ph-credit-card' : 'ph-coin-vertical';
};

export const getOrderIcon = (ascending: boolean) => {
  return ascending ? 'ph-caret-down' : 'ph-caret-up';
};

export const getRevenueTypeIcon = (type: string) => {
  if (type === 'income') {
    return 'ph-trend-up';
  }
  if (type === 'outcome') {
    return 'ph-trend-down';
  }
  return 'ph-minus';
};
