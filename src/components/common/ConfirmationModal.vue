<template>
  <div
    v-show="showModal"
    class="absolute flex justify-center items-center h-full w-full bg-black bg-opacity-50"
  >
    <div
      class="flex flex-col justify-center bg-neutral-color-300 h-40 w-1/3 p-4 rounded-lg"
    >
      <span class="text-center">
        {{ message }}
      </span>
      <div class="revenue-item-actions flex justify-center mt-8 gap-4">
        <button
          class="revenue-item-cancel max-w-fit h-8 px-2 bg-neutral-color-300 border-2 border-neutral-color-700 hover:bg-neutral-color-700 rounded"
          @click="emit('cancel')"
        >
          Não
        </button>
        <button
          class="revenue-item-confirm max-w-fit h-8 px-2 bg-secondary-color-300 rounded border-2 border-secondary-color-300 hover:bg-secondary-color-700 hover:border-secondary-color-700"
          @click="emit('accept')"
        >
          Sim
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['accept', 'cancel']);

defineProps({
  showModal: { type: Boolean, default: false },
  message: { type: String, required: true },
});
</script>
