import '../lib/dayjs';
import dayjs from 'dayjs';
import { MonthPeriod } from '../types';
import { capitalizeFirstLetter } from './string-utils';

export const LAST_DAY_OF_MONTH = 25;

export const formatDate = (date: Date | string | null): string => {
  if (!date) {
    return 'N/D';
  }
  return new Date(date).toLocaleDateString();
};

export const getFormattedDate = (date: Date): string => {
  return dayjs(date).format('YYYY-MM-DD');
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

export const getLastDayOfYear = (date: Date = new Date()): Date => {
  const lastDay = dayjs(date).endOf('year').toDate();
  return dayjs(lastDay).toDate();
};

export const isDateInPeriod = (
  date: Date | string,
  period: MonthPeriod,
): boolean => {
  const value = new Date(date);
  return new Date(period.from) <= value && value <= new Date(period.to);
};

export const dateToString = (date: Date | null): string => {
  return date ? date.toJSON().slice(0, 10) : 'Invalid date';
};

export const getMonths = (): MonthPeriod[] => {
  const initialDate = dayjs('2022-12-01').toDate();
  const finalDate = dayjs(getLastDayOfMonth()).toDate();
  const result: MonthPeriod[] = [];
  let index = 0;

  while (initialDate <= finalDate) {
    result.push({
      index,
      name: getMonthYear(initialDate),
      from: getFirstDayOfMonth(initialDate),
      to: getLastDayOfMonth(initialDate),
    });

    initialDate.setMonth(initialDate.getMonth() + 1);
    index++;
  }

  return result;
};

export const isDateInCurrentMonth = (date: Date): boolean => {
  const firstDay = dayjs().startOf('month').toDate();
  const lastDay = dayjs().endOf('month').toDate();
  const targetDay = new Date(date);
  return firstDay <= targetDay && targetDay <= lastDay;
};

export const isLate = (date: Date): boolean => {
  return dayjs(date).isBefore(new Date());
};

export function getBusinessMonthInitialDate(date = new Date()): Date {
  if (date.getDate() <= LAST_DAY_OF_MONTH) {
    date.setMonth(date.getMonth() - 1);
  }
  date.setDate(LAST_DAY_OF_MONTH + 1);

  return dayjs.tz(date, 'Europe/London').startOf('day').toDate();
}

export function getBusinessMonthFinalDate(date = new Date()): Date {
  let month = date.getMonth();
  if (date.getDate() > LAST_DAY_OF_MONTH) {
    month++;
  }
  date.setDate(LAST_DAY_OF_MONTH);
  date.setMonth(month);

  return dayjs.tz(date, 'Europe/London').endOf('day').toDate();
}

export type BusinessMonth = {
  startDate: Date;
  endDate: Date;
  name: string;
};

const businessMonths: BusinessMonth[] = [];

export function getBusinnesMonths(): BusinessMonth[] {
  if (businessMonths.length !== 0) {
    return businessMonths;
  }
  const initialDate = dayjs().startOf('year').toDate();
  initialDate.setFullYear(new Date().getFullYear() - 1);
  const finalDate = dayjs().endOf('year').toDate();

  while (initialDate <= finalDate) {
    const startDate = getBusinessMonthInitialDate(initialDate);
    const endDate = getBusinessMonthFinalDate(initialDate);
    businessMonths.push({
      startDate,
      endDate,
      name: `${getMonthYear(startDate)} - ${getMonthYear(endDate)}`,
    });
    initialDate.setMonth(initialDate.getMonth() + 1);
  }

  return businessMonths;
}

export function getCurrentBusinessMonth(): BusinessMonth {
  const startDate = getBusinessMonthInitialDate();
  const endDate = getBusinessMonthFinalDate();
  return {
    startDate,
    endDate,
    name: `${getMonthYear(startDate)} - ${getMonthYear(endDate)}`,
  };
}

export function formatDateToISO(date: Date): string {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ[Z]');
}
