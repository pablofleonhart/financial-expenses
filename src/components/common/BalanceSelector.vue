<template>
  <div class="balance-select" @click.stop>
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
        {{ getBalanceName(selectedBalance) }}
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
          {{ getBalanceName(balance) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, shallowRef, watch } from 'vue';
import { availableInvestments } from '../../services';
import { getCurrencyIcon } from '../../utils';
import { Investment } from '../investments/Investment';

const props = defineProps({
  initialValue: { type: Investment, default: new Investment() },
});

const emit = defineEmits(['select']);

const balances = computed<Array<Investment>>(() => availableInvestments);
const selectedBalance = shallowRef(props.initialValue);
const balanceSelectorOpen = ref(false);

watch(
  () => props.initialValue,
  () => {
    selectedBalance.value = props.initialValue;
  }
);

const getBalanceName = (balance: Investment): string => {
  if (!balance.id) {
    return 'Forma de pagamento';
  }
  const holder = balance.holder ? `- ${balance.holder}` : '';
  return `${balance.broker} ${holder}`;
};

const selectBalance = (balance: Investment) => {
  selectedBalance.value = balance;
  balanceSelectorOpen.value = false;
  emit('select', balance);
};

window.addEventListener('click', () => (balanceSelectorOpen.value = false));
</script>
