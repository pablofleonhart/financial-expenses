import { MonthPeriod } from '../types';

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const currentDate = new Date();

export const formatDate = (date: Date | string | null): string => {
  if (!date) {
    return 'No date';
  }
  return new Date(date).toLocaleDateString();
};

export const getCurrentMonthYear = (): string => {
  const today = new Date();
  const year = `${new Date().getFullYear()}`.slice(2);
  return `${months[today.getMonth()]}/${year}`;
};

export const getFirstDayOfMonth = (date?: Date): Date => {
  const selectedDate = date || currentDate;
  return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
};

export const getLastDayOfMonth = (date?: Date): Date => {
  const selectedDate = date || currentDate;
  return new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
};

export const isDateInPeriod = (
  date: Date | string,
  period: MonthPeriod
): boolean => {
  const value = new Date(date);
  return new Date(period.from) <= value && value <= new Date(period.to);
};
