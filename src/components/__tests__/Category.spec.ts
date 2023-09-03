import { describe, expect, it } from 'vitest';
import { Category } from '../categories/Category';

describe('Category', () => {
  it('should initialize the class', () => {
    const objCategory = {
      id: 'category-1',
      name: 'Category 1',
      type: 'Foo',
      icon: 'icon',
      color: '#FFF',
    };

    const category = new Category(objCategory);
    expect(category).toBeInstanceOf(Category);
    expect(category.id).toBe('category-1');
    expect(category.name).toBe('Category 1');
    expect(category.type).toBe('Foo');
  });
});
