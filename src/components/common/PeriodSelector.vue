<template>
  <div class="expense-period-select flex gap-2 items-center" @click.stop>
    <ph-caret-left
      size="28"
      weight="bold"
      @click="handlePrevious"
      class="button-action hover:bg-neutral-color-700"
    />
    <div>
      <div
        class="selected-option flex items-center outline-0 rounded p-2 bg-neutral-color-500 border border-neutral-color-700 h-8 cursor-pointer hover:bg-neutral-color-700"
        :class="{ open: periodSelectorOpen }"
        @click="periodSelectorOpen = !periodSelectorOpen"
      >
        <span class="selected-option-name flex justify-center w-32 text-lg">
          {{ selectedPeriod?.name || 'Periodo' }}
        </span>
      </div>
      <ul
        class="period-items scrollbar overflow-y-scroll overflow-x-hidden absolute bg-neutral-color-500 rounded w-36 h-40 z-10"
        :class="{ hidden: !periodSelectorOpen }"
      >
        <li
          class="item flex cursor-pointer p-2 h-10 w-full hover:bg-neutral-color-700 hover:text-secondary-color-300"
          :class="{
            'bg-neutral-color-700 text-secondary-color-300':
              period.name === selectedPeriod?.name,
          }"
          v-for="period in periods"
          :key="period.index"
          @click="selectPeriod(period)"
        >
          <span class="item-name ml-2">
            {{ period.name }}
          </span>
        </li>
      </ul>
    </div>
    <ph-caret-right
      size="28"
      weight="bold"
      @click="handleNext"
      class="button-action hover:bg-neutral-color-700"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from 'vue';
import { expensePeriods } from '../../services';
import { MonthPeriod } from '../../types';

const props = defineProps({
  selectedPeriod: { type: Object as PropType<any>, default: null },
});

const periods = computed(() => [...expensePeriods].reverse());
const emit = defineEmits(['selectOption']);

const periodSelectorOpen = ref(false);

const handlePrevious = () => {
  const prevIndex = props.selectedPeriod.index - 1;
  const newPeriod = expensePeriods.at(prevIndex);
  if (newPeriod) {
    selectPeriod(newPeriod);
  }
};

const handleNext = () => {
  let prevIndex = props.selectedPeriod.index + 1;
  if (prevIndex >= expensePeriods.length) {
    prevIndex = 0;
  }
  const newPeriod = expensePeriods.at(prevIndex);
  if (newPeriod) {
    selectPeriod(newPeriod);
  }
};

const selectPeriod = (option: MonthPeriod) => {
  periodSelectorOpen.value = false;
  emit('selectOption', option);
};

window.addEventListener('click', () => (periodSelectorOpen.value = false));
</script>
