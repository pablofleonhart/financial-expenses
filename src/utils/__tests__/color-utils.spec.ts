import { describe, expect, it } from 'vitest';
import { EXPENSE_CATEGORY } from '../../types';
import { getExpenseCategoryColor } from '../color-utils';

describe('Colors utils tests', () => {
  it('should return a valid color for a given expense category type', () => {
    const color = getExpenseCategoryColor(EXPENSE_CATEGORY.SALON);
    expect(color).toBe('#2166ac');
  });

  it('should return a default color if the expense category type is not found', () => {
    const color = getExpenseCategoryColor('random');
    expect(color).toBe('#000');
  });
});
