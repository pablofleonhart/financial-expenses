import { Travel } from '../components/travels/Travel';
import { Wallet } from '../components/wallets/Wallet';
import { formatDate } from './date-utils';

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n.slice(0, 1))
    .join('');
};

export const capitalizeFirstLetter = (sentence: string) => {
  if (!sentence) {
    return '';
  }
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};

export const getBalanceName = (balance: Wallet): string => {
  if (!balance) {
    return 'N/D';
  }
  const balanceHolder = balance.holder ? balance.holder.trim() : '';
  const holder = balanceHolder !== '' ? `- ${balance.holder}` : '';
  return `${balance.broker} ${holder}`;
};

export const getCitiesFromTravel = (travel: Travel): string => {
  return travel.city.join(', ');
};

export const getTravelPeriod = (travel: Travel): string => {
  const startDate = formatDate(travel.startDate);
  const endDate = formatDate(travel.endDate);
  return `De ${startDate} a ${endDate}`;
};
