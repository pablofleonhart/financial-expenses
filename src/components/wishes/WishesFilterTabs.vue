<template>
  <ul
    class="wish-filter-tabs flex gap-6 h-8 w-full border-b border-neutral-color"
  >
    <li v-for="tab in tabItems" :key="tab.name">
      <button
        :key="tab.id"
        class="filter-tab"
        :class="{
          'filter-tab-selected': tab.id === selectedTab,
        }"
        @click="filterItems(tab)"
      >
        {{ tab.name }}
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { filterWishes, selectedWishStatus } from '../../services';
import { WISH_STATUS } from '../../types';

const emit = defineEmits(['onChangeTab']);

const tabItems = [
  { id: WISH_STATUS.OPEN, name: 'Abertos' },
  { id: WISH_STATUS.DONE, name: 'Concluídos' },
];
const selectedTab = computed(() => selectedWishStatus.id);

onMounted(async () => {
  await filterWishes();
});

async function filterItems(tab: any) {
  emit('onChangeTab', tab);
  await filterWishes(tab);
}
</script>
