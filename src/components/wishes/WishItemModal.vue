<template>
  <div
    v-show="opened"
    class="wish-item-modal absolute flex justify-center items-center h-full w-full overflow-hidden bg-black bg-opacity-50"
  >
    <div
      class="wish-item-container flex flex-col bg-neutral-color-300 h-92 w-[350px] p-4 rounded-lg"
    >
      <span class="flex justify-center font-bold text-lg w-full">
        {{ `${getActionName()} planejamento` }}
      </span>
      <div class="wish-fields flex flex-col gap-3 my-5">
        <currency-selector
          :initial-value="selectedCurrency"
          @on-select-option="onSelectCurrency"
        />
        <input
          v-model="localWish.amount"
          class="outline-0 rounded p-2 h-10 bg-neutral-color-700"
          type="number"
          min="0"
          required
          placeholder="Valor previsto"
        />
        <category-selector
          :initial-value="selectedCategory"
          @on-select-option="onSelectCategory"
        />
        <textarea
          v-model="localWish.description"
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
import { PropType, shallowRef, watch } from 'vue';
import {
  account,
  addWish,
  editWish,
  getCategoryById,
  getCurrencyById,
} from '../../services';
import { Category } from '../categories/Category';
import CategorySelector from '../common/CategorySelector.vue';
import CurrencySelector from '../common/CurrencySelector.vue';
import { Currency } from '../currencies';
import { Wish } from './Wish';

const localWish = shallowRef(new Wish());

const selectedCategory = shallowRef(new Category());
const selectedCurrency = shallowRef(new Currency());

const emit = defineEmits(['addWish', 'close']);

const props = defineProps({
  opened: { type: Boolean, default: false },
  wish: { type: Object as PropType<Wish>, required: true },
});

watch(
  () => props.opened,
  () => {
    if (props.opened) {
      localWish.value = props.wish;
      selectedCategory.value = getCategoryById(props.wish.categoryID);
      selectedCurrency.value = getCurrencyById(props.wish.currencyID);
    }
  },
);

const getActionName = () => {
  return localWish.value.id === '' ? 'Adicionar' : 'Editar';
};

const onSelectCategory = (option: any) => {
  selectedCategory.value = option;
  localWish.value.categoryID = option.id;
};

function onSelectCurrency(option: Currency) {
  selectedCurrency.value = option;
  localWish.value.currencyID = option.id;
}

const onActionItem = async () => {
  if (localWish.value.id === '') {
    localWish.value.authorID = account.id;
    await addWish(localWish.value);
  } else {
    await editWish(localWish.value);
  }
  emit('close');
};
</script>

<style lang="scss" scoped></style>
