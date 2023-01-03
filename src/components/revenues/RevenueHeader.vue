<template>
  <div
    class="revenue-header flex justify-evenly h-20 font-bold"
  >
    <div
      class="balance p-4 grid grid-cols-[max-content_1fr] grid-rows-2 items-center"
      :class="[
        {'balance-positive': incomeSumBRL - outcomeSumBRL > 0},
        {'balance-positinegativeve': incomeSumBRL - outcomeSumBRL < 0}
      ]"
    >
      <component :is="balanceComponent" class="row-span-2 h-8 w-8 mr-2" />
      <span>Saldo</span>
      <div class="balance-value">
        {{ balanceFormatted }}
      </div>
    </div>
    <div
      class="incomes p-4 grid grid-cols-[max-content_1fr] grid-rows-2 items-center"
    >
      <caret-double-up-icon class="row-span-2 h-8 w-8 mr-2" />
      <span>Receitas</span>
      <div class="incomes-value text-positive-color">
        {{ formatCurrency(incomeSumBRL, 'BRL') }}
      </div>
    </div>
    <div
      class="outcomes p-4 grid grid-cols-[max-content_1fr] grid-rows-2 items-center"
    >
      <caret-double-down-icon class="row-span-2 h-8 w-8 mr-2" />
      <span>Despesas</span>
      <div class="outcomes-value text-negative-color">
        {{ formatCurrency(outcomeSumBRL, 'BRL') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import CaretDoubleDownIcon from '../../assets/CaretDoubleDownIcon.vue';
import CaretDoubleUpIcon from '../../assets/CaretDoubleUpIcon.vue';
import { formatCurrency, getRevenueTypeIcon } from '../../utils';
import { incomeSumBRL, outcomeSumBRL } from '../../services';

const balanceFormatted = computed(() => {
  return formatCurrency(incomeSumBRL.value - outcomeSumBRL.value, 'BRL');
});

const balanceComponent = computed(() => {
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
</script>

<style lang="scss" scoped>
.balance {
  &-positive {
    .balance-value {
      color: #22c55e;
    }
  }
  &-negative {
    .balance-value {
      color: #ef4444;
    }
  }
}
</style>
