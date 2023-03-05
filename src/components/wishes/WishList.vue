<template>
  <div class="wish-list">
    <table class="w-full overflow-hidden bg-neutral-color-500">
      <thead class="wish-list-head flex w-full">
        <tr class="flex w-full h-12 bg-neutral-color-700">
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
      <tbody class="wish-list-body flex flex-col w-full">
        <tr
          class="flex w-full items-center h-12 even:bg-neutral-color-700"
          v-for="(item, index) in wishList"
          :key="item.id"
        >
          <td class="flex justify-center items-center p-2 h-full w-1/3">
            {{ formatCurrency(item.amount, item.currency) }}
          </td>
          <td class="flex justify-center items-center p-2 h-full w-1/3">
            {{ item.description }}
          </td>
          <td class="flex items-center p-2 h-full w-1/3">
            <div class="flex w-full justify-evenly">
              <ph-check-circle
                v-if="showWishActions"
                class="button-action hover:bg-green-500"
                @click="onCompleteWish(index)"
              />
              <ph-arrow-counter-clockwise
                v-else
                class="button-action hover:bg-yellow-500"
                @click="onReopenWish(index)"
              />
              <ph-pencil
                class="button-action hover:bg-blue-500"
                @click="onEditWish(index)"
              />
              <ph-trash
                class="button-action hover:bg-red-500"
                @click="onDeleteWish(index)"
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
  completeWish,
  filteredWishItems,
  reopenWish,
  wishSettings,
  showWishActions,
  sortWishes,
} from '../../services';
import { Wish } from './Wish';

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
    key: 'actions',
    name: 'Ações',
    class: 'justify-center cursor-default',
    static: true,
  },
];

const emit = defineEmits(['onCompleteWish', 'onEditWish', 'onDeleteWish']);

const wishList = computed<Array<Wish>>(() => filteredWishItems);
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

const onCompleteWish = (index: number) => {
  completeWish(wishList.value[index]);
};

const onReopenWish = (index: number) => {
  reopenWish(wishList.value[index]);
};

const onEditWish = (index: number) => {
  emit('onEditWish', wishList.value[index]);
};

const onDeleteWish = (index: number) => {
  emit('onDeleteWish', wishList.value[index]);
};
</script>
