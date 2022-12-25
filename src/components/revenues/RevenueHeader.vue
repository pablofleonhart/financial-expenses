<template>
  <div class="revenue-header grid grid-cols-2 grid-rows-2 justify-items-center h-40 font-bold">
    <div class="balance p-4 col-span-2 grid grid-cols-[max-content_1fr] grid-rows-2 items-center"
      :class="(incomeValue - outcomeValue) > 0 ? 'balance-positive' : 'balance-negative'"
    >
      <component
        :is="balanceComponent"
        class="row-span-2 h-8 w-8 mr-2"
        :color="(incomeValue - outcomeValue) > 0 ? '#22C55E' : '#EF4444'"
      />
      <span>Saldo</span>
      <div class="balance-value">
        {{ balanceFormatted }}
      </div>
    </div>
    <div class="incomes p-4 grid grid-cols-[max-content_1fr] grid-rows-2 items-center">
      <CaretUpIcon class="row-span-2 h-8 w-8 mr-2" color="#22C55E"/>
      <span>Receitas</span>
      <div class="incomes-value text-positive-color">
        {{ formatCurrency(incomeValue) }}
      </div>
    </div>
    <div class="outcomes p-4 grid grid-cols-[max-content_1fr] grid-rows-2 items-center">
      <CaretDownIcon class="row-span-2 h-8 w-8 mr-2" color="#EF4444"/>
      <span>Despesas</span>
      <div class="outcomes-value text-negative-color">
        {{ formatCurrency(outcomeValue) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import CaretDownIcon from '../../assets/CaretDownIcon.vue';
import CaretUpIcon from '../../assets/CaretUpIcon.vue';
import { formatCurrency } from '../../utils';

let incomeValue = 4000
let outcomeValue = 5000

const balanceFormatted = computed(() => {
  return formatCurrency(incomeValue - outcomeValue)
})

const balanceComponent = computed(() => {
  const balance = incomeValue - outcomeValue
  if(balance > 0) {
    return CaretUpIcon
  }
  if (balance < 0) {
    return CaretDownIcon
  }
  return ''
})
</script>

<style lang="scss" scoped>
.balance {
  &-positive {
    .balance-value {
      color: #22C55E;
    }
  }
  &-negative {
    .balance-value {
      color: #EF4444;
    }
  }
}
</style>