<template>
  <div
    v-show="opened"
    class="wish-item-modal absolute flex justify-center items-center h-full w-full overflow-hidden bg-black bg-opacity-50"
  >
    <div
      class="wish-item-container flex flex-col bg-neutral-color-300 h-92 w-[350px] p-4 rounded-lg"
    >
      <span class="flex justify-center font-bold text-lg w-full">
        {{ `${getActionName()} desejo` }}
      </span>
      <div class="wish-fields flex flex-col gap-3 my-5">
        <div class="currency-select" @click.stop>
          <div
            class="selected-option disabled flex outline-0 rounded p-2 bg-neutral-color-700 h-10 cursor-pointer"
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
          v-model="wish.amount"
          class="outline-0 rounded p-2 h-10 bg-neutral-color-700"
          type="number"
          min="0"
          required
          placeholder="Valor a receber/pagar"
        />
        <textarea
          v-model="wish.description"
          class="flex col-span-3 resize-none outline-0 rounded p-2 bg-neutral-color-700 h-32"
          placeholder="Descreva a renda ou despesa"
        />
      </div>
      <div class="wish-item-actions flex justify-end gap-4">
        <button
          class="wish-item-cancel max-w-fit h-8 px-2 bg-neutral-color-300 border-2 border-neutral-color-700 hover:bg-neutral-color-700 rounded"
          @click="emit('close')"
        >
          Cancelar
        </button>
        <button
          class="wish-item-confirm max-w-fit h-8 px-2 bg-secondary-color-300 hover:bg-secondary-color-700 rounded"
          @click="onActionItem"
        >
          {{ getActionName() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, reactive, ref, watch } from 'vue';
import { addWish, editWish } from '../../services';
import { Wish } from './Wish';

let wish = reactive(new Wish());
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
const selectedCurrency = ref(currencies[2]);
const currencySelectorOpen = ref(false);
const emit = defineEmits(['addWish', 'close']);

const props = defineProps({
  opened: { type: Boolean, default: false },
  wish: { type: Object as PropType<Wish>, required: true },
});

watch(
  () => props.opened,
  () => {
    if (props.opened) {
      wish = props.wish;
    }
  }
);

const getActionName = () => {
  return wish.id === '' ? 'Adicionar' : 'Editar';
};

const selectCurrency = (option: any) => {
  selectedCurrency.value = option;
  wish.currency = option?.type;
  currencySelectorOpen.value = false;
};

const onActionItem = async () => {
  if (wish.id === '') {
    await addWish(wish);
  } else {
    await editWish(wish);
  }
  emit('close');
};
</script>

<style lang="scss" scoped></style>
