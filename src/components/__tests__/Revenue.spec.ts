import { describe, expect, it } from 'vitest';
import { REVENUE_STATUS } from '../../types';
import { Wallet } from '../wallets/Wallet';
import { Revenue } from '../revenues/Revenue';

describe('Revenue', () => {
  it('constructs with id, amount, bank, date, deleted, description, type and currency', () => {
    const revenue1 = new Revenue();
    expect(revenue1.id).toEqual('');
    expect(revenue1.amount).toEqual(0);
    expect(revenue1.bank).toEqual('');
    expect(revenue1.date).toBeInstanceOf(Date);
    expect(revenue1.deleted).toBeFalsy();
    expect(revenue1.description).toEqual('');
    expect(revenue1.type).toEqual('income');
    expect(revenue1.currency).toEqual('real');

    const objRevenue = {
      id: '123',
      amount: 1000,
      bank: 'ABC',
      date: new Date(2019, 11, 1),
      deleted: true,
      description: 'Description',
      type: 'expense',
      currency: 'dollar',
      itemStatus: 0,
      payment: new Wallet(),
    };
    const revenue2 = new Revenue(objRevenue);
    expect(revenue2.id).toEqual('123');
    expect(revenue2.amount).toEqual(1000);
    expect(revenue2.bank).toEqual('ABC');
    expect(revenue2.date).toEqual(objRevenue.date);
    expect(revenue2.deleted).toBeTruthy();
    expect(revenue2.description).toEqual('Description');
    expect(revenue2.type).toEqual('expense');
    expect(revenue2.currency).toEqual('dollar');
    expect(revenue2.itemStatus).toEqual(REVENUE_STATUS.OPEN);
  });
});
