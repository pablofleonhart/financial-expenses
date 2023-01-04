import { describe, expect, it } from 'vitest';
import { formatDate } from '../date-utils';

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
});
