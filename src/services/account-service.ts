import { reactive } from 'vue';
import { getAuthApi } from '../lib/axios';
import { Account } from '../components/accounts/Account';
import { getUsernameByID } from './user-service';

const objAccounts: Record<string, Account> = {};
export const accountItems: Account[] = reactive([]);

export async function loadAccounts() {
  try {
    const response = await getAuthApi().get('/accounts');
    Object.assign(accountItems, response.data.accounts);

    accountItems.forEach((aacount) => {
      objAccounts[aacount.id] = aacount;
    });
  } catch (error) {
    console.error('Not able to load accounts');
  }
}

export function getAccountById(id: string): Account {
  return objAccounts[id];
}

export function getAccountNameByID(id: string): string {
  const account = getAccountById(id);
  if (account.userID) {
    return `${account.bankName} - ${getUsernameByID(account.userID)}`;
  }

  return account.bankName;
}
