<template>
  <div class="flex flex-col gap-1">
    <span class="font-bold">Descrição</span>
    <textarea
      tabindex="0"
      class="flex col-span-3 resize-none outline-0 rounded p-2 bg-neutral-color-700 h-20 focus:ring focus:ring-secondary-color-300"
      :placeholder="props.placeholder"
      :value="props.value"
      @input="inputValue"
    />
    <error-badge :message="error" />
  </div>
</template>

<script lang="ts" setup>
import ErrorBadge from './ErrorBadge.vue';

const props = defineProps({
  label: { type: String, default: 'Descrição' },
  value: { type: String, default: '' },
  placeholder: { type: String, default: 'Descreve ai' },
  error: { type: String, default: '' },
});
const emit = defineEmits(['onInput']);

function inputValue(event: Event) {
  emit('onInput', (event.target as HTMLInputElement).value);
}
</script>
