export const getProgressClass = (value?: number): string => {
  if (!value || value <= 0) {
    return 'bg-transparent';
  }
  if (value <= 25) {
    return 'bg-teal-400';
  }
  if (value <= 50) {
    return 'bg-green-400';
  }
  if (value <= 80) {
    return 'bg-yellow-400';
  }
  if (value < 100) {
    return 'bg-orange-400';
  }
  if (value === 100) {
    return 'bg-rose-400';
  }

  return 'bg-red-500';
};

export const getProgressWidth = (value?: number): string => {
  return !value || value <= 0 ? 'hidden' : `width: ${value}%`;
};
