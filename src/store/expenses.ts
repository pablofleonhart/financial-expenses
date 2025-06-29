import { ref } from 'vue';
import { BusinessMonth, getCurrentBusinessMonth } from '../utils';

const _businessMonth = ref<BusinessMonth>(getCurrentBusinessMonth());

export function getExpenseBusinessMonth(): BusinessMonth {
  return _businessMonth.value;
}

export function setExpenseBusinessMonth(businessMonth: BusinessMonth) {
  _businessMonth.value = businessMonth;
}
