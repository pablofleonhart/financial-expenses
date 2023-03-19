import { computed, reactive } from 'vue';
import { Wallet } from '../components/wallets/Wallet';
import {
  useAddWalletMutation,
  useGetWalletsQuery,
  usePublishWalletMutation,
  usePublishManyWalletsMutation,
  useUpdateWalletMutation,
} from '../graphql/generated';
import { WalletType, WALLET_TYPE } from '../types';
import { copyWallet, sortList } from '../utils';

export const allWalletItems: Array<Wallet> = reactive([]);
export const filteredWalletItems: Array<Wallet> = reactive([]);
export const availableWallets: Array<Wallet> = reactive([]);
export const walletSettings: Record<string, any> = reactive({});

const WALLET_LIST_KEY = 'wallet-list';

const loadSortSettings = () => {
  const localSettings = localStorage.getItem(WALLET_LIST_KEY);

  if (localSettings) {
    Object.assign(walletSettings, JSON.parse(localSettings));
  } else {
    Object.assign(walletSettings, { ascending: false, column: 'date' });
  }
};

const initializeData = () => {
  loadSelectedType();
  loadSortSettings();
};

const WALLET_TYPE_KEY = 'wallet-type';

export const selectedWalletType: WalletType = reactive({
  id: WALLET_TYPE.BALANCE,
  name: 'Saldos',
});

const loadSelectedType = () => {
  const localSettings = localStorage.getItem(WALLET_TYPE_KEY);

  if (localSettings) {
    Object.assign(selectedWalletType, JSON.parse(localSettings));
  }
};

export const investmentsSum = computed(() => {
  const wallets: Record<string, any> = {};
  allWalletItems.forEach((item) => {
    if (item.type === WALLET_TYPE.BALANCE) {
      return;
    }
    const key = item.currency;
    if (!(key in wallets)) {
      wallets[key] = 0;
    }
    wallets[key] += item.amount;
  });

  return wallets;
});

export const balanceSum = computed(() => {
  const balances: Record<string, any> = {};
  allWalletItems.forEach((item) => {
    if (item.type === WALLET_TYPE.INVESTMENT) {
      return;
    }
    const key = item.currency;
    if (!(key in balances)) {
      balances[key] = 0;
    }
    balances[key] += item.amount;
  });

  return balances;
});

const getWalletByID = (id: string): Wallet | null => {
  if (!id) {
    return null;
  }
  return allWalletItems.filter((item) => item.id === id)[0];
};

const publishWallet = (id: string | undefined): void => {
  if (!id) {
    throw new Error('Wallet ID invalid');
  }
  const { mutate: publishWalletMutate } = usePublishWalletMutation({});
  publishWalletMutate({ id });
};

export const publishManyWallets = (ids: string[]): void => {
  const { mutate: publishMany } = usePublishManyWalletsMutation({});
  publishMany({ ids });
};

export const loadWallets = async () => {
  const walletsPromise = new Promise((resolve) => {
    const { onResult } = useGetWalletsQuery();
    onResult((result) => {
      const items = result.data.wallets;
      availableWallets.splice(0);
      allWalletItems.splice(0);
      items.forEach((item) => {
        if (item.deleted) {
          return;
        }
        if (item.type === WALLET_TYPE.BALANCE) {
          availableWallets.push(copyWallet(item));
        }
        allWalletItems.push(copyWallet(item));
      });

      filterWallets();
      resolve(true);
    });
  });

  return walletsPromise.then(() => {
    sortList(allWalletItems, walletSettings.column, walletSettings.ascending);
  });
};

export const addWallet = async (wallet: Wallet) => {
  const { mutate: createWallet, onDone } = useAddWalletMutation({});
  createWallet({
    amount: wallet.amount,
    broker: wallet.broker,
    currency: wallet.currency,
    holder: wallet.holder,
    type: wallet.type,
  });

  return onDone((result) => {
    const walletID = result.data?.createWallet?.id;
    wallet.id = walletID || '';
    allWalletItems.push(wallet);
    publishWallet(walletID);
    filterWallets();
  });
};

export const editWallet = async (wallet: Wallet, publish = true) => {
  if (!wallet) {
    throw new Error('Wallet does not exist');
  }

  return new Promise((resolve) => {
    const { mutate: updateWallet, onDone } = useUpdateWalletMutation({});
    updateWallet({
      id: wallet.id,
      amount: wallet.amount,
      broker: wallet.broker,
      currency: wallet.currency,
      deleted: wallet.deleted,
      holder: wallet.holder,
      type: wallet.type,
    });

    onDone(() => {
      const oldWallet = getWalletByID(wallet.id);
      if (oldWallet) {
        const index = allWalletItems.indexOf(oldWallet);
        allWalletItems.splice(index, 1);
        allWalletItems.push(wallet);
        sortWallets();
      }
      if (publish) {
        publishWallet(wallet.id);
      }
      filterWallets();
      resolve(true);
    });
  });
};

export const deleteWallet = (wallet: Wallet) => {
  if (!wallet) {
    throw new Error('Wallet does not exist');
  }

  wallet.deleted = true;

  const { mutate: updateWallet, onDone } = useUpdateWalletMutation({});
  updateWallet({
    id: wallet.id,
    amount: wallet.amount,
    broker: wallet.broker,
    currency: wallet.currency,
    deleted: wallet.deleted,
    holder: wallet.holder,
    type: wallet.type,
  });

  return onDone(() => {
    allWalletItems.splice(allWalletItems.indexOf(wallet), 1);
    publishWallet(wallet.id);
    filterWallets();
  });
};

export const sortWallets = (column?: string) => {
  if (!filteredWalletItems.length) {
    return;
  }
  if (column) {
    if (walletSettings.column === column) {
      walletSettings.ascending = !walletSettings.ascending;
    } else {
      walletSettings.column = column;
    }
  }

  sortList(
    filteredWalletItems,
    walletSettings.column,
    walletSettings.ascending
  );
  localStorage.setItem(WALLET_LIST_KEY, JSON.stringify(walletSettings));
};

export const filterWallets = (
  selectedType: WalletType = selectedWalletType
) => {
  const result = allWalletItems.filter((item) => {
    return item.type === selectedType.id;
  });
  filteredWalletItems.splice(0);
  Object.assign(filteredWalletItems, result);
  sortWallets();
  Object.assign(selectedWalletType, selectedType);
  localStorage.setItem(WALLET_TYPE_KEY, JSON.stringify(selectedWalletType));
};

initializeData();
