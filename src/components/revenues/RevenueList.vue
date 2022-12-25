<template>
  <div class="revenue-list">
    <table class="table-auto w-full  overflow-hidden">
      <thead class="revenue-list-head flex w-full">
        <tr class="flex w-full h-12 bg-secondary-color-dark">
          <th class="flex items-center p-2 h-full w-1/5 justify-end">Valor</th>
          <th class="flex items-center p-2 h-full w-1/5">Descrição</th>
          <th class="flex items-center p-2 h-full w-1/5">Data</th>
          <th class="flex items-center p-2 h-full w-1/5">Banco</th>
          <th class="flex items-center p-2 h-full w-1/5 justify-center">Ações</th>
        </tr>
      </thead>
      <tbody class="revenue-list-body flex flex-col w-full">
        <tr class="flex w-full items-center h-12 even:bg-secondary-color-dark"
          v-for="item in billItems" :key="item.id">
          <td class="flex items-center p-2 h-full w-1/5 justify-end">
            {{ formatCurrency(item.value) }}
          </td>
          <td class="flex items-center p-2 h-full w-1/5">
            {{ item.description }}
          </td>
          <td class="flex items-center p-2 h-full w-1/5">
            {{ formatDate(item.date) }}
          </td>
          <td class="flex items-center p-2 h-full w-1/5">
            {{ item.bank }}
          </td>
          <td class="flex items-center p-2 h-full w-1/5">
            <div class="flex w-full justify-evenly">
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