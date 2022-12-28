<template>
  <div 
    v-show="opened"
    class="revenue-item-modal absolute flex justify-center 
    items-center h-full w-full bg-black bg-opacity-30"
  >
    <div class="revenue-item-container flex flex-col bg-secondary-color h-92 w-3/4 p-4 rounded-lg"
      :class="revenue.type === 'income' ? 'income-type' : 'outcome-type'"
    >
      <div class="revenue-fields grid grid-rows-[60px_60px] grid-cols-3">
        <div class="col-span-3 flex justify-center items-center text-lg">
          <input class="mr-2" type="radio" id="one" value="income" v-model="revenue.type" />
          <label for="one">Renda</label>

          <input class="ml-8 mr-2" type="radio" id="two" value="outcome" v-model="revenue.type" />
          <label for="two">Despesa</label>
        </div>
        <input
          v-model="revenue.amount"
          class="outline-0 rounded p-2 border border-secondary-color-dark h-10"
          type="number"
          min="0"
          required
          placeholder="Valor a receber/pagar"
        />
        <input
          v-model="revenue.bank"
          class="outline-0 rounded p-2 border border-secondary-color-dark h-10 mx-4"
          type="text"
          placeholder="Informe o banco vinculado"
        />
        <Datepicker
          :model-value="revenue.date"
          locale="pt" select-text="Selecionar" text-input
          format="dd/MM/yyyy HH:mm"
          placeholder="Data da renda ou despesa"
          @update:model-value="setDate"
        />
        <textarea
          v-model="revenue.description"
          class="flex col-span-3 resize-none outline-0 rounded p-2 border border-secondary-color-dark h-32"
          placeholder="Descreva a renda ou despesa"
        />
      </div>
      <div class="revenue-item-actions flex justify-end mt-6">
        <button
          class="revenue-item-confirm max-w-fit h-8 px-2 bg-primary-color-dark text-white border-2 
          border-primary-color-dark hover:bg-secondary-color-dark hover:text-black rounded"
          @click="onActionItem">
          {{ revenue.id === '' ? 'Adicionar' : 'Editar' }}
        </button>
        <button
          class="revenue-item-cancel ml-4 max-w-fit h-8 px-2 bg-primary-color
          border-2 border-primary-color-dark hover:bg-secondary-color rounded"
          @click="emit('close')">
          Cancelar
        </button>
      </div>
    </div>    
  </div>
</template>

<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker'; //https://vue3datepicker.com/props/formatting/
import { PropType, reactive, watch } from 'vue';
import { addRevenue, editRevenue } from '../../services';
import { Revenue } from './Revenue';

let revenue = reactive(new Revenue())

const emit = defineEmits(['addRevenue', 'close'])

const props = defineProps({
  opened: { type: Boolean, default: false },
  revenue: { type: Object as PropType<Revenue>, required: true },
})

watch(() => props.opened, () => {
  if(props.opened) {
    revenue = props.revenue
  }
})

const setDate = (value: Date) => {
  revenue.date = value;
}

const onActionItem = async() => {
  if(revenue.id === '') {
    await addRevenue(revenue)
  } else {
    await editRevenue(revenue)
  }
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