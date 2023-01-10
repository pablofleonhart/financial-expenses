export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n.slice(0, 1))
    .join('');
};
