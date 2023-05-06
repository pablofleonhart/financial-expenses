<template>
  <div class="grid grid-cols-2 grid-rows-5 p-4 gap-4 bg-neutral-color-300">
    <div
      class="flex col-span-2 h-full w-full items-center justify-center gap-16 rounded-xl p-4 cursor-pointer bg-neutral-color-700 hover:bg-secondary-color-300"
      @click="$router.push('/wallet')"
    >
      <span class="font-bold text-xl">Saldos atuais</span>
      <div class="flex flex-col justify-around items-center h-full">
        <span
          v-for="(value, key) in balanceAvailable"
          :key="key"
          class="text-2xl"
        >
          {{ formatCurrency(value, key) }}
        </span>
      </div>
    </div>
    <div
      class="flex flex-col row-span-2 h-full w-full items-center rounded-xl cursor-pointer p-4 bg-neutral-color-700 hover:bg-secondary-color-300"
      @click="$router.push('/revenues')"
    >
      <span class="font-bold text-xl">Rendas e depesas previstas no mês</span>
      <div class="flex flex-col justify-around items-center h-full">
        <div class="flex gap-4">
          <ph-trend-up class="text-positive-color" weight="bold" />
          <span
            v-for="(value, key) in currentIncomes"
            :key="key"
            class="text-2xl"
          >
            {{ formatCurrency(value, key) }}
          </span>
        </div>
      </div>
      <div class="flex flex-col justify-around items-center h-full">
        <div class="flex gap-4">
          <ph-trend-down class="text-negative-color" weight="bold" />
          <span
            v-for="(value, key) in currentOutcomes"
            :key="key"
            class="text-2xl"
          >
            {{ formatCurrency(value, key) }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col gap-2 row-span-2 h-full w-full items-center rounded-xl cursor-pointer p-4 bg-neutral-color-700 hover:bg-secondary-color-300"
      @click="$router.push('/variable-expenses')"
    >
      <span class="font-bold text-xl">Despesas variáveis do mês</span>
      <div class="text-2xl">
        Total: {{ formatCurrency(expensesSum['euro']) }}
      </div>
      <div class="flex gap-4 w-full justify-center">
        <span class="flex h-full items-center text-lg">Top</span>
        <ph-number-circle-five
          class="text-negative-color h-full"
          weight="bold"
        />
        <div class="flex flex-col gap-1 h-full justify-center">
          <span
            v-for="(item, index) in currentExpenseCategories"
            :key="index"
            class="text-xl"
          >
            {{ item.name }}: {{ formatCurrency(item.value) }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col row-span-2 gap-2 h-full w-full items-center rounded-xl cursor-pointer p-4 bg-neutral-color-700 hover:bg-secondary-color-300"
      @click="$router.push('/wishes')"
    >
      <span class="font-bold text-xl">Planos</span>
      <div class="text-2xl">Total: {{ formatCurrency(wishesSum) }}</div>
      <div class="flex gap-4 w-full justify-center">
        <span class="flex h-full items-center text-lg">Top</span>
        <ph-number-circle-five class="text-blue-500 h-full" weight="bold" />
        <div class="flex flex-col gap-1 h-full justify-center">
          <span
            v-for="(item, index) in wishCategories"
            :key="index"
            class="text-xl"
          >
            {{ item.name }}: {{ formatCurrency(item.value) }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col row-span-2 h-full w-full items-center rounded-xl cursor-pointer p-4 bg-neutral-color-700 hover:bg-secondary-color-300"
      @click="$router.push('/wallet')"
    >
      <span class="font-bold text-xl">Investimentos</span>
      <div class="flex flex-col justify-around items-center h-full">
        <span
          v-for="(value, key) in currentWallets"
          :key="key"
          class="text-2xl"
        >
          {{ formatCurrency(value, key) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import {
  balanceSum,
  expensesSum,
  investmentsSum,
  loadExpenses,
  loadWallets,
  loadRevenues,
  loadWishes,
  monthlyIncomes,
  monthlyOutcomes,
  topFiveExpenseCategories,
  topFiveWishCategories,
  wishesSum,
} from '../../services';
import { formatCurrency } from '../../utils';

const balanceAvailable = computed(() => {
  return balanceSum.value;
});

const currentIncomes = computed(() => {
  return monthlyIncomes.value;
});

const currentOutcomes = computed(() => {
  return monthlyOutcomes.value;
});

const currentExpenseCategories = computed(() => {
  return topFiveExpenseCategories.value;
});

const currentWallets = computed(() => {
  return investmentsSum.value;
});

const wishCategories = computed(() => {
  return topFiveWishCategories.value;
});

onMounted(async () => {
  await loadRevenues();
  await loadExpenses();
  await loadWallets();
  await loadWishes();
});
</script>
