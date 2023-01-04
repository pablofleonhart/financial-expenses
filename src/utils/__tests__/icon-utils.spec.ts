import { describe, expect, it } from 'vitest';
import {
  getCategoryIcon,
  getOrderIcon,
  getPaymentIcon,
  getRevenueTypeIcon,
} from '../icon-utils';
import ArrowHorizontal from '../../assets/ArrowHorizontal.vue';
import CaretDoubleUpIcon from '../../assets/CaretDoubleUpIcon.vue';
import CaretDoubleDownIcon from '../../assets/CaretDoubleDownIcon.vue';
import CaretDownIcon from '../../assets/CaretDownIcon.vue';
import CaretUpIcon from '../../assets/CaretUpIcon.vue';
import CreditCardIcon from '../../assets/CreditCardIcon.vue';
import FoodIcon from '../../assets/FoodIcon.vue';
import MoneyIcon from '../../assets/MoneyIcon.vue';
import WarningIcon from '../../assets/WarningIcon.vue';

describe('Icon utils tests', () => {
  it('should be food icon', () => {
    expect(getCategoryIcon('food')).toEqual(FoodIcon);
  });

  it('should be default icon', () => {
    expect(getCategoryIcon('xyz')).toEqual(WarningIcon);
  });

  it('should be credit card icon', () => {
    expect(getPaymentIcon(true)).toEqual(CreditCardIcon);
  });

  it('should be money icon', () => {
    expect(getPaymentIcon(false)).toEqual(MoneyIcon);
  });

  it('should be ascending order icon', () => {
    expect(getOrderIcon(true)).toEqual(CaretUpIcon);
  });

  it('should be descending order icon', () => {
    expect(getOrderIcon(false)).toEqual(CaretDownIcon);
  });

  it('should be income icon', () => {
    expect(getRevenueTypeIcon('income')).toEqual(CaretDoubleUpIcon);
  });

  it('should be outcome icon', () => {
    expect(getRevenueTypeIcon('outcome')).toEqual(CaretDoubleDownIcon);
  });

  it('should be neutral icon', () => {
    expect(getRevenueTypeIcon('abc')).toEqual(ArrowHorizontal);
  });
});
