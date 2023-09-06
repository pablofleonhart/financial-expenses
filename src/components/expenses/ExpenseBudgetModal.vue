<template>
  <div
    v-show="opened"
    class="expense-item-modal absolute flex justify-center items-center scroll h-screen w-full overflow-hidden bg-black bg-opacity-50"
  >
    <div
      class="expense-item-container flex flex-col bg-neutral-color-300 h-92 w-[350px] p-4 rounded-lg"
    >
      <span class="flex justify-center font-bold text-lg w-full">
        {{ `${getActionName()} orçamento` }}
      </span>
      <div class="expense-fields flex flex-col gap-3 my-5">
        <input
          tabindex="0"
          v-model="localExpense.amount"
          class="outline-0 rounded p-2 h-10 bg-neutral-color-700 focus:ring focus:ring-secondary-color-300"
          :class="{ 'border border-red-500': amountError }"
          type="number"
          min="0"
          required
          placeholder="Valor pago"
        />
        <currency-selector
          :initial-value="selectedCurrency"
          @on-select-option="onSelectCurrency"
        />
        <category-selector
          :initial-value="selectedCategory"
          @on-select-option="onSelectCategory"
        />
        <textarea
          v-model="localExpense.note"
          class="flex col-span-2 resize-none outline-0 rounded p-2 bg-neutral-color-700 h-24"
          placeholder="Descreva a renda ou despesa"
        />
      </div>
      <div class="expense-item-actions flex justify-end gap-4">
        <button
          class="expense-item-cancel max-w-fit h-8 px-2 bg-neutral-color-300 border-2 border-neutral-color-700 hover:bg-neutral-color-700 rounded"
          @click="emit('close')"
        >
          Cancelar
        </button>
        <button
          class="expense-item-confirm max-w-fit h-8 px-2 bg-secondary-color-300 hover:bg-secondary-color-700 rounded"
          @click="onActionItem"
        >
          {{ getActionName() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref, shallowRef, watch } from 'vue';
import { Expense } from './Expense';
import { Category } from '../categories/Category';
import {
  addExpenseBudget,
  editExpenseBudget,
  getCurrencyById,
} from '../../services';
import { Wallet } from '../wallets/Wallet';
import { Currency } from '../currencies';
import CategorySelector from '../common/CategorySelector.vue';
import CurrencySelector from '../common/CurrencySelector.vue';

const localExpense = shallowRef(new Expense());
const selectedCategory = shallowRef(new Category());
const selectedPayment = shallowRef(new Wallet());
const selectedCurrency = shallowRef(new Currency());

const amountError = ref(false);
const emit = defineEmits(['addExpense', 'close']);

const props = defineProps({
  opened: { type: Boolean, default: false },
  expense: { type: Object as PropType<Expense>, required: true },
});

watch(
  () => props.opened,
  () => {
    if (props.opened) {
      localExpense.value = props.expense;
      selectedCategory.value = props.expense.category;
      selectedPayment.value = props.expense.payment;
      selectedCurrency.value = getCurrencyById(localExpense.value.currency);
    }
  },
);

const getActionName = () => {
  return localExpense.value.id === '' ? 'Adicionar' : 'Editar';
};

const onSelectCurrency = (option: any) => {
  selectedCurrency.value = option;
  localExpense.value.currency = option?.type;
};

const onSelectCategory = (option: any) => {
  selectedCategory.value = option;
  localExpense.value.category = option;
};

const isValidForm = (): boolean => {
  let validForm = true;
  amountError.value = false;
  if (localExpense.value.amount <= 0) {
    amountError.value = true;
    validForm = false;
  }

  return validForm;
};

const onActionItem = (event: Event) => {
  if (!isValidForm()) {
    event?.preventDefault();
    return;
  }
  localExpense.value.budget = true;
  if (localExpense.value.id === '') {
    addExpenseBudget(localExpense.value);
    emit('addExpense');
  } else {
    editExpenseBudget(localExpense.value);
  }
  emit('close');
};
</script>
