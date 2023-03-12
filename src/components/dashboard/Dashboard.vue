<template>
  <div class="grid grid-cols-2 grid-rows-5 p-6 gap-6 bg-neutral-color-300">
    <div
      class="flex col-span-2 h-full w-full items-center justify-center gap-16 rounded-xl p-4 cursor-pointer bg-neutral-color-700 hover:bg-secondary-color-300"
      @click="$router.push('/investments')"
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
      @click="$router.push('/expenses')"
    >
      <span class="font-bold text-xl">Despesas variáveis do mês</span>
      <div class="text-2xl">Total: {{ formatCurrency(expensesSum) }}</div>
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
    <div
      class="flex flex-col row-span-2 h-full w-full items-center rounded-xl cursor-pointer p-4 bg-neutral-color-700 hover:bg-secondary-color-300"
      @click="$router.push('/investments')"
    >
      <span class="font-bold text-xl">Investimentos</span>
      <span>R$ -200,00</span>
      <span>4050.00 E</span>
    </div>
    <div
      class="flex flex-col row-span-2 h-full w-full items-center rounded-xl cursor-pointer p-4 bg-neutral-color-700 hover:bg-secondary-color-300"
      @click="$router.push('/wishes')"
    >
      <span class="font-bold text-xl">Planejamentos</span>
      <span>R$ -200,00</span>
      <span>4050.00 E</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import {
  balanceSum,
  expensesSum,
  loadExpenses,
  loadInvestments,
  loadRevenues,
  monthlyIncomes,
  monthlyOutcomes,
  topFiveCategories,
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
  return topFiveCategories.value;
});

onMounted(async () => {
  await loadRevenues();
  await loadExpenses();
  await loadInvestments();
});
</script>
