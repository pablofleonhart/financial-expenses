<template>
  <div class="revenue-list flex mt-6">
    <table class="table-auto w-full border-collapse border border-slate-400">
      <thead class="revenue-list-head flex w-full">
        <tr class="flex w-full h-12">
          <th class="border flex items-center border-slate-400 p-1 h-full w-1/5 justify-end">Valor</th>
          <th class="border flex items-center border-slate-400 p-1 h-full w-1/5">Descrição</th>
          <th class="border flex items-center border-slate-400 p-1 h-full w-1/5">Data</th>
          <th class="border flex items-center border-slate-400 p-1 h-full w-1/5">Banco</th>
          <th class="border flex items-center border-slate-400 p-1 h-full w-1/5 justify-center">Ações</th>
        </tr>
      </thead>
      <tbody class="revenue-list-body flex flex-col w-full">
        <tr class="flex w-full items-center h-12"
          v-for="item in billItems" :key="item.id">
          <td class="border flex items-center border-slate-400 p-1 h-full w-1/5 justify-end">
            {{ formatCurrency(item.value) }}
          </td>
          <td class="border flex items-center border-slate-400 p-1 h-full w-1/5">
            {{ item.description }}
          </td>
          <td class="border flex items-center border-slate-400 p-1 h-full w-1/5">
            {{ formatDate(item.date) }}
          </td>
          <td class="border flex items-center border-slate-400 p-1 h-full w-1/5">
            {{ item.bank }}
          </td>
          <td class="border flex items-center border-slate-400 p-1 h-full w-1/5 justify-center">
            <div class="flex">
              <EditIcon class="h-6 w-6 cursor-pointer"
                @click="editRevenue"
              />
              <DeleteIcon class="h-6 w-6 cursor-pointer"
                @click="deleteRevenue"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { formatCurrency } from '../../utils/index'
import DeleteIcon from "../../assets/DeleteIcon.vue"
import EditIcon from "../../assets/EditIcon.vue"

interface IBillItem {
  id: number
  value: number
  description: string
  date: Date
  bank: string
}

const demoList: Array<IBillItem> = [
  {
    id: 1,
    value: 2016.70,
    description: 'FGTS',
    date: new Date(),
    bank: 'Nubank'
  },
  {
    id: 2,
    value: 2016.70,
    description: 'FGTS',
    date: new Date(),
    bank: 'Nubank'
  },
  {
    id: 3,
    value: 2016.70,
    description: 'FGTS',
    date: new Date(),
    bank: 'Nubank'
  },
  {
    id: 4,
    value: 2016.70,
    description: 'FGTS',
    date: new Date(),
    bank: 'Nubank'
  },
  {
    id: 5,
    value: 2016.70,
    description: 'FGTS',
    date: new Date(),
    bank: 'Nubank'
  },
  {
    id: 6,
    value: 2016.70,
    description: 'FGTS',
    date: new Date(),
    bank: 'Nubank'
  }
]

const formatDate = (date: Date): string => {
  if(!date){
    return 'No date'
  }
  return date.toLocaleDateString()
}

const billItems = computed<Array<IBillItem>>(() => {
  return demoList
})

const editRevenue = () => {
  console.log('edit revenue')
}

const deleteRevenue = () => {
  console.log('delete revenue')
}

</script>