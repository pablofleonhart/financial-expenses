import '../lib/dayjs';
import dayjs from 'dayjs';
import { MonthPeriod } from '../types';

const currentDate = new Date();

export const formatDate = (date: Date | string | null): string => {
  if (!date) {
    return 'No date';
  }
  return new Date(date).toLocaleDateString();
};

export const getMonthYear = (date: Date | string = new Date()) => {
  return dayjs(date).format('MMMM/YY');
};

export const getFirstDayOfMonth = (date: Date = new Date()): Date => {
  return dayjs(date).startOf('month').toDate();
};

export const getLastDayOfMonth = (date: Date = new Date()): Date => {
  return dayjs(date).endOf('month').toDate();
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
