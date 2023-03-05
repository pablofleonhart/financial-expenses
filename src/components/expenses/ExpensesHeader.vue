<template>
  <div
    class="expenses-header grid grid-cols-[1fr_max-content] h-12 w-full items-center justify-around"
  >
    <div class="flex justify-center font-bold text-lg">
      <span class="mr-2">Total:</span>
      {{ formatCurrency(expensesSum) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { expensesSum } from '../../services';
import { formatCurrency } from '../../utils';
</script>

<style lang="scss" scoped></style>
