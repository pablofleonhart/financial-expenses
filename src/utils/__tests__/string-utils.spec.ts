import { describe, expect, it } from 'vitest';
import { capitalizeFirstLetter, getInitials } from '../string-utils';

describe('String utils tests', () => {
  it('should correctly return the initials of a single word', () => {
    expect(getInitials('John')).toBe('J');
  });

  it('should correctly return the initials of multiple words', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  it('should handle middle names', () => {
    expect(getInitials('John Michael Doe')).toBe('JMD');
  });

  it('should capitalizes the first letter of a string', () => {
    const input = 'hello world';
    const output = 'Hello world';
    expect(capitalizeFirstLetter(input)).toBe(output);
  });

  it('should returns empty string if the input is empty', () => {
    const input = '';
    const output = '';
    expect(capitalizeFirstLetter(input)).toBe(output);
  });
});
