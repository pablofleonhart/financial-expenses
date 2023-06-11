<template>
  <datepicker
    auto-apply
    locale="pt"
    text-input
    format="dd/MM/yy"
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
      />
    </template>
  </datepicker>
</template>

<script lang="ts" setup>
// https://vue3datepicker.com/props/formatting/
import Datepicker from '@vuepic/vue-datepicker';
import { onUpdated, PropType, ref } from 'vue';

defineProps({
  selected: { type: Object as PropType<Date | string>, default: new Date() },
});

const emit = defineEmits(['setDate']);
const isDarkTheme = ref(false);

onUpdated(() => {
  isDarkTheme.value = document.body.classList.contains('dark-theme');
});

const handleDate = (modelData: Date) => {
  emit('setDate', modelData);
};
</script>

<style lang="scss" scoped>
.dp__theme_light {
  --dp-background-color: var(--neutral-color-700);
  --dp-text-color: var(--neutral-color);
}
</style>
