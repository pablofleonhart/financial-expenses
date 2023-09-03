import { describe, expect, it } from 'vitest';
import {
  getOrderIcon,
  getPaymentIcon,
  getRevenueTypeIcon,
} from '../icon-utils';

describe('Icon utils tests', () => {
  it('should be credit card icon', () => {
    expect(getPaymentIcon(true)).toEqual('ph-credit-card');
  });

  it('should be money icon', () => {
    expect(getPaymentIcon(false)).toEqual('ph-coin-vertical');
  });

  it('should be ascending order icon', () => {
    expect(getOrderIcon(true)).toEqual('ph-caret-up');
  });

  it('should be descending order icon', () => {
    expect(getOrderIcon(false)).toEqual('ph-caret-down');
  });

  it('should be income icon', () => {
    expect(getRevenueTypeIcon('income')).toEqual('ph-trend-up');
  });

  it('should be outcome icon', () => {
    expect(getRevenueTypeIcon('outcome')).toEqual('ph-trend-down');
  });

  it('should be neutral icon', () => {
    expect(getRevenueTypeIcon('abc')).toEqual('ph-minus');
  });
});
