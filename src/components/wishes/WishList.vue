<template>
  <!-- <table class="table-auto">
    <thead>
      <tr>
        <th class="px-4 py-2"></th>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Age</th>
        <th class="px-4 py-2">City</th>
      </tr>
    </thead>
    <tbody>
      <tr class="group bg-gray-200 cursor-pointer">
        <td class="px-4 py-2 font-bold" colspan="4">
          <span class="group-toggle pr-2">&#x25B6;</span>Group 1
        </td>
      </tr>
      <tr class="group-content hover:bg-gray-100 transition-all duration-500 ease-in-out collapse opacity-0">
        <td colspan="4">
          <table class="w-full h-auto">
            <tbody>
              <tr>
                <td class="border px-4 py-2">1</td>
                <td class="border px-4 py-2">John</td>
                <td class="border px-4 py-2">30</td>
                <td class="border px-4 py-2">New York</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">2</td>
                <td class="border px-4 py-2">Mary</td>
                <td class="border px-4 py-2">25</td>
                <td class="border px-4 py-2">Los Angeles</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr class="group bg-gray-200 cursor-pointer">
        <td class="px-4 py-2 font-bold" colspan="4">
          <span class="group-toggle pr-2">&#x25B6;</span>Group 2
        </td>
      </tr>
      <tr class="group-content hover:bg-gray-100 transition-all duration-500 ease-in-out collapse opacity-0">
        <td colspan="4">
          <table class="w-full">
            <tbody>
              <tr>
                <td class="border px-4 py-2">3</td>
                <td class="border px-4 py-2">David</td>
                <td class="border px-4 py-2">40</td>
                <td class="border px-4 py-2">Chicago</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">4</td>
                <td class="border px-4 py-2">Sarah</td>
                <td class="border px-4 py-2">35</td>
                <td class="border px-4 py-2">Miami</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table> -->

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
        <tr
          class="flex w-full items-center h-10 bg-primary-color-300"
          @click="toggleCategory"
        >
          <td
            class="flex justify-center items-center h-full font-bold text-lg gap-4 pl-4 col-span-4"
          >
            <component :is="getCategoryIconByType(obj.category)" size="26" />
            {{ getCategoryNameByType(obj.category) }}
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
            {{ formatCurrency(wish.amount, wish.currency) }}
          </td>
          <td class="flex justify-center items-center p-2 h-full w-1/3">
            {{ wish.description }}
          </td>
          <td class="flex items-center p-2 h-full w-1/3">
            <div class="flex w-full justify-evenly">
              <ph-check-circle
                class="button-action text-neutral-color-off hover:bg-green-500 hover:text-neutral-50"
                @click="emit('onCompletePlan', wish)"
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { formatCurrency, getOrderIcon } from '../../utils';
import {
  wishSettings,
  sortWishes,
  wishCategoryItems,
  CategoryWish,
  getCategoryIconByType,
  getCategoryNameByType,
} from '../../services';

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

// watch(wishCategoryItems, () => {
//   const groupToggles = document.querySelectorAll('.category-group');
//   groupToggles.forEach((toggle) => {
//     toggle.addEventListener('click', () => {
//       toggle
//         ?.closest('.group')
//         ?.nextElementSibling?.classList.toggle('opacity-0');
//       toggle?.closest('.group')?.nextElementSibling?.classList.toggle('h-full');
//       toggle
//         ?.closest('.group')
//         ?.nextElementSibling?.classList.toggle('collapse');
//       toggle.innerHTML =
//         toggle.innerHTML === '&#x25B6;' ? '&#x25BC;' : '&#x25B6;';
//     });
//   });
// });

const toggleCategory = (event: any) => {
  // console.log(event);
};

const tableVisibility = ref(true);

const toggleTable = () => {
  tableVisibility.value = !tableVisibility.value;
};

const emit = defineEmits(['onCompletePlan', 'onEditWish', 'onDeleteWish']);

const wishItemCategories = computed<Array<CategoryWish>>(
  () => wishCategoryItems
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
</script>
