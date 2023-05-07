<template>
  <div class="expenses-header flex w-full">
    <div
      class="expenses-budget-details flex h-12 w-full items-center justify-center font-bold text-lg"
    >
      <span class="flex w-32">Total orçado:</span>
      <div class="flex justify-center items-center gap-4">
        <div
          v-for="(value, key) in expensesBudgetSum"
          :key="key"
          class="balance-value"
        >
          {{ formatCurrency(value, key) }}
        </div>
      </div>
    </div>
    <div
      class="expenses-details flex h-12 w-full items-center justify-center font-bold text-lg"
    >
      <span class="flex w-28">Total gasto:</span>
      <div class="flex justify-center items-center gap-4">
        <div
          v-for="(value, key) in expensesSum"
          :key="key"
          class="balance-value"
        >
          {{ formatCurrency(value, key) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { expensesBudgetSum, expensesSum } from '../../services';
import { formatCurrency } from '../../utils';
</script>

<style lang="scss" scoped></style>
