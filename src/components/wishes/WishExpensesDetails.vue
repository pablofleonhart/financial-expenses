<template>
  <div
    v-show="opened"
    class="wish-item-modal absolute flex justify-center items-center h-full w-full overflow-hidden bg-black bg-opacity-50"
  >
    <div
      class="wish-item-container flex flex-col bg-neutral-color-300 h-92 w-[400px] p-4 rounded-lg gap-4"
    >
      <div class="flex justify-between align-middle">
        <span class="flex justify-center font-bold text-lg w-full">
          {{ getTitle() }}
        </span>
        <ph-x
          size="28"
          class="flex hover:bg-neutral-300 cursor-pointer rounded-full p-1"
          @click="emit('close')"
        />
      </div>
      <div
        v-for="expense in wish.expenses"
        :key="expense.id"
        class="flex flex-col"
      >
        <span>
          {{ `Valor: ${getAmount(expense)}` }}
        </span>
        <span> {{ `Parcela: ${expense.installments}` }} </span>
        <div class="flex items-center gap-4">
          <span> {{ `Data: ${formatDate(expense.date)}` }} </span>
          <ph-thumbs-up
            v-if="expense.fullfiledAt"
            class="text-green-500"
            weight="fill"
            size="24"
          />
          <ph-thumbs-down v-else class="text-red-500" weight="fill" size="24" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { Wish } from './Wish';
import { formatCurrency, formatDate } from '../../utils';
import { Expense } from '../expenses/Expense';
import { getCurrencyTypeById } from '../../services';

const props = defineProps({
  opened: { type: Boolean, default: false },
  wish: { type: Object as PropType<Wish>, required: true },
});

const emit = defineEmits(['close']);

function getTitle(): string {
  if (!props.wish.expenses || props.wish.expenses.length === 0) {
    return 'Nenhum gasto relacionado';
  }
  if (props.wish.expenses.length === 1) {
    return 'Gasto relacionado';
  }
  return 'Gastos relacionados';
}

function getAmount(expense: Expense) {
  const currencyType = getCurrencyTypeById(props.wish.currencyID);
  return formatCurrency(expense.amount, currencyType);
}
</script>
