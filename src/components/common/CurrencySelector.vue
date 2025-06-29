<template>
  <div class="flex flex-col gap-1">
    <span class="font-bold"> {{ label }}</span>
    <div
      class="currency-select rounded outline-0 focus:ring focus:ring-secondary-color-300"
      :class="{
        'border border-red-500': error,
        'text-neutral-400': !selectedCurrency,
      }"
      @click.stop
      tabindex="0"
    >
      <div
        class="selected-option disabled flex outline-0 rounded p-2 bg-neutral-color-700 h-10 cursor-pointer"
        :class="{ open: currencySelectorOpen }"
        @click="currencySelectorOpen = !currencySelectorOpen"
      >
        <component
          :is="selectedCurrency?.icon || 'ph-currency-circle-dollar'"
          class="h-6 w-6"
        />
        <span class="selected-option-name ml-2">
          {{ selectedCurrency?.name || 'Selecione uma moeda' }}
        </span>
      </div>
      <ul
        class="period-items absolute bg-neutral-color-500 rounded w-80 h-80 z-10"
        :class="{ hidden: !currencySelectorOpen }"
      >
        <li
          class="item flex cursor-pointer p-2 h-10 w-full"
          :class="{ 'item-selected': currency.id === selectedCurrency?.id }"
          v-for="currency in currencyItems"
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
    <error-badge :message="error" />
  </div>
</template>

<script lang="ts" setup>
import { PropType, onUpdated, ref, watch } from 'vue';
import { currencyItems } from '../../services';
import ErrorBadge from './ErrorBadge.vue';

const props = defineProps({
  label: { type: String, default: 'Moeda' },
  initialValue: { type: Object as PropType<any>, default: null },
  error: { type: String, default: '' },
});

const emit = defineEmits(['onSelectOption']);
const currencySelectorOpen = ref(false);
const selectedCurrency = ref(props.initialValue);

watch(
  () => props.initialValue,
  () => {
    selectedCurrency.value = props.initialValue;
  },
);

function selectCurrency(option: any) {
  selectedCurrency.value = option;
  currencySelectorOpen.value = false;
  emit('onSelectOption', option);
}

onUpdated(() => {
  const categorySelect = document.querySelector('.currency-select');
  if (categorySelect) {
    categorySelect.addEventListener('keydown', (event: any) => {
      event.stopPropagation();
      if (event.key === ' ') {
        currencySelectorOpen.value = !currencySelectorOpen.value;
      } else if (event.key === 'Escape') {
        currencySelectorOpen.value = false;
      } else if (event.key === 'Tab') {
        currencySelectorOpen.value = true;
        if (event.target === document.activeElement) {
          currencySelectorOpen.value = false;
        }
      }
    });
  }
});

window.addEventListener('click', () => (currencySelectorOpen.value = false));
</script>
