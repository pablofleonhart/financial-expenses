<template>
  <div class="flex flex-col gap-1">
    <span class="font-bold"> {{ label }} </span>
    <div
      class="balance-select rounded outline-0 focus:ring focus:ring-secondary-color-300"
      :class="{
        'border border-red-500': error,
        'text-neutral-400': !selectedAccount,
      }"
      @click.stop
      tabindex="0"
    >
      <div
        class="selected-option flex outline-0 rounded p-2 bg-neutral-color-700 h-10 cursor-pointer"
        :class="{ open: accountSelectorOpen }"
        @click="accountSelectorOpen = !accountSelectorOpen"
      >
        <component
          v-if="selectedAccount"
          :is="getCurrencyIconById(selectedAccount.currencyID)"
          class="h-6 w-6"
        />
        <span
          class="selected-option-name"
          :class="{
            'text-neutral-400': !selectedAccount,
            'ml-2': selectedAccount,
          }"
        >
          {{ selectedAccount ? getAccountName(selectedAccount) : emptyMessage }}
        </span>
      </div>
      <ul
        class="period-items scrollbar overflow-y-auto overflow-x-hidden absolute bg-neutral-color-500 border-2 border-neutral-color-700 rounded h-auto max-h-80 w-80 z-10"
        :class="{ hidden: !accountSelectorOpen }"
      >
        <li
          class="item flex cursor-pointer p-2 h-10 w-full hover:bg-neutral-color-700 hover:text-secondary-color-300"
          :class="{
            'bg-neutral-color-700 text-secondary-color-300':
              account.id === selectedAccount?.id,
          }"
          v-for="account in accountItems"
          :key="account.id"
          @click="selectAccount(account)"
        >
          <component
            :is="getCurrencyIconById(account.currencyID)"
            class="h-6 w-6"
          />
          <span class="item-name ml-2">
            {{ getAccountName(account) }}
          </span>
        </li>
      </ul>
    </div>
    <error-badge :message="error" />
  </div>
</template>

<script lang="ts" setup>
import { onUpdated, PropType, ref, watch } from 'vue';
import { getCurrencyIconById } from '../../services';
import ErrorBadge from './ErrorBadge.vue';
import {
  accountItems,
  getAccountNameByID,
} from '../../services/account-service';
import { Account } from '../accounts/Account';

const props = defineProps({
  label: { type: String, default: 'Conta' },
  initialValue: { type: Object as PropType<Account>, default: null },
  emptyMessage: { type: String, default: 'Selecione uma opção' },
  error: { type: String, default: '' },
});

const emit = defineEmits(['select']);

const selectedAccount = ref(props.initialValue);
const accountSelectorOpen = ref(false);

watch(
  () => props.initialValue,
  () => {
    selectedAccount.value = props.initialValue;
  },
);

const getAccountName = (account: Account): string => {
  if (!account.id) {
    return props.emptyMessage;
  }
  return getAccountNameByID(account.id);
};

const selectAccount = (balance: Account) => {
  selectedAccount.value = balance;
  accountSelectorOpen.value = false;
  emit('select', balance);
};

onUpdated(() => {
  const mySelect = document.querySelector('.balance-select');
  if (mySelect) {
    mySelect.addEventListener('keydown', (event: any) => {
      event.stopPropagation();
      if (event.key === ' ') {
        accountSelectorOpen.value = !accountSelectorOpen.value;
      } else if (event.key === 'Escape') {
        accountSelectorOpen.value = false;
      } else if (event.key === 'Tab') {
        accountSelectorOpen.value = true;
        if (event.target === document.activeElement) {
          accountSelectorOpen.value = false;
        }
      }
    });
  }
});

window.addEventListener('click', () => (accountSelectorOpen.value = false));
</script>
