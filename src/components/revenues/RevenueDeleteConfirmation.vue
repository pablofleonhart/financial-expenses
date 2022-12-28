<template>
  <div 
    v-show="showDeleteConfirmation"
    class="absolute flex justify-center 
    items-center h-full w-full bg-black bg-opacity-30"
  >
    <div class="flex flex-col bg-secondary-color h-40 w-1/3 p-4 rounded-lg">
      <span class="text-center">
        Deseja realmente excluir essa renda/despesa?
      </span>
      <div class="revenue-item-actions flex justify-center mt-8">
        <button
          class="revenue-item-confirm max-w-fit h-8 px-2 bg-primary-color-dark text-white border-2 
          border-primary-color-dark hover:bg-secondary-color-dark hover:text-black rounded"
          @click="emit('accept')">
          Sim
        </button>
        <button
          class="revenue-item-cancel ml-4 max-w-fit h-8 px-2 bg-primary-color
          border-2 border-primary-color-dark hover:bg-secondary-color rounded"
          @click="emit('cancel')">
          Não
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['accept', 'cancel'])

defineProps({
  showDeleteConfirmation: { type: Boolean, default: false },
})
</script>