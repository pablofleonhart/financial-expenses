<template>
  <div
    v-show="opened"
    class="investment-item-modal absolute flex justify-center items-center h-full w-full bg-black bg-opacity-30"
  >
    <div
      class="investment-item-container flex flex-col bg-secondary-color h-100 w-80 p-4 rounded-lg"
    >
      <span class="flex justify-center font-bold text-lg w-full">
        Adicionar/Editar investimento
      </span>
      <div class="investment-fields flex flex-col gap-3 my-5">
        <div class="category-select" @click.stop>
          <div
            class="selected-option flex outline-0 rounded p-2 border bg-white border-secondary-color-dark h-10 cursor-pointer"
            :class="{ open: currencySelectorOpen }"
            @click="currencySelectorOpen = !currencySelectorOpen"
          >
            <component :is="selectedCurrency?.icon" class="h-6 w-6" />
            <span class="selected-option-name ml-2">
              {{ selectedCurrency?.name || 'Categoria' }}
            </span>
          </div>
          <ul
            class="period-items absolute bg-white border border-secondary-color-dark w-52"
            :class="{ hidden: !currencySelectorOpen }"
          >
            <li
              class="item flex cursor-pointer p-2 h-10 w-full"
              :class="{ 'item-selected': category.id === selectedCurrency?.id }"
              v-for="category in currencies"
              :key="category.id"
              @click="selectCurrency(category)"
            >
              <component :is="category.icon" size="24" />
              <span class="item-name ml-2">
                {{ category.name }}
              </span>
            </li>
          </ul>
        </div>
        <input
          v-model="investment.amount"
          class="outline-0 rounded p-2 border border-secondary-color-dark h-10"
          type="number"
          min="0"
          required
        />
        <input
          v-model="investment.broker"
          class="outline-0 rounded p-2 border border-secondary-color-dark h-10"
          type="text"
          placeholder="Banco ou corretora"
        />
        <input
          v-model="investment.holder"
          class="outline-0 rounded p-2 border border-secondary-color-dark h-10"
          type="text"
          placeholder="Titular da conta"
        />
      </div>
      <div class="investment-item-actions flex justify-end">
        <button
          class="investment-item-confirm max-w-fit h-8 px-2 bg-primary-color-dark text-white border-2 border-primary-color-dark hover:bg-secondary-color-dark hover:text-black rounded"
          @click="onActionItem"
        >
          {{ investment.id === '' ? 'Adicionar' : 'Editar' }}
        </button>
        <button
          class="investment-item-cancel ml-4 max-w-fit h-8 px-2 bg-primary-color border-2 border-primary-color-dark hover:bg-secondary-color rounded"
          @click="emit('close')"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, reactive, ref, watch } from 'vue';
import { addInvestment, editInvestment } from '../../services';
import { Investment } from './Investment';

let investment = reactive(new Investment());
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
const emit = defineEmits(['addInvestment', 'close']);

const props = defineProps({
  opened: { type: Boolean, default: false },
  investment: { type: Object as PropType<Investment>, required: true },
});

watch(
  () => props.opened,
  () => {
    if (props.opened) {
      investment = props.investment;
    }
  }
);

const selectCurrency = (option: any) => {
  selectedCurrency.value = option;
  investment.currency = option?.type;
  currencySelectorOpen.value = false;
};

const onActionItem = async () => {
  if (investment.id === '') {
    await addInvestment(investment);
  } else {
    await editInvestment(investment);
  }
  emit('close');
};
</script>

<style lang="scss" scoped>
.income-type {
  background-color: #b2ecc7;
}

.outcome-type {
  background-color: #ffbdbd;
}
</style>
