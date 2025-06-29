import { reactive } from 'vue';
import { Currency } from '../components/currencies';
import { getAuthApi } from '../lib/axios';

const objCurrencies: Record<string, Currency> = {};
export const currencyItems: Currency[] = reactive([]);

export async function loadCurrencies() {
  try {
    const response = await getAuthApi().get('/currencies');
    Object.assign(currencyItems, response.data.currencies);

    currencyItems.forEach((currency) => {
      objCurrencies[currency.id] = currency;
    });
  } catch (error) {
    console.error('Not able to load currencies');
  }
}

export function getCurrencyById(id: string): Currency {
  return objCurrencies[id];
}

export function getCurrencyByType(type: string): Currency {
  return (
    currencyItems.find((currency) => currency.type === type) || new Currency()
  );
}

export function getCurrencyIconById(id: string): string {
  const currency = getCurrencyById(id);
  return currency ? currency.icon : 'ph-credit-card';
}

export function getCurrencyTypeById(id: string): string {
  const currency = getCurrencyById(id);
  return currency ? currency.type : 'euro';
}
