<template>
  <div
    class="expenses-header grid grid-cols-[1fr_max-content] h-12 w-full items-center justify-around"
  >
    <div class="flex justify-center font-bold text-lg">
      <span class="mr-2">Total:</span>
      {{ formatCurrency(expensesSum) }}
    </div>
    <div class="flex justify-end">
      <button
        class="add-button flex items-center justify-end max-w-fit h-8 px-2 bg-primary-color-dark text-white border-2 border-primary-color-dark hover:bg-secondary-color-dark hover:text-black rounded"
        @click="emit('onAddExpense')"
      >
        <ph-plus-circle size="24" />
        <span class="ml-2"> Adicionar </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { expensesSum } from '../../services';
import { formatCurrency } from '../../utils';

const emit = defineEmits(['onAddExpense']);
</script>

<style lang="scss" scoped>
.add-button {
  &:hover {
    :deep(.add-icon) {
      circle,
      line {
        stroke: #000;
      }
    }
  }
}
</style>
