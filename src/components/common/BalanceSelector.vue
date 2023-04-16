<template>
  <div
    class="balance-select rounded outline-0 focus:ring focus:ring-secondary-color-300"
    @click.stop
  >
    <div
      class="selected-option flex outline-0 rounded p-2 bg-neutral-color-700 h-10 cursor-pointer"
      :class="{ open: balanceSelectorOpen }"
      @click="balanceSelectorOpen = !balanceSelectorOpen"
    >
      <component
        :is="getCurrencyIcon(selectedBalance?.currency)"
        class="h-6 w-6"
      />
      <span class="selected-option-name ml-2">
        {{ balanceName(selectedBalance) }}
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
        <component :is="getCurrencyIcon(balance.currency)" class="h-6 w-6" />
        <span class="item-name ml-2">
          {{ balanceName(balance) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, shallowRef, watch } from 'vue';
import { availableWallets } from '../../services';
import { getCurrencyIcon, sortList } from '../../utils';
import { getBalanceName } from '../../utils/string-utils';
import { Wallet } from '../wallets/Wallet';

const props = defineProps({
  initialValue: { type: Wallet, default: new Wallet() },
  emptyMessage: { type: String, default: 'Selecione uma opçao' },
});

const emit = defineEmits(['select']);

const balances = computed<Array<Wallet>>(() => {
  return sortList(availableWallets, 'broker');
});
const selectedBalance = shallowRef(props.initialValue);
const balanceSelectorOpen = ref(false);

watch(
  () => props.initialValue,
  () => {
    selectedBalance.value = props.initialValue;
  }
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

onMounted(() => {
  const mySelect = document.querySelector('.balance-select');

  if (mySelect) {
    mySelect.addEventListener('keydown', (event: any) => {
      if (event.keyCode === 32) {
        balanceSelectorOpen.value = !balanceSelectorOpen.value;
      }
    });
  }
});

window.addEventListener('click', () => (balanceSelectorOpen.value = false));
</script>
