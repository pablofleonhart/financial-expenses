<template>
  <div
    class="expenses-header flex h-12 w-full items-center justify-center font-bold text-lg"
  >
    <span class="flex w-16">Total:</span>
    <div class="flex justify-center items-center gap-4">
      <div v-for="(value, key) in expensesSum" :key="key" class="balance-value">
        {{ formatCurrency(value, key) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { expensesSum } from '../../services';
import { formatCurrency } from '../../utils';
</script>

<style lang="scss" scoped></style>
