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
        <balance-selector
          tabindex="0"
          :initial-value="selectedPayment"
          empty-message="Forma de pagamento"
          @select="selectBalance"
        />
        <div class="category-select" @click.stop>
          <div
            class="selected-option flex outline-0 rounded p-2 bg-neutral-color-700 h-10 cursor-pointer"
            :class="{ open: categorySelectorOpen }"
            @click="categorySelectorOpen = !categorySelectorOpen"
          >
            <component
              :is="getCategoryIcon(selectedCategory?.type)"
              class="h-6 w-6"
            />
            <span class="selected-option-name ml-2">
              {{ selectedCategory?.name || 'Categoria' }}
            </span>
          </div>
          <ul
            class="period-items scrollbar overflow-y-scroll overflow-x-hidden absolute bg-neutral-color-500 rounded w-80 h-80 z-10"
            :class="{ hidden: !categorySelectorOpen }"
          >
            <li
              class="item flex cursor-pointer p-2 h-10 w-full hover:bg-neutral-color-700 hover:text-secondary-color-300"
              :class="{
                'bg-neutral-color-700 text-secondary-color-300':
                  category.id === selectedCategory?.id,
              }"
              v-for="category in categories"
              :key="category.id"
              @click="selectCategory(category)"
            >
              <component :is="getCategoryIcon(category.type)" class="h-6 w-6" />
              <span class="item-name ml-2">
                {{ category.name }}
              </span>
            </li>
          </ul>
        </div>
        <datepicker
          :model-value="expense.date"
          locale="pt"
          select-text="Selecionar"
          text-input
          format="dd/MM/yyyy HH:mm"
          placeholder="Data da renda ou despesa"
          @update:model-value="setDate"
        />
        <textarea
          v-model="expense.note"
          class="flex col-span-2 resize-none outline-0 rounded p-2 bg-neutral-color-700 h-24"
          placeholder="Descreva a renda ou despesa"
        />
        <div class="flex items-center text-lg gap-2">
          <input
            class="h-5 w-5"
            id="variable_check"
            type="checkbox"
            v-model="expense.variable"
          />
          <label for="variable_check" class="text-base">Variável</label>
        </div>
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
import Datepicker from '@vuepic/vue-datepicker'; //https://vue3datepicker.com/props/formatting/
import { computed, PropType, ref, shallowRef, watch } from 'vue';
import { Expense } from './Expense';
import { Category } from '../categories/Category';
import { getCategoryIcon } from '../../utils';
import { addExpense, categoryItems, editExpense } from '../../services';
import BalanceSelector from '../common/BalanceSelector.vue';
import { Wallet } from '../wallets/Wallet';

const expense = shallowRef(new Expense());
const categories = computed<Array<Category>>(() => categoryItems);

const selectedCategory = shallowRef(new Category());
const selectedPayment = shallowRef(new Wallet());
const categorySelectorOpen = ref(false);

const amountError = ref(false);
// const currencies = ['USD', 'EUR', 'GBP', 'JPY']
// const selectedCurrency = ref('USD')
// const value = ref('')
// const error = ref('')

// const formatValue = () => {
//   let formattedValue = '';
//   if (selectedCurrency.value === 'JPY') {
//     formattedValue = Math.round(value.value).toLocaleString();
//   } else {
//     formattedValue = parseFloat(value.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
//   }
//   value.value = formattedValue;
// }

// const validateValue = () => {
//       const pattern = /^\d+(\.\d{1,2})?$/;
//       if (!pattern.test(value.value)) {
//         error.value = 'Please enter a valid number';
//       } else {
//         error.value = '';
//       }
//     }

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

const selectCategory = (option: any) => {
  selectedCategory.value = option;
  expense.value.category = option;
  categorySelectorOpen.value = false;
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

const closeSelectors = () => {
  categorySelectorOpen.value = false;
};

window.addEventListener('click', closeSelectors);
</script>
