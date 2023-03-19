<template>
  <div
    v-show="opened"
    class="revenue-item-modal absolute flex justify-center items-center h-full w-full overflow-hidden bg-black bg-opacity-50"
  >
    <div
      class="revenue-item-container flex flex-col bg-neutral-color-300 h-92 w-[350px] p-4 rounded-lg"
    >
      <span class="flex justify-center font-bold text-lg w-full">
        {{ `${getActionName()} despesa ou renda` }}
      </span>
      <div class="revenue-fields flex flex-col gap-3 my-5">
        <div class="col-span-3 flex justify-center items-center">
          <input
            class="mr-2"
            type="radio"
            id="one"
            value="income"
            v-model="revenue.type"
          />
          <label for="one">Renda</label>
          <ph-trend-up
            class="ml-2 text-positive-color"
            size="24"
            weight="bold"
          />
          <input
            class="ml-8 mr-2"
            type="radio"
            id="two"
            value="outcome"
            v-model="revenue.type"
          />
          <label for="two">Despesa</label>
          <ph-trend-down
            class="ml-2 text-negative-color"
            size="24"
            weight="bold"
          />
        </div>
        <div class="currency-select" @click.stop>
          <div
            class="selected-option flex outline-0 rounded p-2 bg-neutral-color-700 h-10 cursor-pointer"
            :class="{ open: currencySelectorOpen }"
            @click="currencySelectorOpen = !currencySelectorOpen"
          >
            <component :is="selectedCurrency?.icon" class="h-6 w-6" />
            <span class="selected-option-name ml-2">
              {{ selectedCurrency?.name || 'Categoria' }}
            </span>
          </div>
          <ul
            class="period-items absolute bg-neutral-color-700 w-52"
            :class="{ hidden: !currencySelectorOpen }"
          >
            <li
              class="item flex cursor-pointer p-2 h-10 w-full"
              :class="{ 'item-selected': currency.id === selectedCurrency?.id }"
              v-for="currency in currencies"
              :key="currency.id"
              @click="selectCurrency(currency)"
            >
              <component :is="currency.icon" size="24" />
              <span class="item-name ml-2">
                {{ currency.name }}
              </span>
            </li>
          </ul>
        </div>
        <input
          v-model="revenue.amount"
          class="outline-0 rounded p-2 h-10 bg-neutral-color-700"
          type="number"
          min="0"
          required
          placeholder="Valor a receber/pagar"
        />
        <balance-selector
          :initial-value="selectedPayment"
          empty-message="Meio de pagamento"
          @select="selectBalance"
        />
        <datepicker
          :model-value="revenue.date"
          locale="pt"
          select-text="Selecionar"
          text-input
          format="dd/MM/yyyy HH:mm"
          placeholder="Data da renda ou despesa"
          @update:model-value="setDate"
        />
        <textarea
          v-model="revenue.description"
          class="flex col-span-3 resize-none outline-0 rounded p-2 bg-neutral-color-700 h-32"
          placeholder="Descreva a renda ou despesa"
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
          class="revenue-item-confirm max-w-fit h-8 px-2 bg-secondary-color-300 hover:bg-secondary-color-700 rounded"
          @click="onActionItem"
        >
          {{ getActionName() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BalanceSelector from '../common/BalanceSelector.vue';
import Datepicker from '@vuepic/vue-datepicker'; //https://vue3datepicker.com/props/formatting/
import { PropType, ref, shallowRef, watch } from 'vue';
import { addRevenue, editRevenue } from '../../services';
import { Investment } from '../investments/Investment';
import { Revenue } from './Revenue';

const revenue = shallowRef(new Revenue());
const currencies = [
  {
    id: 1,
    name: 'Real',
    icon: 'ph-coins',
    type: 'real',
  },
  {
    id: 2,
    name: 'Dolar',
    icon: 'ph-currency-dollar',
    type: 'dollar',
  },
  {
    id: 3,
    name: 'Euro',
    icon: 'ph-currency-eur',
    type: 'euro',
  },
];
const selectedCurrency = ref(currencies[0]);
const currencySelectorOpen = ref(false);
const emit = defineEmits(['addRevenue', 'close']);

const selectedPayment = shallowRef(new Investment());

const props = defineProps({
  opened: { type: Boolean, default: false },
  revenue: { type: Object as PropType<Revenue>, required: true },
});

watch(
  () => props.opened,
  () => {
    if (props.opened) {
      revenue.value = props.revenue;
      selectedPayment.value = props.revenue.payment;
    }
  }
);

const getActionName = () => {
  return revenue.value.id === '' ? 'Adicionar' : 'Editar';
};

const selectCurrency = (option: any) => {
  selectedCurrency.value = option;
  revenue.value.currency = option?.type;
  currencySelectorOpen.value = false;
};

const selectBalance = (balance: Investment) => {
  revenue.value.payment = balance;
};

const setDate = (value: Date) => {
  revenue.value.date = value;
};

const onActionItem = async () => {
  if (revenue.value.id === '') {
    await addRevenue(revenue.value);
  } else {
    await editRevenue(revenue.value);
  }
  emit('close');
};
</script>

<style lang="scss" scoped></style>
