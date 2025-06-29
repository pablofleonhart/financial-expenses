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
        <currency-input
          placeholder="Valor pago"
          :value="localExpense.amount"
          :error="errors.amount"
          @on-input="onInputAmount"
        />
        <currency-input
          v-if="localExpense.id === ''"
          label="Parcelas"
          placeholder="Numero de parcelas"
          :min-value="1"
          :value="Number(localExpense.installments)"
          :error="errors.installments"
          @on-input="onInputSplit"
        />
        <div class="flex flex-col gap-1" v-else>
          <span class="font-bold">Parcelas</span>
          <input
            disabled
            type="text"
            class="flex rounded p-2 bg-neutral-color-700 cursor-not-allowed"
            :value="localExpense.installments"
          />
        </div>
        <category-selector
          :initial-value="selectedCategory"
          :error="errors.categoryID"
          @on-select-option="onSelectCategory"
        />
        <account-selector
          :initial-value="selectedPayment"
          empty-message="Forma de pagamento"
          :error="errors.paymentID"
          @select="onSelectPayment"
        />
        <date-input
          :selected="expense.date"
          :error="errors.date"
          @set-date="setDate"
        />
        <div class="flex items-center text-lg gap-2">
          <input
            class="h-5 w-5"
            id="variable_check"
            type="checkbox"
            v-model="localExpense.isVariable"
          />
          <label
            for="variable_check"
            class="text-base"
            :class="{ 'text-neutral-color-off': localExpense.travelID }"
            >Gasto variável</label
          >
        </div>
        <description-input
          :value="localExpense.description"
          placeholder="Descreva esse gasto"
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
          @click="onActionItem"
        >
          {{ getActionName() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DateInput from '../common/DateInput.vue';
import { PropType, ref, shallowRef, watch } from 'vue';
import { Expense } from './Expense';
import { Category } from '../categories/Category';
import {
  addExpense,
  editExpense,
  fullFilWish,
  getCategoryById,
} from '../../services';
import AccountSelector from '../common/AccountSelector.vue';
import CategorySelector from '../common/CategorySelector.vue';
import CurrencyInput from '../common/CurrencyInput.vue';
import DescriptionInput from '../common/DescriptionInput.vue';
import { Account } from '../accounts/Account';
import { getAccountById } from '../../services/account-service';
import { Wish } from '../wishes/Wish';
import { EVENT_BUS_EVENTS, emitEventBus } from '../../event-bus';

const localExpense = shallowRef(new Expense());

const selectedCategory = shallowRef(new Category());
const selectedPayment = shallowRef(new Account());

const errors: Record<string, any> = ref({});
const validationRules = {
  amount: [
    (value: number) => (value ? '' : 'Valor precisa ser definido'),
    (value: number) => (value > 0 ? '' : 'Valor precisa ser maior do que 0'),
  ],
  installments: [
    (value: number) => (value ? '' : 'Numero de parcelas precisa ser definido'),
    (value: number) => {
      value > 0 ? '' : 'Numero de parcelas precisa ser maior do que 0';
    },
  ],
  paymentID: [
    (value: string) => (value ? '' : 'Pagamento precisa ser definido'),
  ],
  categoryID: [
    (value: string) => (value ? '' : 'Categoria precisa ser definida'),
  ],
  date: [(value: string) => (value ? '' : 'Data precisa ser definida')],
};

const emit = defineEmits(['addExpense', 'close']);
const props = defineProps({
  opened: { type: Boolean, default: false },
  expense: { type: Object as PropType<Expense>, required: true },
  wishSource: { type: Object as PropType<Wish>, default: null },
});

watch(
  () => props.opened,
  () => {
    if (props.opened) {
      errors.value = {};
      localExpense.value = props.expense;
      selectedCategory.value = getCategoryById(props.expense.categoryID);
      selectedPayment.value = props.expense.paymentID
        ? getAccountById(props.expense.paymentID)
        : new Account();
    }
  },
);

const getActionName = () => {
  return localExpense.value.id === '' ? 'Adicionar' : 'Editar';
};

function onInputAmount(value: number) {
  errors.value.amount = '';
  localExpense.value.amount = Number(value);
}

function onInputSplit(value: number) {
  errors.value.installments = '';
  localExpense.value.installments = String(value);
}

const onSelectPayment = (account: Account) => {
  errors.value.paymentID = '';
  localExpense.value.paymentID = account.id;
};

const onSelectCategory = (category: Category) => {
  errors.value.categoryID = '';
  localExpense.value.categoryID = category.id;
};

const setDate = (value: Date) => {
  errors.value.date = '';
  localExpense.value.date = value;
};

function onInputDescription(value: string) {
  localExpense.value.description = value;
}

function isValidForm(): boolean {
  errors.value = {};

  Object.entries(validationRules).forEach(([field, rules]) => {
    const errorMessages = rules
      // @ts-ignore
      .map((rule) => rule(localExpense.value[field]))
      .filter((message) => message);
    if (errorMessages.length > 0) {
      errors.value[field] = errorMessages[0];
    }
  });

  return Object.keys(errors.value).length === 0;
}

async function onActionItem(event: Event) {
  event.preventDefault();
  if (isValidForm()) {
    if (localExpense.value.id === '') {
      if (props.wishSource) {
        await fullFilWish(props.wishSource, localExpense.value);
      }
      await addExpense(localExpense.value);
    } else {
      await editExpense(localExpense.value);
    }
    emitEventBus(EVENT_BUS_EVENTS.UPDATE_EXPENSES);
    emit('close');
  }
}
</script>
