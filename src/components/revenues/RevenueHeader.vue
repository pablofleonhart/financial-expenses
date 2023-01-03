<template>
  <div
    class="revenue-header flex justify-evenly h-22 font-bold"
  >
    <div
      class="balance p-4 grid grid-rows-3 items-center"
    >
      <span class="flex justify-center">Saldo</span>
      <div class="flex items-center">
        <component :is="balanceBRLComponent" class=" h-8 w-8 mr-2" />
        <div class="balance-value"
          :class="[
            {'balance-positive': incomeSumBRL - outcomeSumBRL > 0},
            {'balance-negative': incomeSumBRL - outcomeSumBRL < 0}
          ]"
        >
          {{ balanceBRLFormatted }}
        </div>
      </div>
      <div class="flex items-center">
        <component :is="balanceEURComponent" class=" h-8 w-8 mr-2" />
        <div class="balance-value"
          :class="[
            {'balance-positive': incomeSumEUR - outcomeSumEUR > 0},
            {'balance-negative': incomeSumEUR - outcomeSumEUR < 0}
          ]"
        >
          {{ balanceEURFormatted }}
        </div>
      </div>
    </div>
    <div
      class="incomes p-4 grid grid-cols-[max-content_1fr] grid-rows-3 items-center"
    >
      <caret-double-up-icon class="row-span-3 h-8 w-8 mr-2" />
      <span>Receitas</span>
      <div class="incomes-value text-positive-color">
        {{ formatCurrency(incomeSumBRL, 'BRL') }}
      </div>
      <div class="incomes-value text-positive-color">
        {{ formatCurrency(incomeSumEUR) }}
      </div>
    </div>
    <div
      class="outcomes p-4 grid grid-cols-[max-content_1fr] grid-rows-3 items-center"
    >
      <caret-double-down-icon class="row-span-3 h-8 w-8 mr-2" />
      <span>Despesas</span>
      <div class="outcomes-value text-negative-color">
        {{ formatCurrency(outcomeSumBRL, 'BRL') }}
      </div>
      <div class="outcomes-value text-negative-color">
        {{ formatCurrency(outcomeSumEUR) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import CaretDoubleDownIcon from '../../assets/CaretDoubleDownIcon.vue';
import CaretDoubleUpIcon from '../../assets/CaretDoubleUpIcon.vue';
import { formatCurrency, getRevenueTypeIcon } from '../../utils';
import { incomeSumBRL, incomeSumEUR, outcomeSumBRL, outcomeSumEUR } from '../../services';

const balanceBRLFormatted = computed(() => {
  return formatCurrency(incomeSumBRL.value - outcomeSumBRL.value, 'BRL');
});

const balanceBRLComponent = computed(() => {
  const balance = incomeSumBRL.value - outcomeSumBRL.value;
  let type = '';
  if (balance > 0) {
    type = 'income';
  }
  if (balance < 0) {
    type = 'outcome';
  }
  return getRevenueTypeIcon(type);
});

const balanceEURFormatted = computed(() => {
  return formatCurrency(incomeSumEUR.value - outcomeSumEUR.value);
});

const balanceEURComponent = computed(() => {
  const balance = incomeSumEUR.value - outcomeSumEUR.value;
  let type = '';
  if (balance > 0) {
    type = 'income';
  }
  if (balance < 0) {
    type = 'outcome';
  }
  return getRevenueTypeIcon(type);
});
</script>

<style lang="scss" scoped>
.balance-positive {
  color: #22c55e;
}

.balance-negative {
  color: #ef4444;
}
</style>
