<template>
  <div 
    v-show="opened"
    class="revenue-item-modal absolute flex justify-center 
    items-center h-full w-full bg-black bg-opacity-30"
  >
    <div class="revenue-item-container flex flex-col bg-secondary-color h-92 w-3/4 p-4 rounded-lg"
      :class="revenueType === 'Renda' ? 'income-type' : 'outcome-type'"
    >
      <div class="revenue-fields grid grid-rows-[60px_60px] grid-cols-3">
        <div class="col-span-3 flex justify-center items-center text-lg">
          <input class="mr-2" type="radio" id="one" value="Renda" v-model="revenueType" />
          <label for="one">Renda</label>

          <input class="ml-8 mr-2" type="radio" id="two" value="Despesa" v-model="revenueType" />
          <label for="two">Despesa</label>
        </div>
        <input
          class="outline-0 rounded p-2 border border-secondary-color-dark h-10"
          type="number"
          min="0"
          required
          v-model="currencyValue"
          placeholder="Valor a receber/pagar"
        />
        <!-- <span class="text-red" v-if="currencyError">
          {{ currencyError }}
         </span> -->
        <input
          class="outline-0 rounded p-2 border border-secondary-color-dark h-10 mx-4"
          type="text"
          placeholder="Informe o banco vinculado"
        />
        <Datepicker
          locale="pt" select-text="Selecionar" text-input
          format="dd/MM/yyyy HH:mm"
          :model-value="renevueDate"
          placeholder="Data da renda ou despesa"
          @update:model-value="setDate"
        />
        <textarea
          class="flex col-span-3 resize-none outline-0 rounded p-2 border border-secondary-color-dark h-32"
          placeholder="Descreva a renda ou despesa"
        />
      </div>
      <div class="revenue-item-actions flex justify-end mt-6">
        <button
          class="revenue-item-confirm max-w-fit h-8 px-2 bg-primary-color-dark text-white border-2 
          border-primary-color-dark hover:bg-secondary-color-dark hover:text-black rounded"
          @click="onAddItem">
          Adicionar
        </button>
        <button
          class="revenue-item-cancel ml-4 max-w-fit h-8 px-2 bg-primary-color
          border-2 border-primary-color-dark hover:bg-secondary-color rounded"
          @click="onCloseLogoutModal">
          Cancelar
        </button>
      </div>
    </div>    
  </div>
</template>

<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker';
import { computed, ref } from 'vue';

const emit = defineEmits(['close'])

const renevueDate = ref(new Date())
const revenueType = ref('Renda')
const currencyValue = ref(0)

const currencyError = computed(() => {
  return currencyValue.value <= 0 ? "The Input field is required" : '';
})

defineProps({
  opened: { type: Boolean, default: false },
})

const setDate = (value: Date) => {
  renevueDate.value = value;
}

const onAddItem = () => {
  console.log('item adicionado')
}

const onCloseLogoutModal = () => {
  console.log('acao cancelada')
  emit('close')
}
</script>

<style lang="scss" scoped>
.income-type {
  background-color: #b2ecc7;
}

.outcome-type {
  background-color: #ffbdbd;
}
</style>