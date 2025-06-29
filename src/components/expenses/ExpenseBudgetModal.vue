<template>
  <div
    v-show="opened"
    class="expense-item-modal absolute flex justify-center items-center scroll h-screen w-full overflow-hidden bg-black bg-opacity-50"
  >
    <div
      class="expense-item-container flex flex-col bg-neutral-color-300 h-92 w-[400px] p-4 rounded-lg"
    >
      <span class="flex justify-center font-bold text-lg w-full">
        {{ `${getActionName()} orçamento` }}
      </span>
      <div class="expense-fields flex flex-col gap-3 my-5">
        <currency-input
          id="budget-amount-selector"
          :value="_budget.amount"
          :error="errors.amount"
          @on-input="onInputAmount"
        />
        <currency-selector
          :initial-value="selectedCurrency"
          :error="errors.currencyType"
          @on-select-option="onSelectCurrency"
        />
        <category-selector
          :initial-value="selectedCategory"
          :error="errors.categoryID"
          @on-select-option="onSelectCategory"
        />
        <date-input
          label="Data inicial"
          :selected="_budget.startDate"
          :error="errors.startDate"
          @set-date="onSelectStartDate"
        />
        <date-input
          label="Data final"
          :selected="_budget.endDate"
          :error="errors.endDate"
          @set-date="onSelectEndDate"
        />
        <description-input
          :value="_budget.description"
          placeholder="Descreva o orçamento"
          @on-input="onInputDescription"
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
          @click="onSaveOrEdit"
        >
          {{ getActionName() }}
        </button>
        <button
          v-if="getActionName() === 'Adicionar'"
          class="wish-item-confirm max-w-fit h-8 px-2 bg-secondary-color-300 hover:bg-secondary-color-700 rounded"
          @click="onSaveAndCreateNew"
        >
          Salvar e criar outro
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, onUpdated, ref, shallowRef, watch } from 'vue';
import {
  addBudget,
  editBudget,
  getCategoryById,
  getCurrencyByType,
} from '../../services';
import { Budget } from '../budgets/Budget';
import { Category } from '../categories/Category';
import { Currency } from '../currencies';
import CategorySelector from '../common/CategorySelector.vue';
import CurrencyInput from '../common/CurrencyInput.vue';
import CurrencySelector from '../common/CurrencySelector.vue';
import DateInput from '../common/DateInput.vue';
import DescriptionInput from '../common/DescriptionInput.vue';
import { EVENT_BUS_EVENTS, emitEventBus } from '../../event-bus';

let setInitialFocus = true;
const _budget = shallowRef(new Budget());
const selectedCategory = shallowRef(new Category());
const selectedCurrency = shallowRef(new Currency());

const emit = defineEmits(['addExpense', 'addBudget', 'close']);

const props = defineProps({
  opened: { type: Boolean, default: false },
  budget: { type: Object as PropType<Budget>, required: true },
});

const errors: Record<string, any> = ref({});
const validationRules = {
  amount: [(value: number) => (value ? '' : 'Valor precisa ser definido')],
  currencyType: [
    (value: string) => (value ? '' : 'Moeda precisa ser definida'),
  ],
  categoryID: [
    (value: string) => (value ? '' : 'Categoria precisa ser definida'),
  ],
  startDate: [
    (value: Date) => (value ? '' : 'Data inicial precisa ser definida'),
  ],
  endDate: [(value: Date) => (value ? '' : 'Data final precisa ser definida')],
};

function setDataOnForm(budget: Budget) {
  _budget.value = budget;
  selectedCategory.value = getCategoryById(budget.categoryID);
  selectedCurrency.value = getCurrencyByType(budget.currencyType);
}

watch(
  () => props.opened,
  () => {
    if (props.opened) {
      errors.value = {};
      setDataOnForm(props.budget);
      setInitialFocus = true;
    }
  },
);

function getActionName(): string {
  return _budget.value.id === '' ? 'Adicionar' : 'Editar';
}

function onInputAmount(value: number) {
  errors.value.amount = '';
  _budget.value.amount = Number(value);
}

function onSelectCurrency(option: Currency) {
  errors.value.currencyType = null;
  selectedCurrency.value = option;
  _budget.value.currencyType = option.type;
}

function onSelectCategory(option: Category) {
  errors.value.categoryID = null;
  selectedCategory.value = option;
  _budget.value.categoryID = option.id;
}

function onSelectStartDate(value: Date | null) {
  errors.value.startDate = null;
  _budget.value.startDate = value || '';
}

function onSelectEndDate(value: Date) {
  errors.value.endDate = null;
  _budget.value.endDate = value || '';
}

function onInputDescription(value: string) {
  _budget.value.description = value;
}

function isValidForm(): boolean {
  errors.value = {};

  Object.entries(validationRules).forEach(([field, rules]) => {
    const errorMessages = rules
      // @ts-ignore
      .map((rule) => rule(_budget.value[field]))
      .filter((message) => message);
    if (errorMessages.length > 0) {
      errors.value[field] = errorMessages[0];
    }
  });

  return Object.keys(errors.value).length === 0;
}

async function onSaveOrEdit(event: Event) {
  event.preventDefault();
  if (!isValidForm()) {
    return;
  }
  if (_budget.value.id === '') {
    await addBudget(_budget.value);
  } else {
    await editBudget(_budget.value);
  }
  emitEventBus(EVENT_BUS_EVENTS.UPDATE_BUDGETS);
  emit('close');
}

async function onSaveAndCreateNew(event: Event) {
  event.preventDefault();
  if (isValidForm()) {
    await addBudget(_budget.value);
    emitEventBus(EVENT_BUS_EVENTS.UPDATE_BUDGETS);
    setDataOnForm(new Budget());
    setInitialFocus = true;
    autoFocus();
  }
}

function autoFocus() {
  const currencySelector = document.getElementById('budget-amount-selector');
  if (setInitialFocus && currencySelector) {
    currencySelector.focus();
    setInitialFocus = false;
  }
}

onUpdated(() => {
  autoFocus();
});
</script>
