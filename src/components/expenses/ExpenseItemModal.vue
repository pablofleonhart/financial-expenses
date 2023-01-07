<template>
  <div
    v-show="opened"
    class="expense-item-modal absolute flex justify-center items-center h-full w-full bg-black bg-opacity-30"
  >
    <div
      class="expense-item-container flex flex-col bg-secondary-color h-92 w-1/2 p-4 rounded-lg"
    >
      <span class="flex justify-center font-bold text-lg w-full">
        Adicionar/Editar gasto
      </span>
      <div
        class="expense-fields grid grid-rows-[60px_60px] grid-cols-2 gap-4 items-center"
      >
        <input
          v-model="expense.amount"
          class="outline-0 rounded p-2 border border-secondary-color-dark h-10"
          type="number"
          min="0"
          required
          placeholder="Valor a receber/pagar"
        />
        <datepicker
          :model-value="expense.date"
          locale="pt"
          select-text="Selecionar"
          text-input
          format="dd/MM/yyyy HH:mm"
          placeholder="Data da renda ou despesa"
          @update:model-value="setDate"
        />
        <div class="category-select" @click.stop>
          <div
            class="selected-option flex outline-0 rounded p-2 border bg-white border-secondary-color-dark h-10 cursor-pointer"
            :class="{ open: categorySelectorOpen }"
            @click="categorySelectorOpen = !categorySelectorOpen"
          >
            <component
              :is="getCategoryIcon(selectedCategory?.type)"
              class="h-6 w-6"
            />
            <span class="selected-option-name ml-2">
              {{ selectedCategory?.name || '' }}
            </span>
          </div>
          <ul
            class="period-items absolute bg-white border border-secondary-color-dark w-52"
            :class="{ hidden: !categorySelectorOpen }"
          >
            <li
              class="item flex cursor-pointer p-2 h-10 w-full"
              :class="{ 'item-selected': category.id === selectedCategory?.id }"
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
        <div class="flex justify-center items-center text-lg">
          <input class="mr-2" type="checkbox" v-model="expense.card" />
          <component :is="getPaymentIcon(true)" class="h-6 w-6" />
          <label>Cartão</label>
        </div>
        <textarea
          v-model="expense.note"
          class="flex col-span-2 resize-none outline-0 rounded p-2 border border-secondary-color-dark h-24"
          placeholder="Descreva a renda ou despesa"
        />
      </div>
      <div class="expense-item-actions flex justify-end mt-6">
        <button
          class="expense-item-confirm max-w-fit h-8 px-2 bg-primary-color-dark text-white border-2 border-primary-color-dark hover:bg-secondary-color-dark hover:text-black rounded"
          @click="onActionItem"
        >
          {{ expense.id === '' ? 'Adicionar' : 'Editar' }}
        </button>
        <button
          class="expense-item-cancel ml-4 max-w-fit h-8 px-2 bg-primary-color border-2 border-primary-color-dark hover:bg-secondary-color rounded"
          @click="emit('close')"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker'; //https://vue3datepicker.com/props/formatting/
import { computed, PropType, reactive, ref, shallowRef, watch } from 'vue';
import { Expense } from './Expense';
import { Category } from '../categories/Category';
import { getCategoryIcon, getPaymentIcon } from '../../utils';
import { addExpense, categoryItems, editExpense } from '../../services';

let expense = reactive(new Expense());
const categories = computed<Array<Category>>(() => categoryItems);

const selectedCategory = shallowRef(new Category());
const categorySelectorOpen = ref(false);

const emit = defineEmits(['addExpense', 'close']);

const props = defineProps({
  opened: { type: Boolean, default: false },
  expense: { type: Object as PropType<Expense>, required: true },
});

watch(
  () => props.opened,
  () => {
    if (props.opened) {
      expense = props.expense;
      selectedCategory.value = props.expense.category;
    }
  }
);

const selectCategory = (option: any) => {
  selectedCategory.value = option;
  expense.category = option;
  categorySelectorOpen.value = false;
};

const setDate = (value: Date) => {
  expense.date = value;
};

const onActionItem = () => {
  if (expense.id === '') {
    addExpense(expense);
  } else {
    editExpense(expense);
  }
  emit('close');
};

const closeSelector = () => {
  categorySelectorOpen.value = false;
};

window.addEventListener('click', closeSelector);
</script>

<style lang="scss" scoped>
.income-type {
  background-color: #b2ecc7;
}

.outcome-type {
  background-color: #ffbdbd;
}
</style>
