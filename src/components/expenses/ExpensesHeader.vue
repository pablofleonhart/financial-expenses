<template>
  <div class="expenses-header flex flex-col w-full">
    <div
      class="expenses-budget-details flex h-6 gap-4 w-full items-center justify-center text-lg"
    >
      <span class="flex w-1/2 justify-end">Total orçado:</span>
      <div
        v-if="budgetExpenseItems.length"
        class="flex w-1/2 justify-start items-center gap-4 font-bold"
      >
        <div
          v-for="(value, key) in expensesBudgetSum"
          :key="key"
          class="balance-value"
        >
          {{ formatCurrency(value, key.toString()) }}
        </div>
      </div>
      <span v-else class="flex w-1/2 justify-start items-center gap-4 font-bold"
        >N/D</span
      >
    </div>
    <div
      class="expenses-details flex h-6 gap-4 w-full items-center justify-center text-lg"
    >
      <span class="flex w-1/2 justify-end">Total gasto:</span>
      <div class="flex w-1/2 justify-start items-center gap-4 font-bold">
        <div
          v-for="(value, key) in expensesSum"
          :key="key"
          class="balance-value"
        >
          {{ formatCurrency(value, key.toString()) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  budgetExpenseItems,
  expensesBudgetSum,
  expensesSum,
} from '../../services';
import { formatCurrency } from '../../utils';
</script>

<style lang="scss" scoped></style>
