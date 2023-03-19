import { beforeEach, describe, expect, it } from 'vitest';
import { copyExpense, copyRevenue, sortList } from '../object-utils';
import { Revenue } from '../../components/revenues/Revenue';
import { Expense } from '../../components/expenses/Expense';
import { Author } from '../../components/accounts/Author';
import { Investment } from '../../components/investments/Investment';

describe('sortList function', () => {
  let list: any;

  beforeEach(() => {
    list = [
      {
        amount: 5,
        date: new Date('2021-03-01'),
        deleted: false,
        children: {
          name: 'ABC',
          age: 15,
        },
      },
      {
        amount: 10,
        date: new Date('2020-10-01'),
        deleted: true,
        children: {
          name: 'XYZ',
          age: 15,
        },
      },
    ];
  });

  it('should sort a simple list in ascending order', () => {
    const sortedList = sortList(list, 'amount', true);
    expect(sortedList[0].amount).toBe(5);
    expect(sortedList[1].amount).toBe(10);
  });

  it('should sort a simple list in descending order', () => {
    const sortedList = sortList(list, 'date', false);
    expect(sortedList[0].deleted).toBeFalsy();
    expect(sortedList[1].deleted).toBeTruthy();
  });

  it('should sort a simple list in descending order by nested property', () => {
    const sortedList = sortList(list, 'children.age', false);
    expect(sortedList[0].children.name).toBe('ABC');
    expect(sortedList[1].children.name).toBe('XYZ');
  });

  it('test copyRevenue function', () => {
    const source = {
      amount: 123,
      bank: 'BofA',
      date: new Date(),
      deleted: false,
      description: 'some desc',
      type: 'some type',
    } as Revenue;

    // Get a copy
    const target = copyRevenue(source);

    // Test copy matches source
    expect(target.amount).toBe(source.amount);
    expect(target.bank).toBe(source.bank);
    expect(target.date).toBe(source.date);
    expect(target.deleted).toBe(source.deleted);
    expect(target.description).toBe(source.description);
    expect(target.type).toBe(source.type);

    // Test that updated copy and source are different
    source.amount = 456;
    expect(target.amount).not.toBe(source.amount);
  });

  it('should copy amount field from source to target', () => {
    const source: Expense = {
      id: '123',
      amount: 1000,
      card: true,
      currency: 'euro',
      date: 'May 16th 2020',
      deleted: false,
      note: 'lunch',
      category: {
        id: '345',
        name: 'Groceries',
        type: 'Spending',
      },
      author: new Author(),
      payment: new Investment(),
    };
    const target = copyExpense(source);
    expect(target.amount).toBe(1000);
    expect(target.card).toBeTruthy();
    expect(target.date).toBe('May 16th 2020');
    expect(target.deleted).toBe(false);
    expect(target.note).toBe('lunch');
  });
});
