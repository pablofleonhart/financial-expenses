<template>
  <div class="flex flex-col gap-1">
    <span class="font-bold"> {{ label }} </span>
    <datepicker
      auto-apply
      locale="pt"
      text-input
      format="dd/MM/yyyy"
      :dark="isDarkTheme"
      :enable-time-picker="false"
      :model-value="selected"
      @update:model-value="handleDate"
    >
      <template #dp-input="{ value }">
        <input
          type="text"
          :value="value"
          placeholder="Selecione a data"
          class="focus:ring focus:ring-secondary-color-300 outline-0 rounded w-full p-2 h-10 bg-neutral-color-700"
          :class="{ 'border border-red-500': error }"
        />
      </template>
    </datepicker>
    <error-badge :message="error" />
  </div>
</template>

<script lang="ts" setup>
// https://vue3datepicker.com/props/formatting/
import Datepicker from '@vuepic/vue-datepicker';
import ErrorBadge from './ErrorBadge.vue';
import { onUpdated, ref } from 'vue';

import { defineProps } from 'vue';

defineProps({
  label: { type: String, default: 'Data' },
  selected: { type: [Date, String], default: () => new Date() },
  error: { type: String, default: '' },
});

const emit = defineEmits(['setDate']);
const isDarkTheme = ref(false);

onUpdated(() => {
  isDarkTheme.value = document.body.classList.contains('dark-theme');
});

const handleDate = (modelData: Date) => {
  emit('setDate', modelData);
};

// function format(date: Date) {
//   return formatDate(date);
// }
</script>

<style lang="scss" scoped>
.dp__theme_light {
  --dp-background-color: var(--neutral-color-700);
  --dp-text-color: var(--neutral-color);
}
</style>
