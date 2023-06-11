<template>
  <div
    v-show="opened"
    class="revenue-item-modal absolute flex justify-center items-center h-full w-full overflow-hidden bg-black bg-opacity-50"
  >
    <form
      class="revenue-item-form flex flex-col bg-neutral-color-300 h-92 w-[350px] p-4 rounded-lg"
      @submit="handleSubmit"
    >
      <span class="flex justify-center font-bold text-lg w-full">
        {{ `${getActionName()} renda` }}
      </span>
      <div class="revenue-fields flex flex-col gap-4 my-5">
        <div class="flex flex-col gap-1">
          <span
            v-if="errors.amount"
            class="bg-red-200 text-red-600 rounded-xl pl-2"
            >{{ errors.amount }}</span
          >
          <input
            v-model="revenue.amount"
            id="revenueAmount"
            class="input-field"
            :class="{ 'border border-red-500': errors.amount }"
            type="number"
            min="0"
            required
            placeholder="Valor a receber"
            :oninvalid="handleSubmit"
            @input="handleAmountInput"
          />
        </div>
        <div class="flex flex-col gap-1">
          <span
            v-if="errors.payment"
            class="bg-red-200 text-red-600 rounded-xl pl-2"
            >{{ errors.payment }}</span
          >
          <balance-selector
            :initial-value="revenue.payment"
            empty-message="Selecione como receber"
            @select="selectBalance"
            :class="{ 'border border-red-500': errors.payment }"
          />
        </div>
        <div class="flex flex-col gap-1">
          <span
            v-if="errors.date"
            class="bg-red-200 text-red-600 rounded-xl pl-2"
            >{{ errors.date }}</span
          >
          <datepicker
            :selected="revenue.date"
            @set-date="selectDate"
            class="rounded"
            :class="{ 'border border-red-500': errors.date }"
          />
        </div>
        <div class="flex items-center text-lg gap-2">
          <input
            id="revenue_completed"
            type="checkbox"
            v-model="revenue.fullfilled"
            class="h-5 w-5"
            :class="{ 'cursor-pointer': revenue.id === '' }"
            :disabled="revenue.id !== ''"
          />
          <label
            for="revenue_completed"
            class="text-base cursor-pointer"
            :class="{
              'text-neutral-color-off cursor-default': revenue.id !== '',
            }"
            >Realizada</label
          >
        </div>
        <textarea
          v-model="revenue.description"
          class="input-field resize-none h-16"
          placeholder="Detalhes da renda"
        />
      </div>
      <div class="revenue-item-actions flex justify-end gap-4">
        <button
          class="revenue-item-cancel max-w-fit h-8 px-2 bg-neutral-color-300 border-2 border-neutral-color-700 hover:bg-neutral-color-700 rounded"
          @click="emit('close')"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="revenue-item-confirm max-w-fit h-8 px-2 bg-secondary-color-300 hover:bg-secondary-color-700 rounded"
        >
          {{ getActionName() }}
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import BalanceSelector from '../common/BalanceSelector.vue';
import Datepicker from '../common/Datepicker.vue';
import { onUpdated, PropType, ref, shallowRef, watch } from 'vue';
import { addRevenue, editRevenue } from '../../services';
import { Wallet } from '../wallets/Wallet';
import { Revenue } from './Revenue';

const emit = defineEmits(['addRevenue', 'close']);
const props = defineProps({
  opened: { type: Boolean, default: false },
  revenue: { type: Object as PropType<Revenue>, required: true },
});

const revenue = shallowRef(new Revenue());
const errors: Record<string, any> = ref({});
let setInitialFocus = true;

const validationRules = {
  amount: [(value: any) => (value ? '' : 'Valor precisa ser definido')],
  payment: [(value: Wallet) => (value ? '' : 'Conta precisa ser definida')],
  date: [(value: Date) => (value ? '' : 'Data precisa ser definida')],
};

const getActionName = () => {
  return revenue.value.id === '' ? 'Adicionar' : 'Editar';
};

const selectBalance = (balance: Wallet) => {
  errors.value.payment = null;
  revenue.value.payment = balance;
};

const selectDate = (value: Date) => {
  errors.value.date = null;
  revenue.value.date = value;
};

const handleAmountInput = () => {
  errors.value.amount = null;
};

const handleSubmit = async (event: any) => {
  event.preventDefault();
  errors.value = {};

  Object.entries(validationRules).forEach(([field, rules]) => {
    const errorMessages = rules
      // @ts-ignore
      .map((rule) => rule(revenue.value[field]))
      .filter((message) => message);
    if (errorMessages.length > 0) {
      errors.value[field] = errorMessages[0];
    }
  });

  if (Object.keys(errors.value).length === 0) {
    if (revenue.value.id === '') {
      await addRevenue(revenue.value);
    } else {
      await editRevenue(revenue.value);
    }
    emit('close');
  }
};

watch(
  () => props.opened,
  () => {
    if (props.opened) {
      revenue.value = props.revenue;
      errors.value = {};
      setInitialFocus = true;
    }
  }
);

onUpdated(() => {
  const amountInput = document.getElementById('revenueAmount');
  if (setInitialFocus && amountInput) {
    amountInput.focus();
    setInitialFocus = false;
  }
});
</script>
