<!-- <template>
  <table class="w-full overflow-hidden bg-neutral-color-500">
    <thead class="wish-list-head flex w-full">
      <tr class="flex w-full h-12 bg-neutral-color-700">
        <th
          v-for="column in columns"
          :key="column.key"
          class="flex items-center p-2 h-full w-1/3 cursor-pointer hover:bg-secondary-color-300"
          :class="column.class"
          @click="orderItems(column)"
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
        v-for="(item, index) in items"
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
</template>

<script lang="ts" setup>

export interface ITable {
  key: number,
  name: string,
  class?: string,
  static?: boolean,
  formatter?: Function
}

const emit = defineEmits(['accept', 'cancel']);

defineProps({
  columns: { type: Array<ITable>, required: true },
  items: { type: Array<any>, required: true },
});

const orderItems = (column: any) => {
  if (column.static) {
    return;
  }
  // sortWishes(column.key);
};

</script> -->
