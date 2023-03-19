<template>
  <div class="revenue-header flex justify-evenly h-22 font-bold">
    <div class="balance mb-4 grid grid-rows-2 items-center">
      <span class="flex justify-center">Saldo disponível</span>
      <div class="flex items-center gap-4">
        <div
          v-for="(value, key) in totalAvailable"
          :key="key"
          class="balance-value"
        >
          {{ formatCurrency(value, key) }}
        </div>
      </div>
    </div>
    <div class="balance mb-4 grid grid-rows-2 items-center">
      <span class="flex justify-center">Total investido</span>
      <div class="flex items-center gap-4">
        <div
          v-for="(value, key) in totalWallets"
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
import { computed } from 'vue';
import { formatCurrency } from '../../utils';
import { balanceSum, investmentsSum } from '../../services';

const totalAvailable = computed(() => {
  return balanceSum.value;
});

const totalWallets = computed(() => {
  return investmentsSum.value;
});
</script>

<style lang="scss" scoped></style>
