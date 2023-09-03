<template>
  <div
    v-show="opened"
    class="expense-item-modal absolute flex justify-center items-center scroll h-screen w-full overflow-hidden bg-black bg-opacity-50"
  >
    <div
      class="expense-item-container flex flex-col bg-neutral-color-300 h-92 w-[350px] p-4 rounded-lg"
    >
      <span class="flex justify-center font-bold text-lg w-full">
        {{ `${getActionName()} gasto` }}
      </span>
      <div class="expense-fields flex flex-col gap-3 my-5">
        <input
          tabindex="0"
          v-model="expense.amount"
          class="outline-0 rounded p-2 h-10 bg-neutral-color-700 focus:ring focus:ring-secondary-color-300"
          :class="{ 'border border-red-500': amountError }"
          type="number"
          min="0"
          required
          placeholder="Valor pago"
        />
        <category-selector
          :initial-value="selectedCategory"
          @on-select-option="onSelectCategory"
        />
        <balance-selector
          tabindex="0"
          :initial-value="selectedPayment"
          empty-message="Forma de pagamento"
          @select="selectBalance"
        />
        <datepicker :selected="expense.date" @set-date="setDate" />
        <div class="flex items-center text-lg gap-2">
          <input
            class="h-5 w-5"
            id="variable_check"
            type="checkbox"
            v-model="expense.variable"
          />
          <label
            for="variable_check"
            class="text-base"
            :class="{ 'text-neutral-color-off': expense.travel }"
            >Variável</label
          >
        </div>
        <textarea
          v-model="expense.note"
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
import Datepicker from '../common/Datepicker.vue';
import { PropType, ref, shallowRef, watch } from 'vue';
import { Expense } from './Expense';
import { Category } from '../categories/Category';
import { addExpense, editExpense } from '../../services';
import CategorySelector from '../common/CategorySelector.vue';
import BalanceSelector from '../common/BalanceSelector.vue';
import { Wallet } from '../wallets/Wallet';

const expense = shallowRef(new Expense());

const selectedCategory = shallowRef(new Category());
const selectedPayment = shallowRef(new Wallet());
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
      expense.value = props.expense;
      selectedCategory.value = props.expense.category;
      selectedPayment.value = props.expense.payment;
    }
  }
);

const getActionName = () => {
  return expense.value.id === '' ? 'Adicionar' : 'Editar';
};

const selectBalance = (balance: Wallet) => {
  expense.value.payment = balance;
};

const onSelectCategory = (option: any) => {
  selectedCategory.value = option;
  expense.value.category = option;
};

const setDate = (value: Date) => {
  expense.value.date = value;
};

const isValidForm = (): boolean => {
  let validForm = true;
  amountError.value = false;
  if (expense.value.amount <= 0) {
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
  if (expense.value.id === '') {
    addExpense(expense.value);
    emit('addExpense');
  } else {
    editExpense(expense.value);
  }
  emit('close');
};
</script>
