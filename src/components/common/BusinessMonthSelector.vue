<template>
  <div class="flex gap-2 items-center">
    <span class="font-bold justify-center flex">
      {{ label ? label + ':' : '' }}
    </span>
    <div class="flex items-center gap-1">
      <ph-caret-circle-left
        size="24"
        class="cursor-pointer"
        @click="selectPrevMonth"
      />
      <div
        class="business-month-select rounded outline-0 focus:ring focus:ring-secondary-color-300 flex"
        :class="{
          'border border-red-500': error,
          'text-neutral-400': !selectedBusinessMonth,
        }"
        @click.stop
        tabindex="0"
      >
        <div
          class="selected-option disabled flex outline-0 rounded p-2 bg-neutral-color-700 h-10 cursor-pointer text-neutral-color-off"
          :class="{ open: businessMonthSelectorOpen }"
          @click="businessMonthSelectorOpen = !businessMonthSelectorOpen"
        >
          <ph-calendar size="24" />
          <span class="selected-option-name ml-2">
            {{ selectedBusinessMonth.name || 'Selecione um mês' }}
          </span>
        </div>
        <ul
          class="period-items scrollbar overflow-y-scroll overflow-x-hidden absolute bg-neutral-color-500 w-70 rounded max-h-80 z-10"
          :class="{ hidden: !businessMonthSelectorOpen }"
        >
          <li
            class="item flex cursor-pointer p-2 h-10 w-full hover:bg-neutral-color-700 hover:text-secondary-color-300"
            :class="{
              'bg-neutral-color-700 text-secondary-color-300':
                month.startDate === selectedBusinessMonth?.startDate,
            }"
            v-for="month in months"
            :key="month.startDate.toString()"
            @click="onSelectMonth(month)"
          >
            <span class="item-name ml-2">
              {{ month.name }}
            </span>
          </li>
        </ul>
      </div>
      <ph-caret-circle-right
        size="24"
        class="cursor-pointer"
        @click="selectNextMonth"
      />
    </div>
    <error-badge :message="error" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onUpdated, ref } from 'vue';
import ErrorBadge from './ErrorBadge.vue';
import {
  BusinessMonth,
  getBusinnesMonths,
  getCurrentBusinessMonth,
} from '../../utils';

defineProps({
  label: { type: String, optional: true, default: '' },
  error: { type: String, default: '' },
});

const emit = defineEmits(['select-month']);
const businessMonthSelectorOpen = ref(false);
const months = computed(() => getBusinnesMonths());
const selectedBusinessMonth = ref(getCurrentBusinessMonth());

function onSelectMonth(option: any) {
  selectedBusinessMonth.value = option;
  businessMonthSelectorOpen.value = false;
  emit('select-month', option);
}

function selectPrevMonth() {
  const index = months.value.findIndex(
    (month: BusinessMonth) => month.name === selectedBusinessMonth.value.name,
  );
  if (index > 0) {
    selectedBusinessMonth.value = months.value[index - 1];
    emit('select-month', selectedBusinessMonth.value);
  }
}

function selectNextMonth() {
  const index = months.value.findIndex(
    (month: BusinessMonth) => month.name === selectedBusinessMonth.value.name,
  );
  if (index < months.value.length - 1) {
    selectedBusinessMonth.value = months.value[index + 1];
    emit('select-month', selectedBusinessMonth.value);
  }
}

onUpdated(() => {
  const BusinessMonthSelector = document.querySelector(
    '.business-month-select',
  );
  if (BusinessMonthSelector) {
    BusinessMonthSelector.addEventListener('keydown', (event: any) => {
      event.stopPropagation();
      if (event.key === ' ') {
        businessMonthSelectorOpen.value = !businessMonthSelectorOpen.value;
      } else if (event.key === 'Escape') {
        businessMonthSelectorOpen.value = false;
      } else if (event.key === 'Tab') {
        businessMonthSelectorOpen.value = true;
        if (event.target === document.activeElement) {
          businessMonthSelectorOpen.value = false;
        }
      }
    });
  }
});

window.addEventListener(
  'click',
  () => (businessMonthSelectorOpen.value = false),
);
</script>
