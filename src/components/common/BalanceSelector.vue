<template>
  <div
    class="balance-select rounded outline-0 focus:ring focus:ring-secondary-color-300"
    @click.stop
    tabindex="0"
  >
    <div
      class="selected-option flex outline-0 rounded p-2 bg-neutral-color-700 h-10 cursor-pointer"
      :class="{ open: balanceSelectorOpen }"
      @click="balanceSelectorOpen = !balanceSelectorOpen"
    >
      <component
        v-if="selectedBalance"
        :is="getCurrencyIconById(selectedBalance.currency)"
        class="h-6 w-6"
      />
      <span
        class="selected-option-name"
        :class="{
          'text-neutral-400': !selectedBalance,
          'ml-2': selectedBalance,
        }"
      >
        {{ selectedBalance ? balanceName(selectedBalance) : emptyMessage }}
      </span>
    </div>
    <ul
      class="period-items scrollbar overflow-y-auto overflow-x-hidden absolute bg-neutral-color-500 border-2 border-neutral-color-700 rounded h-auto max-h-80 w-80 z-10"
      :class="{ hidden: !balanceSelectorOpen }"
    >
      <li
        class="item flex cursor-pointer p-2 h-10 w-full hover:bg-neutral-color-700 hover:text-secondary-color-300"
        :class="{
          'bg-neutral-color-700 text-secondary-color-300':
            balance.id === selectedBalance?.id,
        }"
        v-for="balance in balances"
        :key="balance.id"
        @click="selectBalance(balance)"
      >
        <component
          :is="getCurrencyIconById(balance.currency)"
          class="h-6 w-6"
        />
        <span class="item-name ml-2">
          {{ balanceName(balance) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, onUpdated, PropType, ref, watch } from 'vue';
import { availableWallets, getCurrencyIconById } from '../../services';
import { sortList } from '../../utils';
import { getBalanceName } from '../../utils/string-utils';
import { Wallet } from '../wallets/Wallet';

const props = defineProps({
  initialValue: {
    type: Object as PropType<Wallet | undefined | null>,
    default: null,
  },
  emptyMessage: { type: String, default: 'Selecione uma opçao' },
});

const emit = defineEmits(['select']);

const balances = computed<Array<Wallet>>(() => {
  return sortList(availableWallets, 'broker');
});
const selectedBalance = ref(props.initialValue);
const balanceSelectorOpen = ref(false);

watch(
  () => props.initialValue,
  () => {
    selectedBalance.value = props.initialValue;
  },
);

const balanceName = (balance: Wallet): string => {
  if (!balance.id) {
    return props.emptyMessage;
  }
  return getBalanceName(balance);
};

const selectBalance = (balance: Wallet) => {
  selectedBalance.value = balance;
  balanceSelectorOpen.value = false;
  emit('select', balance);
};

onUpdated(() => {
  const mySelect = document.querySelector('.balance-select');
  if (mySelect) {
    mySelect.addEventListener('keydown', (event: any) => {
      event.stopPropagation();
      if (event.key === ' ') {
        balanceSelectorOpen.value = !balanceSelectorOpen.value;
      } else if (event.key === 'Escape') {
        balanceSelectorOpen.value = false;
      } else if (event.key === 'Tab') {
        balanceSelectorOpen.value = true;
        if (event.target === document.activeElement) {
          balanceSelectorOpen.value = false;
        }
      }
    });
  }
});

window.addEventListener('click', () => (balanceSelectorOpen.value = false));
</script>
