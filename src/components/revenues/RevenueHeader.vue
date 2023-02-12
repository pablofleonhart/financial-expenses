<template>
  <div class="revenue-header flex justify-evenly h-22 font-bold">
    <div class="balance mb-4 grid grid-rows-2 items-center">
      <span class="flex justify-center">Saldo previsto</span>
      <div class="flex items-center">
        <div
          class="balance-value"
          :class="[
            { 'balance-positive': expectedSumBRL > 0 },
            { 'balance-negative': expectedSumBRL < 0 },
          ]"
        >
          {{ expectedBRLFormatted }}
        </div>
        <span class="text-center w-4">|</span>
        <div
          class="balance-value"
          :class="[
            { 'balance-positive': expectedSumEUR > 0 },
            { 'balance-negative': expectedSumEUR < 0 },
          ]"
        >
          {{ expectedEURFormatted }}
        </div>
      </div>
    </div>
    <div class="balance p-2 grid grid-rows-2 items-center">
      <span class="flex justify-center">Saldo atual</span>
      <div class="flex items-center">
        <div
          class="balance-value"
          :class="[
            { 'balance-positive': currentSumBRL > 0 },
            { 'balance-negative': currentSumBRL < 0 },
          ]"
        >
          {{ currentBRLFormatted }}
        </div>
        <span class="text-center w-4">|</span>
        <div
          class="balance-value"
          :class="[
            { 'balance-positive': currentSumEUR > 0 },
            { 'balance-negative': currentSumEUR < 0 },
          ]"
        >
          {{ currentEURFormatted }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { formatCurrency } from '../../utils';
import {
  currentSumBRL,
  currentSumEUR,
  expectedSumBRL,
  expectedSumEUR,
} from '../../services';

const currentBRLFormatted = computed(() => {
  return formatCurrency(currentSumBRL.value, 'real');
});

const currentEURFormatted = computed(() => {
  return formatCurrency(currentSumEUR.value);
});

const expectedBRLFormatted = computed(() => {
  return formatCurrency(expectedSumBRL.value, 'real');
});

const expectedEURFormatted = computed(() => {
  return formatCurrency(expectedSumEUR.value);
});
</script>

<style lang="scss" scoped>
.balance-positive {
  color: #06a641;
}

.balance-negative {
  color: #ef4444;
}
</style>
