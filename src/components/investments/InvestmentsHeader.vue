<template>
  <div class="revenue-header flex justify-evenly h-22 font-bold">
    <div class="balance mb-4 grid grid-rows-2 items-center">
      <span class="flex justify-center">Saldos</span>
      <div class="flex items-center">
        <div class="balance-value">
          {{ totalBRLFormatted }}
        </div>
        <span class="text-center w-8">|</span>
        <div class="balance-value">
          {{ totalUSDFormatted }}
        </div>
        <span class="text-center w-8">|</span>
        <div class="balance-value">
          {{ totalEURFormatted }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { formatCurrency } from '../../utils';
import {
  investmentSumBRL,
  investmentSumEUR,
  investmentSumUSD,
} from '../../services';

const totalBRLFormatted = computed(() => {
  return formatCurrency(investmentSumBRL.value, 'real');
});

const totalUSDFormatted = computed(() => {
  return formatCurrency(investmentSumUSD.value, 'dollar');
});

const totalEURFormatted = computed(() => {
  return formatCurrency(investmentSumEUR.value);
});
</script>

<style lang="scss" scoped></style>
