import { describe, expect, it } from 'vitest';
import {
  dateToString,
  formatDate,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getMonthYear,
  getMonths,
  isDateInPeriod,
} from '../date-utils';

describe('Date utils tests', () => {
  it('should deal with null date', () => {
    expect(formatDate(null)).equal('No date');
  });

  it('should format date from another date', () => {
    const date = new Date();
    const expectedFormattedDate = date.toLocaleDateString();
    expect(formatDate(date)).toBe(expectedFormattedDate);
  });

  it('should format date from string', () => {
    const date = '2023-10-01';
    expect(formatDate(date)).equal('10/1/2023');
  });

  it('should get the current month', () => {
    expect(getMonthYear()).toEqual('Janeiro/23');
  });

  it('should get invalid date trying to convert null', () => {
    expect(dateToString(null)).toBe('Invalid date');
  });

  it('should get date in YYYY-MM-DD format after convert date', () => {
    expect(dateToString(new Date(2023, 1, 16))).toBe('2023-02-15');
  });

  it('should returns the first day of a month', function () {
    const date = new Date('2017-04-30');
    const expectedFormattedDate = '2017-04-01';
    expect(getFirstDayOfMonth(date)).toBe(expectedFormattedDate);
  });

  it('should returns the last day of a month', function () {
    const date = new Date('2017-04-07');
    const expectedFormattedDate = '2017-04-30';
    expect(getLastDayOfMonth(date)).toBe(expectedFormattedDate);
  });

  it('returns true if date is within the specified period', function () {
    const period = {
      index: 0,
      name: 'Maio/17',
      from: new Date('2017-04-30T00:00:00.000Z'),
      to: new Date('2017-05-30T04:00:00.000Z'),
    };
    expect(isDateInPeriod('2017-05-15T04:00:00.000Z', period)).toBe(true);
  });

  it('returns array of previously created months', function () {
    const expectedResult = {
      name: 'Janeiro/23',
      from: getFirstDayOfMonth(),
      to: getLastDayOfMonth(),
    };
    expect(getMonths()).toEqual(
      expect.arrayContaining([expect.objectContaining(expectedResult)])
    );
  });
});
