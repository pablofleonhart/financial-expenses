import { describe, expect, it } from 'vitest';
import { formatCurrency } from '../currency-utils';

describe('Currency utils tests', () => {
  it('should convert value into real', () => {
    expect(formatCurrency(590.55, 'real')).toEqual('R$\xa0590,55');
  });

  it('should convert null value into real', () => {
    expect(formatCurrency(null, 'real')).toEqual('R$\xa00,00');
  });

  it('should convert value into euro', () => {
    expect(formatCurrency(40000.17)).toEqual('40.000,17\xa0€');
  });

  it('should convert null value into euro', () => {
    expect(formatCurrency(null)).toEqual('0,00\xa0€');
  });
});
