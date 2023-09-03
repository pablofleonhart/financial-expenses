import { reactive } from 'vue';
import { Currency } from '../components/currencies';
import { api } from '../lib/axios';

export const currencyItems: Currency[] = reactive([]);

export async function loadCurrencies() {
  try {
    const response = await api.get('/currencies');
    Object.assign(currencyItems, response.data.currencies);
    console.log(currencyItems);
  } catch (error) {
    console.error('Not able to load currencies');
  }
}

export function getCurrencyByType(type: string) {
  return currencyItems.filter((item) => item.type === type)[0];
}

export function getCurrencyIconByType(type: string) {
  const currency = getCurrencyByType(type);
  return currency ? currency.icon : 'ph-credit-card';
}
