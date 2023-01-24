export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n.slice(0, 1))
    .join('');
};

export const capitalizeFirstLetter = (sentence: string) => {
  if(!sentence){
    return ''
  }
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
