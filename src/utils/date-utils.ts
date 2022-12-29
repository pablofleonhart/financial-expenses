export const formatDate = (date: Date | string): string => {
  if (!date) {
    return 'No date';
  }
  return new Date(date).toLocaleDateString();
};
