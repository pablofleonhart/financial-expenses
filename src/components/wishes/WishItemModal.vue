<template>
  <div
    v-show="opened"
    class="wish-item-modal absolute flex justify-center items-center h-full w-full overflow-hidden bg-black bg-opacity-50"
  >
    <div
      class="wish-item-container flex flex-col bg-neutral-color-300 h-92 w-[400px] p-4 rounded-lg"
    >
      <span class="flex justify-center font-bold text-lg w-full">
        {{ `${getActionName()} planejamento` }}
      </span>
      <div class="wish-fields flex flex-col gap-4 my-5">
        <currency-selector
          id="wish-currency-selector"
          :initial-value="selectedCurrency"
          :error="errors.currencyID"
          @on-select-option="onSelectCurrency"
        />
        <currency-input
          :value="localWish.amount"
          :error="errors.amount"
          @on-input="onInputAmount"
        />
        <category-selector
          :initial-value="selectedCategory"
          :error="errors.categoryID"
          @on-select-option="onSelectCategory"
        />
        <description-input
          :value="localWish.description"
          placeholder="Descreva o seu plano"
          @on-input="onInputDescription"
        />
      </div>
      <div class="wish-item-actions flex justify-end gap-6 items-center">
        <button
          class="wish-item-cancel max-w-fit h-8 px-2 bg-neutral-color-300 border-2 border-neutral-color-700 hover:bg-neutral-color-700 rounded"
          @click="emit('close')"
        >
          Cancelar
        </button>
        <button
          class="wish-item-confirm max-w-fit h-8 px-2 bg-primary-color-300 hover:bg-primary-color-700 rounded"
          @click="onSaveOrEdit"
        >
          {{ getActionName() }}
        </button>
        <button
          v-if="getActionName() === 'Salvar'"
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
  account,
  addWish,
  editWish,
  getCategoryById,
  getCurrencyById,
} from '../../services';
import { Category } from '../categories/Category';
import CategorySelector from '../common/CategorySelector.vue';
import CurrencyInput from '../common/CurrencyInput.vue';
import CurrencySelector from '../common/CurrencySelector.vue';
import DescriptionInput from '../common/DescriptionInput.vue';
import { Currency } from '../currencies';
import { Wish } from './Wish';

let setInitialFocus = true;
const localWish = shallowRef(new Wish());

const selectedCategory = shallowRef(new Category());
const selectedCurrency = shallowRef(new Currency());

const emit = defineEmits(['addWish', 'close']);
const props = defineProps({
  opened: { type: Boolean, default: false },
  wish: { type: Object as PropType<Wish>, required: true },
});

const errors: Record<string, any> = ref({});
const validationRules = {
  currencyID: [(value: string) => (value ? '' : 'Moeda precisa ser definida')],
  amount: [(value: number) => (value ? '' : 'Valor precisa ser definido')],
  categoryID: [
    (value: string) => (value ? '' : 'Categoria precisa ser definida'),
  ],
};

function setDataOnForm(wish: Wish) {
  localWish.value = wish;
  selectedCategory.value = getCategoryById(wish.categoryID);
  selectedCurrency.value = getCurrencyById(wish.currencyID);
}

watch(
  () => props.opened,
  () => {
    if (props.opened) {
      errors.value = {};
      setDataOnForm(props.wish);
      setInitialFocus = true;
    }
  },
);

const getActionName = () => {
  return localWish.value.id === '' ? 'Salvar' : 'Editar';
};

function onSelectCurrency(option: Currency) {
  errors.value.currencyID = '';
  selectedCurrency.value = option;
  localWish.value.currencyID = option.id;
}

function onInputAmount(value: number) {
  errors.value.amount = '';
  localWish.value.amount = Number(value);
}

const onSelectCategory = (option: any) => {
  errors.value.categoryID = '';
  selectedCategory.value = option;
  localWish.value.categoryID = option.id;
};

function onInputDescription(value: string) {
  localWish.value.description = value;
}

function isValidForm(): boolean {
  errors.value = {};

  Object.entries(validationRules).forEach(([field, rules]) => {
    const errorMessages = rules
      // @ts-ignore
      .map((rule) => rule(localWish.value[field]))
      .filter((message) => message);
    if (errorMessages.length > 0) {
      errors.value[field] = errorMessages[0];
    }
  });

  return Object.keys(errors.value).length === 0;
}

const onSaveOrEdit = async (event: Event) => {
  event.preventDefault();
  if (isValidForm()) {
    if (localWish.value.id === '') {
      localWish.value.authorID = account.id;
      await addWish(localWish.value);
    } else {
      await editWish(localWish.value);
    }
    emit('close');
  }
};

function autoFocus() {
  const currencySelector = document.getElementById('wish-currency-selector');
  if (setInitialFocus && currencySelector) {
    currencySelector.focus();
    setInitialFocus = false;
  }
}

async function onSaveAndCreateNew(event: Event) {
  event.preventDefault();
  if (isValidForm()) {
    localWish.value.authorID = account.id;
    await addWish(localWish.value);
    setDataOnForm(new Wish());
    setInitialFocus = true;
    autoFocus();
  }
}

onUpdated(() => {
  autoFocus();
});
</script>

<style lang="scss" scoped></style>
