<template>
  <div class="expense-list h-[83%] overflow-auto scrollbar">
    <table class="table-auto h-fit w-full bg-neutral-color-500">
      <thead class="expense-list-head w-screen sticky top-0">
        <tr class="flex w-full h-10 bg-neutral-color-700">
          <th
            v-for="column in walletColumns"
            :key="column.key"
            class="flex items-center p-2 h-full w-1/4 cursor-pointer hover:bg-secondary-color-300"
            :class="column.class"
            @click="orderList(column)"
          >
            <component
              v-if="!column.static && orderColumn === column.key"
              :is="getOrderIcon(orderDirection)"
              size="20"
              class="mr-1"
            />
            <span>
              {{ column.name }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="expense-list-body flex flex-col w-full">
        <tr
          class="flex w-full items-center h-10 even:bg-neutral-color-700"
          v-for="(item, index) in walletList"
          :key="item.id"
        >
          <td
            class="flex items-center p-2 h-full w-1/4 min-w-24 gap-4 justify-end"
          >
            <ph-credit-card
              v-if="item.type === WALLET_TYPE.CREDIT"
              color="#4904d2"
              weight="duotone"
            />
            {{ getAmount(item) }}
          </td>
          <td
            class="flex items-center p-2 h-full w-1/4 min-w-24 justify-center"
          >
            {{ item.broker }}
          </td>
          <td
            class="flex items-center justify-center p-2 h-full w-1/4 min-w-44"
          >
            {{ item.holder }}
          </td>
          <td class="flex items-center p-2 h-full w-1/4 min-w-24">
            <div class="flex w-full justify-evenly">
              <ph-pencil
                class="button-action text-neutral-color-off hover:bg-blue-500 hover:text-neutral-50"
                @click="onEditWallet(index)"
              />
              <ph-trash
                class="button-action text-neutral-color-off hover:bg-red-500 hover:text-neutral-50"
                @click="onDeleteWallet(index)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { copyWallet, formatCurrency, getOrderIcon } from '../../utils';
import {
  filteredWalletItems,
  walletSettings,
  sortWallets,
} from '../../services';
import { Wallet } from './Wallet';
import { WALLET_TYPE } from '../../types';

const walletColumns = [
  {
    key: 'amount',
    name: 'Valor',
    class: 'min-w-24 justify-end',
  },
  {
    key: 'broker',
    name: 'Banco/Corretora',
    class: 'min-w-36 justify-center',
  },
  {
    key: 'holder',
    name: 'Titular',
    class: 'min-w-16 justify-center',
  },
  {
    key: 'actions',
    name: 'Ações',
    class: 'min-w-24 justify-center cursor-default',
    static: true,
  },
];

const emit = defineEmits(['onEditWallet', 'onDeleteWallet']);

const walletList = computed<Array<Wallet>>(() => filteredWalletItems);
const orderColumn = computed(() => {
  return walletSettings.column;
});

const orderDirection = computed(() => {
  return walletSettings.ascending;
});

const orderList = (column: any) => {
  if (column.static) {
    return;
  }
  sortWallets(column.key);
};

const getAmount = (wallet: Wallet) => {
  let multiplier = 1;
  if (wallet.type === WALLET_TYPE.CREDIT) {
    multiplier = -1;
  }
  return formatCurrency(multiplier * wallet.amount, wallet.currency);
};

const onEditWallet = (index: number) => {
  emit('onEditWallet', copyWallet(walletList.value[index]));
};

const onDeleteWallet = (index: number) => {
  emit('onDeleteWallet', copyWallet(walletList.value[index]));
};
</script>
