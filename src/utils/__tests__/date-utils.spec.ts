import { describe, expect, it } from 'vitest';
import { dateToString, formatDate, getMonthYear } from '../date-utils';

describe('Date utils tests', () => {
  it('should deal with null date', () => {
    expect(formatDate(null)).equal('No date');
  });

  it('should format date from another date', () => {
    const date = new Date();
    expect(formatDate(date)).equal(date.toLocaleDateString());
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
});
