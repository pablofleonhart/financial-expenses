import '../lib/dayjs';
import dayjs from 'dayjs';
import { MonthPeriod } from '../types';
import { capitalizeFirstLetter } from './string-utils';

const currentDate = new Date();

export const formatDate = (date: Date | string | null): string => {
  if (!date) {
    return 'No date';
  }
  return new Date(date).toLocaleDateString();
};

export const getMonthYear = (date: Date | string = new Date()) => {
  const monthYear = dayjs(date).format('MMMM/YY');
  return capitalizeFirstLetter(monthYear);
};

export const getFirstDayOfMonth = (date: Date = new Date()): string => {
  const firstDay = dayjs(date).startOf('month').toDate();
  return dayjs(firstDay).format('YYYY-MM-DD');
};

export const getLastDayOfMonth = (date: Date = new Date()): string => {
  const lastDay = dayjs(date).endOf('month').toDate();
  return dayjs(lastDay).format('YYYY-MM-DD');
};

export const isDateInPeriod = (
  date: Date | string,
  period: MonthPeriod
): boolean => {
  const value = new Date(date);
  return new Date(period.from) <= value && value <= new Date(period.to);
};

export const dateToString = (date: Date | null): string => {
  return date ? date.toJSON().slice(0, 10) : 'Invalid date';
};

export const getMonths = (): MonthPeriod[] => {
  const initialDate = dayjs('2022-12-01').toDate();
  const result: MonthPeriod[] = [];

  while (initialDate < currentDate) {
    result.push({
      name: getMonthYear(initialDate),
      from: getFirstDayOfMonth(initialDate),
      to: getLastDayOfMonth(initialDate),
    });

    initialDate.setMonth(initialDate.getMonth() + 1);
  }

  return result;
};
