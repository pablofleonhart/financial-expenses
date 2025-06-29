<template>
  <div class="flex flex-col gap-1">
    <span class="font-bold"> {{ label }} </span>
    <input
      type="number"
      :min="minValue"
      required
      :placeholder="placeholder"
      tabindex="0"
      @input="inputValue"
      :value="props.value"
      class="outline-0 rounded p-2 h-10 bg-neutral-color-700 focus:ring focus:ring-secondary-color-300"
      :class="{ 'border border-red-500': error }"
    />
    <error-badge :message="error" />
  </div>
</template>

<script lang="ts" setup>
import ErrorBadge from './ErrorBadge.vue';

const props = defineProps({
  label: { type: String, default: 'Valor' },
  placeholder: { type: String, default: 'Valor' },
  value: { type: Number, default: 0 },
  error: { type: String, default: '' },
  minValue: { type: Number, default: 0 },
});
const emit = defineEmits(['onInput']);

function inputValue(event: Event) {
  if ((event as InputEvent).data !== '.') {
    emit('onInput', (event.target as HTMLInputElement).value);
  }
}
</script>
