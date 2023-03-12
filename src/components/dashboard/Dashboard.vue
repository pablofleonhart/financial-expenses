<template>
  <div class="grid grid-cols-2 grid-rows-5 p-6 gap-6 bg-neutral-color-500">
    <div
      class="flex col-span-2 h-full w-full items-center justify-center gap-16 rounded-xl p-4 cursor-pointer bg-secondary-color-300 hover:bg-secondary-color-700"
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
      class="flex flex-col row-span-2 h-full w-full items-center rounded-xl cursor-pointer p-4 bg-secondary-color-300 hover:bg-secondary-color-700"
      @click="$router.push('/revenues')"
    >
      <span class="font-bold text-xl">Entradas/saídas fixas do mês</span>
      <span>R$ -200,00</span>
      <span>4050.00 E</span>
    </div>
    <div
      class="flex flex-col row-span-2 h-full w-full items-center rounded-xl cursor-pointer p-4 bg-secondary-color-300 hover:bg-secondary-color-700"
      @click="$router.push('/expenses')"
    >
      <span class="font-bold text-xl">Gastos variáveis do mês</span>
      <span>R$ -200,00</span>
      <span>4050.00 E</span>
    </div>
    <div
      class="flex flex-col row-span-2 h-full w-full items-center rounded-xl cursor-pointer p-4 bg-secondary-color-300 hover:bg-secondary-color-700"
      @click="$router.push('/investments')"
    >
      <span class="font-bold text-xl">Investimentos</span>
      <span>R$ -200,00</span>
      <span>4050.00 E</span>
    </div>
    <div
      class="flex flex-col row-span-2 h-full w-full items-center rounded-xl cursor-pointer p-4 bg-secondary-color-300 hover:bg-secondary-color-700"
      @click="$router.push('/wishes')"
    >
      <span class="font-bold text-xl">Planejamentos</span>
      <span>R$ -200,00</span>
      <span>4050.00 E</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { balanceSum, loadInvestments } from '../../services';
import { formatCurrency } from '../../utils';

const balanceAvailable = computed(() => {
  return balanceSum.value;
});

loadInvestments();
</script>
