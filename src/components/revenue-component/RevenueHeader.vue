<template>
  <div class="revenue-header flex flex-row justify-around h-20">
    <div class="incomes p-4 grid grid-cols-[max-content_1fr] grid-rows-2 items-center">
      <CaretUpIcon class="row-span-2 h-8 w-8 mr-2" color="#22C55E"/>
      <span>Receitas</span>
      <div class="incomes-value text-green-500">R$ 4000,00</div>
    </div>
    <div class="outcomes p-4 grid grid-cols-[max-content_1fr] grid-rows-2 items-center">
      <CaretDownIcon class="row-span-2 h-8 w-8 mr-2" color="#EF4444"/>
      <span>Despesas</span>
      <div class="incomes-value text-red-500">R$ 5000,00</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CaretDownIcon from '../../assets/CaretDownIcon.vue';
import CaretUpIcon from '../../assets/CaretUpIcon.vue';

</script>