<template>
  <div class="wish-list h-[83%] overflow-auto scrollbar">
    <table class="table-auto h-fit w-full bg-neutral-color-500">
      <thead class="wish-list-head w-screen sticky top-0">
        <tr class="flex w-full h-10 bg-neutral-color-700">
          <th
            v-for="column in wishColumns"
            :key="column.key"
            class="flex items-center p-2 h-full w-1/3 cursor-pointer hover:bg-secondary-color-300"
            :class="column.class"
            @click="orderList(column)"
          >
            <component
              v-if="!column.static && orderColumn === column.key"
              :is="getOrderIcon(orderDirection)"
              size="20"
              class="mr-1"
            />
            <span>
              {{ column.name }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody
        v-for="(obj, pairIndex) in wishItemCategories"
        :key="pairIndex"
        class="wish-list-body flex flex-col w-full"
      >
        <tr class="flex w-full items-center h-10 bg-primary-color-300">
          <td
            class="flex justify-center items-center h-full font-bold text-lg gap-4 pl-4 col-span-4"
          >
            <component :is="getCategoryIconById(obj.category)" size="26" />
            {{ getCategoryNameById(obj.category) }}
            <span>{{
              obj.wishes.reduce((partialSum, a) => partialSum + a.amount, 0)
            }}</span>
          </td>
        </tr>
        <tr
          v-for="(wish, index) in obj.wishes"
          :key="index"
          class="category-group flex w-full items-center h-10 odd:bg-neutral-color-700"
        >
          <td class="flex justify-center items-center p-2 h-full w-1/3">
            {{
              formatCurrency(wish.amount, getCurrencyTypeById(wish.currencyID))
            }}
          </td>
          <td class="flex justify-center items-center p-2 h-full w-1/3">
            {{ wish.description }}
          </td>
          <td class="flex justify-center items-center p-2 h-full w-1/3">
            {{ getUsernameByID(wish.authorID) }}
          </td>
          <td class="flex items-center p-2 h-full w-1/3">
            <div
              v-if="selectedTab === WISH_STATUS.OPEN"
              class="flex w-full justify-evenly"
            >
              <ph-check-circle
                class="button-action text-neutral-color-off hover:bg-green-500 hover:text-neutral-50"
                @click="emit('onCompleteWish', wish)"
              />
              <ph-pencil
                class="button-action text-neutral-color-off hover:bg-blue-500 hover:text-neutral-50"
                @click="emit('onEditWish', wish)"
              />
              <ph-trash
                class="button-action text-neutral-color-off hover:bg-red-500 hover:text-neutral-50"
                @click="emit('onDeleteWish', wish)"
              />
            </div>
            <div v-else class="flex w-full justify-evenly">
              <ph-link
                class="button-action text-neutral-color-off hover:bg-cyan-500 hover:text-neutral-50 pointer-events-none"
                @click="openRelatedExpense"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { formatCurrency, getOrderIcon } from '../../utils';
import {
  wishSettings,
  sortWishes,
  wishCategoryItems,
  CategoryWish,
  getCategoryIconById,
  getCategoryNameById,
  getCurrencyTypeById,
  getUsernameByID,
} from '../../services';
import { WISH_STATUS } from '../../types';

defineProps({
  selectedTab: { type: Number, required: true },
});
const emit = defineEmits(['onCompleteWish', 'onEditWish', 'onDeleteWish']);

const wishColumns = [
  {
    key: 'amount',
    name: 'Valor',
    class: 'justify-center',
  },
  {
    key: 'description',
    name: 'Descrição',
    class: 'justify-center',
  },
  {
    key: 'authorID',
    name: 'Autor',
    class: 'justify-center',
  },
  {
    key: 'actions',
    name: 'Ações',
    class: 'justify-center cursor-default',
    static: true,
  },
];

const wishItemCategories = computed<Array<CategoryWish>>(
  () => wishCategoryItems,
);

const orderColumn = computed(() => {
  return wishSettings.column;
});

const orderDirection = computed(() => {
  return wishSettings.ascending;
});

const orderList = (column: any) => {
  if (column.static) {
    return;
  }
  sortWishes(column.key);
};

function openRelatedExpense() {
  console.log('show related expense');
}
</script>
