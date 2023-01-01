export const formatDate = (date: Date | string | null): string => {
  if (!date) {
    return 'No date';
  }
  return new Date(date).toLocaleDateString();
};
