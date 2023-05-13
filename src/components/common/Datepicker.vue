<template>
  <datepicker
    auto-apply
    locale="pt"
    text-input
    format="dd/MM/yyyy"
    placeholder="Data da renda ou despesa"
    :dark="isDarkTheme"
    :enable-time-picker="false"
    :model-value="selected"
    @update:model-value="handleDate"
  />
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
}
</style>
