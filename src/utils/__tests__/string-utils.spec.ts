import { describe, expect, it } from 'vitest';
import { getInitials } from '../string-utils';

describe('String utils tests', () => {
  it('should get initial from Joao Silva', () => {
    expect(getInitials('Joao Silva')).toBe('JS');
  });
});
